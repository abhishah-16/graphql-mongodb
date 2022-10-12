require('dotenv').config()
const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

module.exports = (contex) => {
    const authHeader = contex.req.headers.authorization
    if (authHeader) {
        const token = authHeader.split('Bearer  ')[1]
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid Token')
            }
        }
        throw new Error('Authentication failed')
    }
    throw new Error('Authentication failed')
}