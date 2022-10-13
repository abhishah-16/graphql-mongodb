const postResolvers = require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comment')

module.exports = {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }
}