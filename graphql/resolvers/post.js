const Post = require('../../models/post')
const checkAuth = require('../../utils/check.auth')

const postresolvers = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts.map((post) => {
                    return {
                        ...post._doc,
                        id: post._id,
                        createdAt: post.createdAt.toISOString()
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        getPost: async (parent, args) => {
            try {
                const post = await Post.findById(args.id)
                if (!post) {
                    throw new Error('Post not found')
                }
                return post
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createPost: async (parent, args, contex, info) => {
            try {
                const user = checkAuth(contex)
                const newPost = new Post({
                    body: args.body,
                    username: user.username,
                    user: user.id,
                })
                await newPost.save()
                contex.pubsub.publish('NEW_POST', {
                    newPost: newPost
                })
                return {
                    ...newPost._doc,
                    id: newPost._id,
                    createdAt: newPost.createdAt.toISOString(),
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        deletePost: async (parent, args, contex) => {
            try {
                const id = args.id
                const user = checkAuth(contex)
                const post = await Post.findById(id)
                if (user.username === post.username) {
                    await post.remove()
                } else {
                    throw new Error('Action not allowed')
                }
                return 'Post is deleted'
            } catch (error) {
                throw new Error(error)
            }
        },
        updatePost: async (parent, args, context) => {
            try {
                const { id, body } = args
                const { username } = checkAuth(context)
                const post = await Post.findById(id)
                if (post.username == username) {
                    const result = await post.updateOne({ body })
                    if (result.modifiedCount === 1) {
                        return ('Post updated Succesfully')
                    }
                } else {
                    throw new Error('Action not allowed')
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        likePost: async (parent, args, context) => {
            try {
                const { postid } = args
                const { username } = checkAuth(context)
                const post = await Post.findById(postid)
                if (post) {
                    if (post.likes.find(like => like.username === username)) {
                        // post already liked
                        post.likes = post.likes.filter(like => like.username !== username)
                    } else {
                        // post is not liked
                        post.likes.unshift({
                            username,
                            createdAt: new Date().toISOString()
                        })
                    }
                    await post.save()
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (parent, args, contex) => {
                pubsub.asyncIterator('NEW_POST')
            }
        }
    }
}
module.exports = postresolvers