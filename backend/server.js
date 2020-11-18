import { ApolloServer, gql } from "apollo-server"
import typeDefs from './typeDefs'
import { Post, InMemoryDataSource } from './db'

const db = new InMemoryDataSource()

const users = [{
        name: "alice",
        posts: ["post0", "post1"]
    },
    {
        name: "bob",
        posts: ["post2"],
    },
];




db.posts = [
    new Post({
        title: "post 1",
        votes: 0,
        author: users[0],
    }),
    new Post({
        title: "post 2",
        votes: 0,
        author: users[0],
    }),
    new Post({
        title: "post 3",
        votes: 0,
        author: users[0],
    })
]

const dataSources = () => ({ db })

const context = ({ req, res }) => ({ req, res })





const resolvers = {
    Query: {
        posts: (parent, args, context) => context.dataSources.db.posts,
        users: () => users,
    },
    User: {
        posts: (user) => posts.filter((post) => post.author.name === user.name)
    },

};

export default class Server {
    constructor(opts) {
        const defaults = {
            typeDefs,
            resolvers,
            dataSources,
            context
        }
        return new ApolloServer({...defaults, ...opts })
    }
}