const story = require('../../models/story')
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
    console.log(date);
}
// new Date(new Date(myStringDate).getTime() + 60 * 60 * 24 * 1000);

module.exports = storyResolver