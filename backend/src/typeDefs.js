import { gql } from 'apollo-server'

const typeDefs = gql `
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
    write(post: PostInput!): Post
    # OPTIONAL
    # delete(id: ID!): Post

    upvote(id: ID!, voter: UserInput!): Post

    # OPTIONAL
    # downvote(id: ID!, voter: UserInput!): Post

    """
    returns a signed JWT or null
    """
    login(email: String!, password: String!): String

    """
    returns a signed JWT or null
    """
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