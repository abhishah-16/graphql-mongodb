const postResolvers = require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comment')

module.exports = {
    Post: {
        likeCount: (parent) => {
            return parent.likes.length
        },
        commentCount: (parent) => {
            return parent.comments.length
        }
    },
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