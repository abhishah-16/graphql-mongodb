const postResolvers = require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comment')
const storyResolvers = require('./story')

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
        ...userResolvers.Query,
        ...storyResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...storyResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }
}