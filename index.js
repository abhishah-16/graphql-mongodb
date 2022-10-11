const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')

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

server.listen(5454).then(() => {
    console.log('SERVER IS RUNNING :)')
})