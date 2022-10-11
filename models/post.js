const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    body: {
        type: String
    },
    username: {
        type: String
    },
    comments: [
        {
            body: {
                type: String
            },
            username: {
                type: String
            },
            createdAt: {
                type: String
            }
        }
    ],
    likes: [
        {
            username: {
                type: String
            },
            createdAt: {
                type: String
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Post', postSchema)