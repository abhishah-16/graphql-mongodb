const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
require('dotenv').config()

const Post = require('./models/post')
const User = require('./models/user')

const typeDefs = gql`
    type Post{
        id:ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post!]
    }
`
const resolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.find()
            return posts
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log(`CONNECTED TO MONGODB ATLAS : )`);
})

server.listen(5454).then((res) => {
    console.log(`SERVER IS RUNNING AT ${res.url} :)`)
})