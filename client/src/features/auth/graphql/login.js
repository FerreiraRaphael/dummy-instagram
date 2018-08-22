import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const Login = ({ children, onError, onCompleted }) => (
  <Mutation onCompleted={onCompleted} onError={onError} mutation={LOGIN}>
    {children}
  </Mutation>
);

Login.propTypes = {
  onError: PropTypes.func,
  onCompleted: PropTypes.func,
  children: PropTypes.func.isRequired,
};

Login.defaultProps = {
  onError: () => {},
  onCompleted: () => {},
};
