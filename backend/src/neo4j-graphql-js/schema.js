import { makeAugmentedSchema } from 'neo4j-graphql-js';
import { gql } from 'apollo-server';

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String
        posts: [Post] @relation(name: "WROTE", direction: "OUT")
    }
    type Post {
        id: ID!
        title: String!
        voters: [User] @relation(name: "UPVOTED_BY", direction: "OUT")
        author: User @relation(name: "WROTE", direction: "IN")
    }
`;

const schema = makeAugmentedSchema({ typeDefs});
export default schema;
