import Neode from 'neode';

const dir = `${__dirname}/models`;
// eslint-disable-next-line new-cap
const instance = new Neode.fromEnv().withDirectory(dir);
export default instance;
