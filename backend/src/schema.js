import { stitchSchemas } from '@graphql-tools/stitch';
import typeDefs from './typeDefs';
import Resolvers from './resolvers';
import neo4jSchema from './neo4j-graphql-js/schema';
import { applyMiddleware, } from "graphql-middleware";
import permissions from "./permissions";

export default () => {
    const resolvers = Resolvers({ subschema: neo4jSchema });
    const schema = stitchSchemas({
        subschemas: [neo4jSchema],
        typeDefs,
        resolvers
    });
    return applyMiddleware(schema, permissions);
};