const resolvers = {
    Query: {
        posts: (parent, args, context) => context.dataSources.db.posts,
        users: (parent, args, context) => context.dataSources.db.users,
    },
    User: {
        posts: (parent, args, context) =>
            context.dataSources.db.posts.filter((post) => post.author.name === parent.name)
    },
    Post: {
        votes: (parent, args, context) => context.dataSources.db.getVotes(parent.id)
    },
    Mutation: {
        write: (parent, args, context) => context.dataSources.db.createPost(args, context),
        upvote: (parent, args, context) => context.dataSources.db.upvotePost(args, context),
        login: (parent, args, context) => context.dataSources.db.loginUser(args),
        signup: (parent, args, context) => context.dataSources.db.signupUser(args)
    }
}

export default resolvers