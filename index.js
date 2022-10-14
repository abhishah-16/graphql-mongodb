const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config()
const { PubSub } = require('graphql-subscriptions')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const pubsub = new PubSub();

const PORT = process.env.port || 5454;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    context: ({ req }) => ({ req, pubsub }),
});

mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err)
    })