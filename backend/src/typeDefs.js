import { gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        posts: [Post]
        users: [User]
    }
    type Mutation {
        # OPTIONAL
        # delete(id: ID!): Post
        # downvote(id: ID!, voter: UserInput!): Post
        upvote(id: ID!): Post
        login(email: String!, password: String!): String
        signup(email: String!, password: String!, name: String!): String
        write(post: PostInput!): Post
    }
    extend type Post {
        votes: Int
    }
    input PostInput {
        title: String!
    }
    input UserInput {
        name: String!
    }
`;
export default typeDefs;
