const Post = require('../../models/post')
const User = require('../../models/user')

const postresolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.find()
            return posts
        },
        getPost: async (parent, args) => {
            const post = await Post.findById(args.id)
            if (!post) {
                throw new Error('Post not found')
            }
            return post
        }
    }
}
module.exports = postresolvers