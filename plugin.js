const myPlugin = {
    async requestDidStart(initialRequestContext) {
        return {
            async executionDidStart(executionRequestContext) {
                return {
                    willResolveField({ source, args, contextValue, info }) {
                        const start = process.hrtime.bigint();
                        return (error, result) => {
                            const end = process.hrtime.bigint();
                            if (info.parentType.name == 'Mutation' || info.parentType.name == 'Query') {
                                console.log(
                                    `Field ${info.parentType.name}.${info.fieldName
                                        }`.yellow,
                                );
                                if (error) {
                                    console.log(`It failed with ${error}`.magenta);
                                } else {
                                    console.log({...result});
                                }
                            }
                        };
                    },
                };
            },
        };
    },
}

module.exports = myPlugin