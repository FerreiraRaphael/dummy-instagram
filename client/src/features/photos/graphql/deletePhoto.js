import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const DELETE_PHOTO = gql`
  mutation EditPhoto($id: ID!) {
    deletePhoto(id: $id)
  }
`;

export const DeletePhoto = ({ children, onError, onCompleted }) => (
  <Mutation onCompleted={onCompleted} onError={onError} mutation={DELETE_PHOTO}>
    {children}
  </Mutation>
);

DeletePhoto.propTypes = {
  onError: PropTypes.func,
  onCompleted: PropTypes.func,
  children: PropTypes.func.isRequired,
};

DeletePhoto.defaultProps = {
  onError: () => {},
  onCompleted: () => {},
};
