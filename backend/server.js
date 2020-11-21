import { ApolloServer, gql } from "apollo-server"
import typeDefs from './typeDefs'
import { Post, InMemoryDataSource } from './db'

const db = new InMemoryDataSource()
console.log("test")

const dataSources = () => ({ db })
const context = ({ req, res }) => ({ req, res })


const resolvers = {
    Query: {
        posts: (parent, args, context) => context.dataSources.db.posts,
        users: (parent, args, context) => context.dataSources.db.users,
    },
    User: {
        posts: (parent, args, context, info) =>
            context.dataSources.db.posts.filter((post) => post.author.name === parent.name)
    }

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