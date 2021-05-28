import { delegateToSchema } from '@graphql-tools/delegate';
import User from './db/entities/User';
import Post from './db/entities/Post';
import { neo4jgraphql } from "neo4j-graphql-js";

export default ({ subschema }) => ({
    Query: {
        users: async(parent, args, context, resolveInfo) => {
            return neo4jgraphql(parent, args, context, resolveInfo);
        },
        posts: async(parent, args, context, resolveInfo) => {
            return neo4jgraphql(parent, args, context, resolveInfo);
        },
    },
    Mutation: {
        login: async(_parent, { email, password }, { jwtSign }) => {
            const user = await User.first({ email });
            if (user && user.checkPassword(password)) {
                return jwtSign({ person: { id: user.id } });
            }
            return new Error("Email or password is wrong")
        },
        signup: async(_parent, { name, email, password }, { jwtSign }) => {
            const existingPerson = await User.first({ email });
            if (existingPerson) return new Error("Email already exist")
            if (password.length < 8) return new Error("Password must have at least 8 characters")

            const person = new User({ name, email, password });
            await person.save();
            return jwtSign({ person: { id: person.id } });
        },
        write: async(_parent, { post: { title } }, context, info) => {
            let currentUser = await User.first(context.person);
            if (!currentUser)
                return new Error("User does not exist")
            const post = new Post({ title: title, author: currentUser });
            await post.save();
            const [resolvedPost] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });
            return resolvedPost;
        },
        upvote: async(_parent, args, context, info) => {
            const user = await User.first(context.person);
            if (!user && !user.checkPassword(password)) return new Error("User does not exist")

            let post = await Post.first({ id: args.id });
            if (!post) return new Error("Post does not exist")
            const [resolvedPostBefore] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });


            await post.upvote(user);
            const [resolvedPost] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });

            return resolvedPost;
        },
        downvote: async(_parent, args, context, info) => {
            const user = await User.first(context.person);
            if (!user && !user.checkPassword(password)) return new Error("User does not exist")

            let post = await Post.first({ id: args.id });
            if (!post) return new Error("Post does not exist")
            const [resolvedPostBefore] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });


            await post.downvote(user);
            const [resolvedPost] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });

            return resolvedPost;
        },
        delete: async(_parent, args, context, info) => {
            const user = await User.first(context.person);
            if (!user && !user.checkPassword(password)) return new Error("User does not exist")

            let post = await Post.first({ id: args.id });
            if (!post) return new Error("Post does not exist")
            const [resolvedPostBefore] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });


            await post.delete();
            const [resolvedPost] = await delegateToSchema({
                schema: subschema,
                operation: "query",
                fieldName: "Post",
                args: { id: post.id },
                context,
                info,
            });

            return resolvedPost;
        },
    },
    Post: {
        votes: {
            selectionSet: "{ voters { id } }",
            resolve: (post) => {
                return post.voters ? post.voters.length : 0;
            },
        },
    }
});