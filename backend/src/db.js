import {DataSource} from 'apollo-datasource'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class Post {
    constructor(data) {
        this.id = crypto.randomBytes(16).toString('hex')
        this.votes = []
        Object.assign(this, data)
    }
}

export class User {
    constructor(data) {
        this.id = crypto.randomBytes(16).toString('hex')
        Object.assign(this, data)
    }
}

export class InMemoryDataSource extends DataSource {
    constructor(posts = [], users = [], secret = "changeme", saltRounds = 10) {
        super()
        this.secret = secret
        this.posts = posts
        this.users = users
        this.salt = bcrypt.genSaltSync(saltRounds)
    }

    initialize(...args) {
    }

    loginUser(data) {
        const user = this.users.find(u => u.email === data.email
            && bcrypt.compareSync(data.password, u.password))
        if (user === undefined) return new Error("Email or password is wrong")

        return jwt.sign(
            {id: user.id},
            this.secret)

    }

    signupUser(data) {
        if (data.password.length < 8) return new Error("Password must have at least 8 characters")

        const user = this.users.find(u => u.email === data.email)
        if (user !== undefined) return new Error("Email already exist")


        const encryptedPassword = bcrypt.hashSync(data.password, this.salt)
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: encryptedPassword,
        })
        this.users.push(newUser)

        return jwt.sign(
            {id: newUser.id},
            this.secret)
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret)
        } catch (err) {
            return undefined
        }
    }

    createPost(data, context) {
        const author = this.users.find(user => user.id === context.user.id)
        if (author === undefined) return new Error("User does not exist")

        const newPost = new Post({
            title: data.post.title,
            author: author
        })
        this.posts.push(newPost)

        return newPost
    }

    upvotePost(data, context) {
        const voter = this.users.find(user => user.id === context.user.id)
        if (voter === undefined) return new Error("User does not exist")

        const post = this.posts.find(post => post.id === data.id)
        if (post === undefined) return new Error("Post does not exist")

        const userVotedPosts = post.votes.find(u => u.id === voter.id)
        if (userVotedPosts !== undefined) {
            return new Error("User already voted")
        } else {
            const newPosts = this.posts.map(p => p.id === data.id ? this.addVoterToPost(p, voter) : p)
            this.posts = [...newPosts]
            return this.posts.find(p => p.id === data.id)
        }
    }

    getVotes(postId) {
        return this.posts.find(post => post.id === postId).votes.length
    }

    addVoterToPost(post, voter) {
        post.votes.push(voter)
        return post
    }
}
