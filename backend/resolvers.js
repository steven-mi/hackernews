export const resolvers = {
    Query: {
        posts: (parent, args, context) => context.dataSources.db.posts,
        users: (parent, args, context) => context.dataSources.db.users,
    },
    User: {
        posts: (parent, args, context, info) =>
            context.dataSources.db.posts.filter((post) => post.author.name === parent.name)
    }

};