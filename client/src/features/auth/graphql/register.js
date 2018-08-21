import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;

export const Register = ({ children }) => (
  <Mutation mutation={REGISTER}>{children}</Mutation>
);

Register.propTypes = {
  children: PropTypes.func.isRequired,
};
