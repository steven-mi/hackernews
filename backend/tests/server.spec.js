import {createTestClient} from 'apollo-server-testing'
import Server from '../src/server.js'
import {InMemoryDataSource, Post, User} from '../src/db.js'
import {LOGIN_USER, POSTS, SIGNUP_USER, UPVOTE_POST, USERS, WRITE_POST} from "./server.spec.queries";

const users = [
    new User({
        name: "Alice",
        email: "alice@test.de",
    }),
    new User({
        name: "Bob",
        email: "bob@test.de",
    }),
];

const posts = [
    new Post({
        title: "post 1",
        author: users[0],
    }),
    new Post({
        title: "post 2",
        author: users[0],
    }),
    new Post({
        title: "post 3",
        author: users[1],
    })
]

let db = new InMemoryDataSource(posts, users)
let server = new Server({
    dataSources: () => ({db}),
    context: ({req, res}) => (req, res)
})
let {query, mutate} = createTestClient(server)

describe('TEST WITHOUT AUTHENTICATION HEADER', () => {

    beforeEach(async () => {
        db = new InMemoryDataSource(posts, users)
    })

    describe('QUERY POSTS', () => {
        it('returns all posts', async () => {
            await expect(query({query: POSTS}))
                .resolves
                .toMatchObject({
                    errors: undefined,
                    data: {
                        posts: [{title: posts[0].title, id: expect.any(String)},
                            {title: posts[1].title, id: expect.any(String)},
                            {title: posts[2].title, id: expect.any(String)}]
                    }
                })
        })
    })

    describe('QUERY USERS', () => {
        it('returns all users', async () => {
            await expect(query({query: USERS}))
                .resolves
                .toMatchObject({
                    errors: undefined,
                    data: {
                        users: [{name: users[0].name, email: users[0].email, id: expect.any(String)},
                            {name: users[1].name, email: users[1].email, id: expect.any(String)}]
                    }
                })
        })
    })

    describe('MUTATE WRITE POST', () => {
        const action = () => mutate({mutation: WRITE_POST, variables: {title: 'New Post'}})
        it('responds with error message', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: [new Error("Not Authorised!")]
                })
        })
    })

    describe('MUTATE UPVOTE POST', () => {
        const action = () => mutate({mutation: UPVOTE_POST, variables: {id: db.posts[0].id}})
        it('responds with error message', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: [new Error("Not Authorised!")]
                })
        })
    })

    describe('MUTATE SIGNUP USER', () => {

        describe('signup with non existing e-mail', () => {
            const action = () => mutate({
                mutation: SIGNUP_USER,
                variables: {name: 'Hans', password: "123456789", email: "hans"}
            })
            it('responds with token', async () => {
                await expect(action())
                    .resolves
                    .toMatchObject({
                        errors: undefined,
                        data: {
                            signup: expect.any(String),
                        }
                    })
            })
        })

        describe('signup with existing e-mail', () => {
            const action = () => mutate({
                mutation: SIGNUP_USER,
                variables: {name: 'Hans', password: "123456789", email: "alice@test.de"}
            })
            it('responds with error', async () => {
                await expect(action())
                    .resolves
                    .toMatchObject({
                        errors: [new Error("Email already exist")]
                    })
            })
        })

        describe('signup with password of length smaller than 8', () => {
            const action = () => mutate({
                mutation: SIGNUP_USER,
                variables: {name: 'Hans', password: "1234", email: "alice"}
            })
            it('responds with error message', async () => {
                await expect(action())
                    .resolves
                    .toMatchObject({
                        errors: [new Error("Password must have at least 8 characters")]
                    })
            })
        })
    })

    describe('MUTATE LOGIN USER', () => {

        describe('login with wrong credentials', () => {

            describe('login with non existing e-mail', () => {
                const action = () => mutate({
                    mutation: LOGIN_USER,
                    variables: {password: "123456789", email: "r3fegdbffwdasfcvdbf"}
                })
                it('responds with error message', async () => {
                    await expect(action())
                        .resolves
                        .toMatchObject({
                            errors: [Error("Email or password is wrong")],
                        })
                })
            })

            describe('login with non existing password', () => {
                const action = () => mutate({
                    mutation: LOGIN_USER,
                    variables: {password: "123123124123545", email: "hans"}
                })
                it('responds with error message', async () => {
                    await expect(action())
                        .resolves
                        .toMatchObject({
                            errors: [Error("Email or password is wrong")],
                        })
                })
            })

            describe('login with non existing password and email', () => {
                const action = () => mutate({
                    mutation: LOGIN_USER,
                    variables: {password: "fqwafcsgefs", email: "5142453524123"}
                })
                it('responds with error message', async () => {
                    await expect(action())
                        .resolves
                        .toMatchObject({
                            errors: [Error("Email or password is wrong")],
                        })
                })
            })
        })

        describe('login with existing credentials', () => {
            const signup_action = () => mutate({
                mutation: SIGNUP_USER,
                variables: {name: 'Hans', password: "123456789", email: "hans"}
            })
            const login_action = () => mutate({
                mutation: LOGIN_USER,
                variables: {password: "123456789", email: "hans"}
            })
            it('responds with token', async () => {
                await signup_action()
                await expect(login_action())
                    .resolves
                    .toMatchObject({
                        errors: undefined,
                        data: {
                            login: expect.any(String),
                        }
                    })
            })
        })

    })
})


describe('TEST AUTHENTICATION HEADER', () => {
    let userPost
    beforeEach(async () => {
        db = new InMemoryDataSource()

        const userData = {name: 'Hans', password: "123456789", email: "hanshans"}
        const action = () => mutate({
            mutation: SIGNUP_USER,
            variables: userData
        })
        db.posts.push(new Post({
            title: "Hans new post",
            author: new User(userData)
        }))

        userPost = db.posts[0]
        const result = await action()
        server = new Server({
            dataSources: () => ({db}),
            context: ({req, res}) => {
                return {user: db.verifyToken(result.data.signup)}
            }
        })
        const client = createTestClient(server)
        query = client.query
        mutate = client.mutate
    })


    describe('MUTATE WRITE POST', () => {
        const action = () => mutate({mutation: WRITE_POST, variables: {title: 'New Post'}})
        it('responds with new post', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    data: {
                        write: {
                            title: 'New Post',
                            author: {
                                name: 'Hans'
                            }
                        }
                    }
                })
        })
    })

    describe('MUTATE UPVOTE POST', () => {
        const action = () => mutate({mutation: UPVOTE_POST, variables: {id: userPost.id}})
        it('responds with new post', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    data: {
                        upvote: {
                            id: userPost.id,
                            votes: 1
                        }
                    }
                })
        })
    })

})