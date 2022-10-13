const { UserInputError } = require('apollo-server')
const Post = require('../../models/post')
const checkAuth = require('../../utils/check.auth')

const commentResolver = {
    Mutation: {
        createComment: async (parent, args, contex) => {
            const { postid, body } = args

            // get User from contex req
            const { username } = checkAuth(contex)
            if (body.trim() === '') {
                throw new UserInputError('Body must not be empty')
            }

            // getpost & add comment in post
            const post = await Post.findById(postid)
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            } else {
                throw new Error('Post not found')
            }
        },
        deleteComment: async (parent, args, contex) => {
            const { postid, commentid } = args

             // get User from contex req
            const { username } = checkAuth(contex)

            // getpost & add comment in post
            const post = await Post.findById(postid)
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentid)
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new Error('Action not allowed')
                }
            } else {
                throw new Error('Post not found')
            }
        }
    }
}
module.exports = commentResolver