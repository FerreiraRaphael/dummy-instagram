import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const EDIT_PHOTO = gql`
  mutation EditPhoto($id: ID!, $caption: String, $isPrivate: Boolean) {
    editPhoto(id: $id, caption: $caption, isPrivate: $isPrivate) {
      id
      width
      height
    }
  }
`;

export const EditPhoto = ({ children, onError, onCompleted }) => (
  <Mutation onCompleted={onCompleted} onError={onError} mutation={EDIT_PHOTO}>
    {children}
  </Mutation>
);

EditPhoto.propTypes = {
  onError: PropTypes.func,
  onCompleted: PropTypes.func,
  children: PropTypes.func.isRequired,
};

EditPhoto.defaultProps = {
  onError: () => {},
  onCompleted: () => {},
};
