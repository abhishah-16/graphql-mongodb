const Post = require('../../models/post')
const User = require('../../models/user')

const postresolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.find()
            return posts.map((post) => {
                return {
                    ...post._doc,
                    id: post._id,
                    createdAt: post.createdAt.toISOString()
                }
            })
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