const gql = require('graphql-tag')

const typeDefs = gql`
    type User{
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
        posts: [Post]
    }
    type Story{
        id: ID!
        body: String!
        username: String!
        likes:[Like!]!
        createdAt: String!
    }
    type Comment{
        id:ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Query{
        getPosts: [Post!]
        getUsers: [User!]
        getPost(id:ID!): Post!
        getStories: [Story!]
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
        updatePost(id:ID!,body: String!): String!
        deletePost(id:ID!): String!
        createComment(postid: ID!,body: String!): Post!
        deleteComment(postid: ID!,commentid: ID!): Post!
        likePost(postid: ID!): Post!
        createStory(body: String): Story!
        updateStory(id:ID!,body: String!): String!
        deleteStory(storyid: ID!): String!
        likeStory(storyid:ID!): Story!
    }
    type Subscription{
        newPost: Post!
    }
`
module.exports = typeDefs