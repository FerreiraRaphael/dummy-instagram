const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const jwt = require('express-jwt');
const { createDatabase } = require('./database');
const createGraphQLSchema = require('./graphql');

const DEFAULT_PORT = 3001;
const DEFAULT_SECRET = 'totally-unguessable-jwt-secret';

const createServer = async ({ secret = DEFAULT_SECRET }) => {
  const app = express();
  const schema = await createGraphQLSchema();
  const db = await createDatabase();
  app.use(
    '/graphql',
    cors(),
    jwt({ secret, credentialsRequired: false }),
    bodyParser.json(),
    apolloUploadExpress(),
    graphqlExpress(({ user }) => ({ schema, context: { user, db } }))
  );
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );
  return app;
};

const launchServer = async ({ port = DEFAULT_PORT, secret }) => {
  const server = await createServer({ secret });
  return new Promise((resolve, reject) =>
    server.listen(port, err => (err ? reject(err) : resolve({ port, server })))
  );
};

if (module.parent) {
  module.exports = { createServer, launchServer };
} else {
  launchServer({ port: process.env.PORT, secret: process.env.SECRET }).then(
    /* eslint-disable no-console */
    ({ port }) => {
      console.log(`Server listening on http://localhost:${port}`);
      console.log(` --> GraphQL endpoint: http://localhost:${port}/graphql`);
    },
    error => console.error('Could not start server because', error)
    /* eslint-enable no-console */
  );
}
