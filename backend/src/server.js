import { ApolloServer, gql } from "apollo-server"
import typeDefs from './typeDefs'
import { Post, InMemoryDataSource } from './db'
import { resolvers } from './resolvers'

const db = new InMemoryDataSource()

const dataSources = () => ({ db })
const context = ({ req, res }) => ({ req, res })

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