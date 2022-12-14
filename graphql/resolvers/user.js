require('dotenv').config()
const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')
const Post = require('../../models/post')
const checkAuth = require('../../utils/check.auth')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validator')

const getAllPostByUser = async (userid) => {
    const posts = await Post.find({ user: userid })
    return posts.map((post) => {
        return {
            ...post._doc,
            id: post._id,
            createdAt: post.createdAt.toISOString()
        }
    })
}

const userResolvers = {
    Query: {
        getUsers: async (parent, args, contex) => {
            try {
                const { username } = checkAuth(contex)
                const users = await User.find()
                const filterUser = users.filter(user => user.username == username)
                return filterUser.map((user) => {
                    return {
                        ...user._doc,
                        id: user._id,
                        createdAt: user.createdAt.toISOString(),
                        posts: getAllPostByUser(user._id)
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        register: async (parent, args, contex, info) => {
            try {
                const { username, email, password, confirmPassword } = args.input

                // validate User
                const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
                if (!valid) {
                    throw new UserInputError('Error', { errors })
                }

                // email exists
                const user = await User.findOne({ $or: [{ email }, { username }] })
                if (user) {
                    throw new Error('User already exists')
                }

                // hash password
                const hashpassword = await bcrypt.hash(password, 12)

                // create new user
                const newUser = new User({
                    username,
                    email,
                    password: hashpassword,
                })
                await newUser.save()

                // generate token
                const token = generateToken(newUser)

                return {
                    ...newUser._doc,
                    id: newUser._id,
                    createdAt: newUser.createdAt.toISOString(),
                    token
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        login: async (parent, args, contex, info) => {
            try {
                const { email, password } = args
                const { valid, errors } = validateLoginInput(email, password)

                // find user
                const user = await User.findOne({ email })
                if (!user) {
                    errors.general = 'User not found'
                    throw new UserInputError('Invalid Credentials', { errors })
                }

                // match passwords
                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                    errors.general = 'Invalid Credentials'
                    throw new UserInputError('Credentials', { errors })
                }

                // generate token
                const token = generateToken(user)
                return {
                    ...user._doc,
                    id: user._id,
                    createdAt: user.createdAt.toISOString(),
                    token
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

const generateToken = (user) => {
    try {
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        return token
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = userResolvers
