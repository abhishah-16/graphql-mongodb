require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log(`CONNECTED TO MONGODB ATLAS : )`);
})

server.listen(5454).then((res) => {
    console.log(`SERVER IS RUNNING AT ${res.url} :)`)
})