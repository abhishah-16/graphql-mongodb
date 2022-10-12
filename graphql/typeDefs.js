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
        email: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post!]
        getUsers: [User!]
        getPost(id:ID!): Post!
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
        createPost(body: String!): Post!
        deletePost(id:ID!): String!
    }
`
module.exports = typeDefs