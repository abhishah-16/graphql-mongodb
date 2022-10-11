const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = gql`
    type Query{
        sayhi: String!
    }
`
const resolvers = {
    Query: {
        sayhi: () => {
            return 'hii from gql'
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

mongoose.connect(process.env.DATABASE_URL,() => {
    console.log(`CONNECTED TO MONGODB ATLAS : )`);
})

server.listen(5454).then((res) => {
    console.log(`SERVER IS RUNNING AT ${res.url} :)`)
})