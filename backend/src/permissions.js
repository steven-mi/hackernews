import {allow, rule, shield} from "graphql-shield"


const isAuthenticated = rule()((parent, args, context) => {
    return !!context.auth
});

const permissions = shield({
    Mutation: {
        write: isAuthenticated,
        upvote: isAuthenticated
    },
});
export default permissions
