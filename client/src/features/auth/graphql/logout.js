import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const Logout = ({ children, onError, onCompleted }) => (
  <Mutation onCompleted={onCompleted} onError={onError} mutation={LOGOUT}>
    {children}
  </Mutation>
);

Logout.propTypes = {
  onError: PropTypes.func,
  onCompleted: PropTypes.func,
  children: PropTypes.func.isRequired,
};

Logout.defaultProps = {
  onError: () => {},
  onCompleted: () => {},
};
