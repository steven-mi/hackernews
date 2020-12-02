import {gql} from "apollo-server";

export const LOGIN_USER = gql`
    mutation($password: String!, $email: String!) {
        login(password:$password, email: $email)
    }
`

export const SIGNUP_USER = gql`
    mutation($name: String!, $email: String!, $password: String!) {
        signup( name: $name, password:$password, email: $email)
    }
`

export const UPVOTE_POST = gql`
    mutation($id: ID!) {
        upvote(id:$id ){id, votes}
    }
`

export const WRITE_POST = gql`
    mutation($title: String!) {
        write(post: { title: $title} ){title, author {name}}
    }
`

export const POSTS = gql`
    query {
        posts {
            id
            title
        }
    }
`

export const USERS = gql`
    query {
        users {
            name
            email
            id
        }
    }
`