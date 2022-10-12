const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    body: {
        type: String
    },
    email: {
        type: String
    },
    comments: [
        {
            body: {
                type: String
            },
            email: {
                type: String
            },
            createdAt: {
                type: String
            }
        }
    ],
    likes: [
        {
            email: {
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
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)