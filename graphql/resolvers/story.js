const Story = require('../../models/story')
const checkAuth = require('../../utils/check.auth')

const storyResolver = {
    Query: {
        getStories: async () => {
            const stories = await deleteStoriesAfterDay()
            return stories
        }
    },
    Mutation: {
        createStory: async (parent, args, contex) => {
            const user = checkAuth(contex)
            const newStory = new Story({
                body: args.body,
                username: user.username,
                user: user.id
            })
            await newStory.save()
            return {
                ...newStory._doc,
                id: newStory._id,
                createdAt: newStory.createdAt.toISOString(),
            }
        },
        updateStory: async (parent, args, context) => {
            const { username } = checkAuth(context)
            const { id, body } = args
            const story = await Story.findById(id)
            if (!story) {
                throw new Error('Story not found')
            }
            if (story.username == username) {
                const result = await story.updateOne({ body })
                if (result.modifiedCount === 1) {
                    return ('story updated Succesfully')
                }
            } else {
                throw new Error('Action not allowed')
            }
        },
        deleteStory: async (parent, args, contex) => {
            const { username } = checkAuth(contex)
            const { storyid } = args
            const story = await Story.findById(storyid)
            if (!story) {
                throw new Error('Story not found')
            }
            if (story.username === username) {
                await story.remove()
            } else {
                throw new Error('Action not allowed')
            }
            return 'Story is deleted'
        }
    }
}

const deleteStoriesAfterDay = async () => {
    const stories = await Story.find()
    const date = (new Date().getDate())
    const hours = (new Date().getHours())
    const month = (new Date().getMonth())
    const year = (new Date().getFullYear())
    const filterstories = stories.filter(s => {
        if (s.createdAt.getMonth() == month) {
            if (s.createdAt.getDate() == date - 1 || s.createdAt.getDate() >= date) {
                if (s.createdAt.getDate() == date - 1) {
                    if (s.createdAt.getHours() >= hours) {
                        return s
                    } else {
                        return null
                    }
                } else {
                    return s
                }
            } else {
                return null
            }
        }
    })
    return filterstories.map(f => {
        return {
            ...f._doc,
            id: f._id,
            createdAt: f.createdAt.toISOString()
        }
    })
}

module.exports = storyResolver