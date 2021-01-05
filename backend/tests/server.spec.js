import {createTestClient} from 'apollo-server-testing';
import {ApolloServer} from 'apollo-server';
import Server from '../src/server';
import actualContext from '../src/context';
import neode from '../src/db/neode';
import User from '../src/db/entities/User';
import Post from '../src/db/entities/Post';

import {LOGIN_USER, POSTS, SIGNUP_USER, UPVOTE_POST, USERS, WRITE_POST} from "./server.spec.queries";


let query;
let mutate;
let reqMock;
const context = () => actualContext({req: reqMock});
const alice = new User({
    name: 'Alice',
    email: 'alice@example.org',
    password: '1234'
});
const bob = new User({
    name: 'Bob',
    email: 'bob@example.org',
    password: '4321'
});

const bobsPost = new Post({title: "bobsPost", author: bob})

const cleanDatabase = async () => {
    const {driver} = context();
    await driver
        .session()
        .writeTransaction(txc => txc.run('MATCH(n) DETACH DELETE n;'));
};

beforeEach(async () => {
    reqMock = {headers: {authorization: ""}};

    await cleanDatabase();
    const server = await Server(ApolloServer, {context});
    const testClient = createTestClient(server);
    ({query, mutate} = testClient);
});

afterAll(async () => {
    await cleanDatabase();
    const {driver} = context();
    driver.close();
    neode.driver.close();
});

describe('TEST WITHOUT AUTHENTICATION HEADER', () => {

    beforeEach(async () => {
        reqMock = {headers: {authorization: ""}};
        await alice.save()
        await bob.save()
        await bobsPost.save()
    })

    describe('QUERY POSTS', () => {
        it('returns all posts', async () => {
            await expect(query({query: POSTS}))
                .resolves
                .toMatchObject({
                    errors: undefined,
                    data: {
                        posts: [{title: bobsPost.title, id: expect.any(String)}]
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
                        users: [{name: expect.any(String), email: expect.any(String), id: expect.any(String)},
                            {name: expect.any(String), email: expect.any(String), id: expect.any(String)}]
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
        const action = () => mutate({mutation: UPVOTE_POST, variables: {id: bobsPost.id}})
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
                variables: {...alice}
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


describe('TEST WITH AUTHENTICATION HEADER', () => {
    let token
    beforeEach(async () => {
        await alice.save()
        await bob.save()
        await bobsPost.save()

        const login_action = () => mutate({
            mutation: LOGIN_USER,
            variables: {...alice}
        })
        const loginData = await login_action()
        token = loginData.data.login
        reqMock = {headers: {authorization: token}};

    })


    describe('MUTATE WRITE POST', () => {
        const action = () => mutate({
            mutation: WRITE_POST,
            variables: {title: 'New Post'}
        })

        it('responds with new post', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    data: {
                        write: {
                            title: 'New Post',
                            author: {
                                name: alice.name
                            }
                        }
                    }
                })
        })
    })

    describe('MUTATE UPVOTE POST', () => {

        describe('post once', () => {

            const action = () => mutate({
                mutation: UPVOTE_POST,
                variables: {id: bobsPost.id}
            })
            it('responds with new post', async () => {
                await expect(action())
                    .resolves
                    .toMatchObject({
                        data: {
                            upvote: {
                                id: bobsPost.id,
                                votes: 1
                            }
                        }
                    })
            })
        })

        describe('post twice', () => {

            const action = () => mutate({
                mutation: UPVOTE_POST,
                variables: {id: bobsPost.id}
            })
            it('responds with new post', async () => {
                await action()
                await expect(action())
                    .resolves
                    .toMatchObject({
                        errors: [Error("User already voted")],
                    })
            })
        })

        describe('post not exist', () => {

            const action = () => mutate({
                mutation: UPVOTE_POST,
                variables: {id: "1231231241232"}
            });
            it('responds with error message', async () => {
                await action()
                await expect(action())
                    .resolves
                    .toMatchObject({
                        errors: [Error("Post does not exist")],
                    })
            })
        })
    })
})
