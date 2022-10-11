const Post = require('../../models/post')
const User = require('../../models/user')

const userResolvers = {
    Query: {
        getUsers: async () => {
            const users = await User.find()
            return users
        }
    }
}
module.exports = userResolvers