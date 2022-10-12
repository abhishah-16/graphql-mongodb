const gql = require('graphql-tag')

const typeDefs = gql`
    type User{
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
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
    input RegisterInput{
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    type Mutation{
        register(input: RegisterInput!): User!
        login(email: String!,password: String!): User!
    }
`
module.exports = typeDefs