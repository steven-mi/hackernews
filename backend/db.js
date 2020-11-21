import { DataSource } from 'apollo-datasource'
import crypto from 'crypto'

export class Post {
    constructor(data) {
        this.id = crypto.randomBytes(16).toString('hex')
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
        //Warum wird diese Methode so oft ausgeführt?
    }

    createPost(data) {
        const author = this.users.find(user => user.name === data.post.author.name)
        const newPost = new Post({
            title: data.post.title,
            votes: [],
            author: author
        })
        this.posts.push(newPost)
        const newUsers = this.users.map(user => user.id === newPost.author.id ? this.addPostToAuthor(newPost, user) : user)
        this.users = [...newUsers]

        return newPost
    }

    upvotePost(data) {
        const voter = this.users.find(user => user.name === data.voter.name)
        const newPosts = this.posts.map(post => post.id === data.id && post.votes.find(user => user.name === voter.name) === undefined ? this.addVoter(post, voter) : post)
        this.posts = [...newPosts]

        return this.posts.find(post => post.id === data.id)
    }

    getVotes(postId) {
        return this.posts.find(post => post.id === postId).votes.length
    }

    addVoter(post, voter) {
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
                votes: [],
                author: this.users[0],
            }),
            new Post({
                title: "post 2",
                votes: [],
                author: this.users[0],
            }),
            new Post({
                title: "post 3",
                votes: [],
                author: this.users[1],
            })
        ]
        console.log("Initialize 3 dummyposts.")
    }
}