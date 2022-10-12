const { UserInputError } = require('apollo-server')
const Post = require('../../models/post')
const User = require('../../models/user')
const checkAuth = require('../../utils/check.auth')

const commentResolver = {
    Mutation: {
        createComment: async (parent, args, contex) => {
            const { postid, body } = args
            const { email } = checkAuth(contex)
            if (body.trim()) {
                throw new UserInputError('Body must not be empty')
            }
            const post = await Post.findById(postid)
            if (post) {
                post.comments.unshift({
                    body,
                    email,
                    createdAt: new Date().toISOString
                })
                await post.save()
                return post
            }else {
                throw new Error('Post not found')
            }
        }
    }
}
module.exports = commentResolver