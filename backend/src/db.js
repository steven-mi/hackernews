import {DataSource} from 'apollo-datasource'
import crypto from 'crypto'
import {AuthenticationError, UserInputError} from "apollo-server-errors";

export class Post {
    constructor(data) {
        this.id = crypto.randomBytes(16).toString('hex')
        this.votes = [],
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

    createPost(data) {
        const author = this.users.find(user => user.name === data.post.author.name)

        if (author) {
            const newPost = new Post({
                title: data.post.title,
                author: author
            })
            this.posts.push(newPost)
            const newUsers = this.users.map(user => user.id === newPost.author.id ? this.addPostToAuthor(newPost, user) : user)
            this.users = [...newUsers]

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

    addPostToAuthor(post, author) {
        author.posts.push(post)
        return author
    }

    // Init with dummydata
    initDummyUsers() {
        this.users = [
            new User({
                name: "Alice",
                posts: ["post 1", "post 2"],
            }),
            new User({
                name: "Bob",
                posts: ["post 3"]
            }),
            new User({
                name: "Hans",
                posts: []
            })
        ];
        console.log("Initialize 3 dummyusers.")
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
        console.log("Initialize 3 dummyposts.")
    }
}
