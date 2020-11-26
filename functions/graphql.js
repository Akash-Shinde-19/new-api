const { adminApolloServer } = require('./bundle/modules/admin/index');
const { connection } = require('./bundle/modules');

const server = adminApolloServer();

function runApollo(event, context, apollo) {
    return new Promise((resolve, reject) => {
        const callback = (error, body) => (error ? reject(error) : resolve(body));
        apollo(event, context, callback);
    });
}

exports.handler = async(event, context) => {
    const apollo = server.createHandler({
        cors: {
            origin: '*',
            credentials: false,
            methods: '*',
            allowedHeaders: '*',
        },
    });

    return await runApollo(event, context, apollo);
};