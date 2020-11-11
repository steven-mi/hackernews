const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
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
`;

const posts = [
  {
    id: "post0",
    title: "post 1",
    votes: 0,
    author: "alice",
  },
  {
    id: "post1",
    title: "post 2",
    votes: 0,
    author: "alice",
  },
  {
    id: "post2",
    title: "post 3",
    votes: 1,
    author: "bob",
  },
];

const users = [
  {
    name: "alice",
    posts: ["post0", "post1"],
  },
  {
    name: "bob",
    posts: ["post2"],
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
