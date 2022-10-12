const gql = require('graphql-tag')

const typeDefs = gql`
    type User{
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }
    type Comment{
        id:ID!
        createdAt: String!
        email: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        email: String!
    }
    type Post{
        id: ID!
        body: String!
        email: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
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
        createComment(postid: ID!,body: String!): Post!
        deleteComment(postid: ID!,commentid: ID!): Post!
        likePost(postid: ID!): Post!
    }
`
module.exports = typeDefs