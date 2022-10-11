const Post = require('../../models/post')
const User = require('../../models/user')

const postresolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.find()
            return posts
        }
    }
}
module.exports = postresolvers