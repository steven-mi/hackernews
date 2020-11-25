import {DataSource} from 'apollo-datasource'
import crypto from 'crypto'
import {AuthenticationError, UserInputError} from "apollo-server-errors";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

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
    constructor() {
        super()
        this.posts = []
        this.users = []
        this.initDummyUsers()
        this.initDummyPosts()
    }

    initialize(...args) {
    }

    async loginUser({email, password}) {
        const user = this.users.find(user => user.email === email)
        if (!user) {
            throw new UserInputError("No user with that email")
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new AuthenticationError('Incorrect password')
        }
        return jsonwebtoken.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
    }

    async signupUser({name, email, password}) {
        if (!this.isValidPassword(password)) {
            throw new UserInputError("Password must have at least 8 characters")
        }
        if (this.isEmailTaken(email)) {
            throw new UserInputError("Email is already taken")
        }

        const user = await new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        this.users.push(user)
        return jsonwebtoken.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1y'}
        )
    }

    isEmailTaken(email) {
        return this.users.find(user => user.email === email)
    }

    isValidPassword(password) {
        return password.length >= 8
    }

    createPost(data) {
        const author = this.users.find(user => user.name === data.post.author.name)

        if (author) {
            const newPost = new Post({
                title: data.post.title,
                author: author
            })
            this.posts.push(newPost)

            return newPost
        } else {
            throw new AuthenticationError("User does not exist");
        }
    }

    upvotePost(data) {
        const voter = this.users.find(user => user.name === data.voter.name)
        if (voter) {
            const post = this.posts.find(post => post.id === data.id)
            if (post) {
                const userVotedPosts = post.votes.find(u => u.name === data.voter.name)
                if (!userVotedPosts) {
                    const newPosts = this.posts.map(p => p.id === data.id ? this.addVoterToPost(p, voter) : p)
                    this.posts = [...newPosts]
                    return this.posts.find(p => p.id === data.id)
                } else throw new UserInputError("User already voted")
            } else throw new UserInputError("Post does not exist")
        } else throw new AuthenticationError("User does not exist")
    }

    getVotes(postId) {
        return this.posts.find(post => post.id === postId).votes.length
    }

    addVoterToPost(post, voter) {
        post.votes.push(voter)
        return post
    }


    // Init with dummydata
    initDummyUsers() {
        this.users = [
            new User({
                name: "Alice",
                email: "alice@test.de",
            }),
            new User({
                name: "Bob",
                email: "bob@test.de",
            }),
            new User({
                name: "Hans",
                email: "hans@test.de",
            })
        ];
    }

    initDummyPosts() {
        this.posts = [
            new Post({
                title: "post 1",
                author: this.users[0],
            }),
            new Post({
                title: "post 2",
                author: this.users[0],
            }),
            new Post({
                title: "post 3",
                author: this.users[1],
            })
        ]
    }
}
