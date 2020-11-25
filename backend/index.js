import Server from './src/server'
import {config} from 'dotenv'

config()

const server = new Server()
    // The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});