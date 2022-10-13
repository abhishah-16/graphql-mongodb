require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

const myPlugin = {
    async requestDidStart(initialRequestContext) {
        return {
            async executionDidStart(executionRequestContext) {
                return {
                    willResolveField({ source, args, contextValue, info }) {
                        const start = process.hrtime.bigint();
                        return (error, result) => {
                            const end = process.hrtime.bigint();
                            console.log(
                                `Field ${info.parentType.name}.${info.fieldName
                                } took ${end - start}ns`,
                            );
                            if (error) {
                                console.log(`It failed with ${error}`);
                            } else {
                                console.log(`It returned ${result}`);
                            }
                        };
                    },
                };
            },
        };
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    plugins: [myPlugin]
})

mongoose.connect(process.env.DATABASE_URL, () => {
    console.log(`CONNECTED TO MONGODB ATLAS : )`);
})

server.listen(5454).then((res) => {
    console.log(`SERVER IS RUNNING AT ${res.url} :)`)
})