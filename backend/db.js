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
        const newPost = new Post(data)
        this.posts.push(newPost)

        const newUsers = this.users.map(user => user.id === newPost.author.id ? user.posts.add(newPost.id) : user)
        this.users = [...newUsers]

        return newPost
    }

    createUser(data) {
        const newUser = new User(data)
        this.users.push(newUser)
        return newUser
    }

    // Init with dummydata
    initDummyUsers() {
        this.users = [
            new User({
                name: "Alice",
                posts: ["post 1", "post 2"],
                upvotes: []
            }),
            new User({
                name: "Bob",
                posts: ["post 3"],
                upvotes: []
            }),
            new User({
                name: "Hans",
                posts: [],
                upvotes: []
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
        console.log("Initialize 3 dummypostss.")
    }
}