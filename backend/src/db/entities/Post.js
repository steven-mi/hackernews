import neode from '../neode';

export default class Post {
    constructor(data) {
        Object.assign(this, data);
    }

    static async first(props) {
        const node = await neode.first('Post', props);
        if (!node) return null;
        return new Post({...node.properties(), node});
    }

    static async all() {
        const nodes = await neode.all('Post');
        return nodes.map(node => new Post({...node.properties(), node}));
    }

    async save() {
        if (!(this.author && this.author.node))
            throw new Error('author node is missing!');
        const node = await neode.create('Post', this);
        await node.relateTo(this.author.node, 'author');
        Object.assign(this, {...node.properties(), node});
        return this;
    }

    async upvote(voter) {
        if (!(voter && voter.node)) throw new Error("voter node is missing!");
        await this.node.relateTo(voter.node, "voters");
    }
}
