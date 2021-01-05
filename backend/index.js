/*
import Server from './src/server'
import dotenv from 'dotenv'
import {InMemoryDataSource, Post, User} from "./src/db";

const result = dotenv.config()
if (result.error) {
    console.log(".env not found")
}


const users = [
    new User({
        name: "Alice",
        email: "alice@test.de",
    }),
    new User({
        name: "Bob",
        email: "bob@test.de",
    }),
];

const posts = [
    new Post({
        title: "post 1",
        author: users[0],
    }),
    new Post({
        title: "post 2",
        author: users[0],
    }),
    new Post({
        title: "post 3",
        author: users[1],
    })
]

const token = process.env.JWT_SECRET

const playground = {
    settings: {
        'schema.polling.enable': false
    }
}
const db = new InMemoryDataSource(posts, users, token)
const server = new Server({
    playground,
    dataSources: () => ({db})
})
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
*/
import {ApolloServer} from 'apollo-server';
import Server from './src/server';

const playground = {
    settings: {
        'schema.polling.enable': false
    }
};

(async () => {
    const server = await Server(ApolloServer, {playground});
    const {url} = await server.listen();
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at ${url}`);
})();
