const Story = require('../../models/story')
const checkAuth = require('../../utils/check.auth')

const storyResolver = {
    Query: {
        getStories: async () => {
            const stories = await Story.find()
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
            return newStory
        }
    }
}

module.exports = storyResolver