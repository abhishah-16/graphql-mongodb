require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Post = require('../../models/post')
const User = require('../../models/user')

const userResolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.find()
            return users
        }
    },
    Mutation: {
        register: async (parent, args, contex, info) => {
            const { username, email, password, confirmPassword } = args.input

            // email exists
            const user = await User.findOne({ email })
            if (user) {
                throw new Error('Email already exists')
            }

            // match password & confirmPassword
            if (password != confirmPassword) {
                throw new Error('Password does not match')
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