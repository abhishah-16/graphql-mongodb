require('dotenv').config()
require('colors')
const { ApolloServer } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')
const myPlugin = require('./plugin')
const pubsub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }),
    plugins: [myPlugin],
})

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log(`CONNECTED TO MONGODB ATLAS : )`);
})

server.listen(5454).then((res) => {
    console.log(`SERVER IS RUNNING AT ${res.url} :)`)
})