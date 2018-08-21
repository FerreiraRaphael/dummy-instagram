import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_ALL_PHOTOS = gql`
  query getAllPhotos {
    photos {
      id
      width
      height
    }
  }
`;

const AllPhotos = ({ children, onCompleted }) => (
  <Query query={GET_ALL_PHOTOS} onCompleted={onCompleted}>
    {children}
  </Query>
);

AllPhotos.propTypes = {
  children: PropTypes.func.isRequired,
  onCompleted: PropTypes.func,
};

AllPhotos.defaultProps = {
  onCompleted: () => {},
};

export default AllPhotos;
