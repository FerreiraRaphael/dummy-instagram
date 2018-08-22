import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const UPLOAD_PHOTO = gql`
  mutation UploadPhoto($image: Upload!, $caption: String, $isPrivate: Boolean) {
    uploadPhoto(image: $image, caption: $caption, isPrivate: $isPrivate) {
      id
    }
  }
`;

export const UploadPhoto = ({ children, onError, onCompleted }) => (
  <Mutation onCompleted={onCompleted} onError={onError} mutation={UPLOAD_PHOTO}>
    {children}
  </Mutation>
);

UploadPhoto.propTypes = {
  onError: PropTypes.func,
  onCompleted: PropTypes.func,
  children: PropTypes.func.isRequired,
};

UploadPhoto.defaultProps = {
  onError: () => {},
  onCompleted: () => {},
};
