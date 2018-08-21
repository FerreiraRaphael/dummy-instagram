import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const Login = ({ children }) => (
  <Mutation mutation={LOGIN}>{children}</Mutation>
);

Login.propTypes = {
  children: PropTypes.func.isRequired,
};
