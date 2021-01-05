import bcrypt from 'bcrypt';
import neode from '../neode';

export default class User {
    constructor(data) {
        Object.assign(this, data);
    }

    static async first(props) {
        const node = await neode.first('User', props);
        if (!node) return null;
        return new User({...node.properties(), node});
    }

    static currentUser(context) {
        const {person} = context;
        if (!person) return null;
        return User.first({id: person.id});
    }

    static async all() {
        const nodes = await neode.all('User');
        return nodes.map(node => new User({...node.properties(), node}));
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.hashedPassword);
    }

    async save() {
        this.hashedPassword = bcrypt.hashSync(this.password, 10);
        const node = await neode.create('User', this);
        Object.assign(this, {...node.properties(), node});
        return this;
    }
}
