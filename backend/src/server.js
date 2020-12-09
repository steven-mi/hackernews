import {ApolloServer} from 'apollo-server'
import typeDefs from './typeDefs'
import resolvers from "./resolvers";
import {InMemoryDataSource} from "./db";
import {applyMiddleware,} from "graphql-middleware";
import permissions from "./permissions";
import {makeExecutableSchema} from 'apollo-server';


const db = new InMemoryDataSource()
const dataSources = () => ({db})
const context = ({req, res}) => {
    const token = req.headers.authorization || ''
    return {user: db.verifyToken(token)}
}

const schema = applyMiddleware(makeExecutableSchema({typeDefs, resolvers}), permissions)

export default class Server {
    constructor(opts) {
        const defaults = {
            typeDefs,
            resolvers,
            dataSources,
            context,
            schema
        }
        return new ApolloServer({...defaults, ...opts})
    }
}