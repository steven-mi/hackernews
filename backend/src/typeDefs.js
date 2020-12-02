import {gql} from 'apollo-server'

const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        votes: Int!
        author: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]
    }

    type Query {
        posts: [Post]
        users: [User]
    }

    type Mutation {
        # OPTIONAL
        # delete(id: ID!): Post
        # downvote(id: ID!, voter: UserInput!): Post
        write(post: PostInput!): Post
        upvote(id: ID!): Post
        login(email: String!, password: String!): String
        signup(name: String!, email: String!, password: String!): String
    }

    input PostInput {
        title: String!
    }

    input UserInput {
        name: String!
    }
`;

export default typeDefs