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
    }

    initialize(...args) {
        // console.log(args)
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

}