const mongoose = require('mongoose')
const Schema = mongoose.Schema
const storySchema = new Schema({
    body: {
        type: String
    },
    username: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Story', storySchema)