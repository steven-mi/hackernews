import { gql } from 'apollo-server'

const typeDefs = gql `
  type Post {
    id: ID!
    title: String!
    votes: Int!
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

  type Mutation {
    write(post: PostInput!): Post
    # OPTIONAL
    # delete(id: ID!): Post

    upvote(id: ID!, voter: UserInput!): Post

    # OPTIONAL
    # downvote(id: ID!, voter: UserInput!): Post
  }

  input PostInput {
    title: String!
    author: UserInput!
  }

  input UserInput {
    name: String!
  }
`;

export default typeDefs