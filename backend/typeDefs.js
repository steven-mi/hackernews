import { gql } from 'apollo-server'

const typeDefs = gql `
  type Post {
    id: ID!
    title: String!
    votes: [User]
    author: User!
  }

  type User {
    name: ID!
    posts: [Post]
  }

  type Query {
    posts: [Post]
    users: [User]
  }
`;

export default typeDefs