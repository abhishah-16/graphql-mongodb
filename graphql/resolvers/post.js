const Post = require('../../models/post')
const User = require('../../models/user')
const checkAuth = require('../../utils/check.auth')

const postresolvers = {
    Query: {
        getPosts: async () => {
            const posts = await Post.find().sort({ createdAt: -1 })
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
    },
    Mutation: {
        createPost: async (parent, args, contex, info) => {
            const user = await checkAuth(contex)
            const newPost = new Post({
                body: args.body,
                email: user.email,
                user: user.id,
            })
            await newPost.save()
            return {
                ...newPost._doc,
                id: newPost._id,
                createdAt: newPost.createdAt.toISOString(),
            }
        },
        deletePost: async (parent, args, contex) => {
            const id = args.id
            const user = checkAuth(contex)
            const post = await Post.findById(id)
            if (user.email === post.email) {
                await post.remove()
            } else {
                throw new Error('Action not allowed')
            }
            return 'Post is deleted'
        }
    }
}
module.exports = postresolvers