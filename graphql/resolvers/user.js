require('dotenv').config()
const { UserInputError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Post = require('../../models/post')
const User = require('../../models/user')
const { validateRegisterInput } = require('../../utils/validator')

const userResolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.find()
            return users.map((user) => {
                return {
                    ...user._doc,
                    id: user._id,
                    createdAt: user.createdAt.toISOString()
                }
            })
        }
    },
    Mutation: {
        register: async (parent, args, contex, info) => {
            const { username, email, password, confirmPassword } = args.input

            // validate User
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Error', { errors })
            }

            // email exists
            const user = await User.findOne({ email })
            if (user) {
                throw new Error('Email already exists')
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
            const payload = {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

            return {
                ...newUser._doc,
                id: newUser._id,
                createdAt: newUser.createdAt.toISOString(),
                token
            }
        }
    }
}
module.exports = userResolvers