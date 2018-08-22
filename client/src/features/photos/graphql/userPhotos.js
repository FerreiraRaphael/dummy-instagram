import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_ALL_PHOTOS = gql`
  query getUserPhotos($name: String!) {
    user(name: $name) {
      name
      photos {
        id
        width
        height
      }
    }
  }
`;

const UserPhotos = ({ children, onCompleted, variables }) => (
  <Query variables={variables} query={GET_ALL_PHOTOS} onCompleted={onCompleted}>
    {children}
  </Query>
);

UserPhotos.propTypes = {
  variables: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  onCompleted: PropTypes.func,
};

UserPhotos.defaultProps = {
  onCompleted: () => {},
};

export default UserPhotos;
