const Post = require('../models/post')
const User = require('../models/user')

const resolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.find()
            return posts
        },
        getUsers: async () => {
            const users = await User.find()
            return users
        }
    }
}

module.exports = resolvers