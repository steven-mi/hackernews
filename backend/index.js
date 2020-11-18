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

const posts = [
  {
    id: "post0",
    title: "post 1",
    votes: 0,
    author: users[0],
  },
  {
    id: "post1",
    title: "post 2",
    votes: 0,
    author: users[1],
  },
  {
    id: "post2",
    title: "post 3",
    votes: 1,
    author: users[1],
  },
];

const resolvers = {
  Query: {
    posts: () => posts,
    users: () => users,
  },
  User: {
    posts: (user) => posts.filter( (post) => post.author.name === user.name)
  },

};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});