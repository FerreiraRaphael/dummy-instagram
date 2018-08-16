import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const apolloClient = new ApolloClient({ uri: 'http://localhost:3001/graphql' });

export const withApolloClient = App => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

export default apolloClient;
