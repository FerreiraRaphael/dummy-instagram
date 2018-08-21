const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execute, subscribe } = require('graphql');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const { createServer } = require('http');
const { createDatabase } = require('./database');
const createGraphQLSchema = require('./graphql');
const { PhotoService } = require('./graphql/types/photo/service');
const { UserService } = require('./graphql/types/user/service');
const { AuthService } = require('./graphql/types/auth/service');

const DEFAULT_PORT = 3001;
const DEFAULT_SECRET = 'totally-unguessable-jwt-secret';

const getCurrentUserFunction = (db, { _id, version }) => () =>
  db.users.findOne({ _id, version });

const createServices = (db, getCurrentUser) => {
  const userService = new UserService(db, getCurrentUser);
  return {
    PhotoService: new PhotoService(db, getCurrentUser),
    UserService: userService,
    AuthService: new AuthService(userService, DEFAULT_SECRET),
  };
};

const createContext = (db, getCurrentUser) => ({
  getCurrentUser,
  db,
  ...createServices(db, getCurrentUser),
});

const createExpressServer = async ({ secret = DEFAULT_SECRET, schema, db }) => {
  const app = express();
  app.use(
    '/graphql',
    cors(),
    jwt({ secret, credentialsRequired: false }),
    bodyParser.json(),
    apolloUploadExpress(),
    graphqlExpress(({ user }) => ({
      schema,
      context: createContext(db, getCurrentUserFunction(db, user || {})),
    })),
  );
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://localhost:${DEFAULT_PORT}/subscriptions`,
    }),
  );
  return app;
};

const createSubscriptionServer = ({ server, schema, db }) =>
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect(connectionParams, webSocket) {
        return new Promise((res) => {
          const token = webSocket.upgradeReq.headers.authorization
            ? webSocket.upgradeReq.headers.authorization.split('Bearer ')[1]
            : '';
          jsonwebtoken.verify(token, DEFAULT_SECRET, (err, encoded) => {
            const getCurrentUser = getCurrentUserFunction(db, encoded || {});
            res(createContext(db, getCurrentUser));
          });
        });
      },
    },
    {
      server,
      path: '/subscriptions',
    },
  );

const launchServer = async ({ port = DEFAULT_PORT, secret }) => {
  const schema = await createGraphQLSchema();
  const db = await createDatabase();
  const expressServer = await createExpressServer({ secret, schema, db });
  const server = createServer(expressServer);
  return new Promise((resolve, reject) =>
    server.listen(port, (err) => {
      if (err) {
        return reject(err);
      }
      createSubscriptionServer({ server, schema, db });
      return resolve({ port, server });
    }),
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
      console.log(
        ` --> Subscriptions endpoint: ws://localhost:${port}/subscriptions`,
      );
    },
    (error) => console.error('Could not start server because', error),
    /* eslint-enable no-console */
  );
}
