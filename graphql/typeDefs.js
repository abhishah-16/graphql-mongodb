const gql = require('graphql-tag')

const typeDefs = gql`
    type User{
        id: ID!
        username: String!
        email: String!
        password: String!
    }
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post!]
        getUsers: [User!]
    }
`
module.exports = typeDefs