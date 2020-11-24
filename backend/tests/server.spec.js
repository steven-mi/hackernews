import {createTestClient} from 'apollo-server-testing'
import {gql} from 'apollo-server'
import Server from '../src/server.js'
import {InMemoryDataSource, Post} from '../src/db.js'
import {AuthenticationError, UserInputError} from "apollo-server-errors";

let db = new InMemoryDataSource()
const server = new Server({dataSources: () => ({db})})

const {query, mutate} = createTestClient(server)

describe('queries', () => {
    describe('POSTS', () => {
        const POSTS = gql`
            query {
                posts {
                    id
                    title
                }
            }
        `
        it('returns default array with 3 posts', async () => {
            await expect(db.posts).toHaveLength(3)
        })

        describe('given posts in the database', () => {
            beforeEach(() => {
                db.posts = [new Post({title: 'Some post'})]
            })

            it('returns posts', async () => {
                await expect(query({query: POSTS}))
                    .resolves
                    .toMatchObject({
                        errors: undefined,
                        data: {posts: [{title: 'Some post', id: expect.any(String)}]}
                    })
            })
        })
    })
})

describe('mutations', () => {
    beforeEach(() => {
        db = new InMemoryDataSource()
    })

    describe('write post with existing user', () => {
        const action = () => mutate({mutation: WRITE_POST, variables: {title: 'Some post', author: 'Alice'}})
        const WRITE_POST = gql`
            mutation($title: String!, $author: String!) {
                write(post: { title: $title, author: { name: $author }}){title, id}
            }
        `

        it('adds a post to db.posts', async () => {
            expect(db.posts).toHaveLength(3)
            await action()
            expect(db.posts).toHaveLength(4)
        })

        it('calls db.createPost', async () => {
            db.createPost = jest.fn(() => {
            })
            await action()
            expect(db.createPost).toHaveBeenCalledWith({post: {title: 'Some post', author: {name: 'Alice'}}})
        })

        it('responds with created post', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: undefined,
                    data: {write: {title: 'Some post', id: expect.any(String)}}
                })
        })
    })

    describe('write post with non existing user', () => {
        const action = () => mutate({mutation: WRITE_POST, variables: {title: 'Some post', author: 'fasdasdasd'}})
        const WRITE_POST = gql`
            mutation($title: String!, $author: String!) {
                write(post: { title: $title, author: { name: $author }}){title, id}
            }
        `
        it('responds user does not exist error message', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: [new AuthenticationError("User does not exist")]
                })
        })
    })

    describe('upvote post with existing user', () => {
        const postIndex = 0
        const action = () => mutate({mutation: UPDATE_POST, variables: {id: db.posts[postIndex].id, name: 'Alice'}})
        const UPDATE_POST = gql`
            mutation($id: ID!, $name: String!) {
                upvote(id:$id,  voter: {name: $name } ){votes}
            }
        `
        it('increases votes by 1', async () => {
            expect(db.posts[postIndex].votes.length).toEqual(0)
            await action()
            expect(db.posts[postIndex].votes.length).toEqual(1)
        })
        it('returns upvoted post', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    data: {
                        upvote: {votes: 1}
                    }
                })
        })
        describe('upvote post twice existing user', () => {
            it('return user already upvoted error message', async () => {
                await action()
                await expect(action())
                    .resolves
                    .toMatchObject({
                        errors: [new UserInputError("User already voted")]
                    })
            })
        })
    })


    describe('upvote post non existing user', () => {
        const postIndex = 0
        const action = () => mutate({
            mutation: UPDATE_POST,
            variables: {id: db.posts[postIndex].id, name: '12312312esad'}
        })
        const UPDATE_POST = gql`
            mutation($id: ID!, $name: String!) {
                upvote(id:$id,  voter: {name: $name } ){title, id, votes}
            }
        `
        it('responds user does not exist error message', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: [new AuthenticationError("User does not exist")]
                })
        })
    })

    describe('upvote non existing post with existing user', () => {
        const action = () => mutate({mutation: UPDATE_POST, variables: {id: "Alice", name: 'Alice'}})
        const UPDATE_POST = gql`
            mutation($id: ID!, $name: String!) {
                upvote(id:$id,  voter: {name: $name } ){votes}
            }
        `
        it('responds post does not exist error message', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: [new UserInputError("Post does not exist")]
                })
        })
    })
})
