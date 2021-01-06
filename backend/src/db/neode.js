import Neode from 'neode';
import {NEO4J_HOST, NEO4J_PASSWORD, NEO4J_USERNAME} from "../config";

const dir = `${__dirname}/models`;
// eslint-disable-next-line new-cap
const instance = new Neode(
    `bolt://${NEO4J_HOST}:7687`,
    `${NEO4J_USERNAME}`,
    `${NEO4J_PASSWORD}`).withDirectory(dir)
export default instance;
