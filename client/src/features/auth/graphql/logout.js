import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const Logout = ({ children }) => (
  <Mutation mutation={LOGOUT}>{children}</Mutation>
);

Logout.propTypes = {
  children: PropTypes.func.isRequired,
};
