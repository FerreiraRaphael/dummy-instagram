import React from 'react';
import ApolloClient from 'apollo-client';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';

const inMemoryCache = new InMemoryCache();

// Create regular NetworkInterface by using apollo-client's API:
const httpLink = createUploadLink({ uri: 'http://localhost:3001/graphql' });

const bearerLink = new ApolloLink((operation, forward) => {
  let authToken;
  try {
    const UserContext = JSON.parse(localStorage.getItem('UserContext'));
    authToken = UserContext.token;
  } catch (e) {
    authToken = '';
  }
  operation.setContext((context) => ({
    ...context,
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }));
  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/subscriptions',
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  ssrMode: typeof window !== 'undefined',
  cache: inMemoryCache.restore({}),
  link: bearerLink.concat(link),
});

export const withApolloClient = (App) => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

export default apolloClient;
