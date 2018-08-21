import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

export const GET_PHOTO_DELETED = gql`
  subscription onPhotoEdited {
    photoDeleted
  }
`;

export const PhotoDeleted = ({ children }) => (
  <Subscription subscription={GET_PHOTO_DELETED}>{children}</Subscription>
);

PhotoDeleted.propTypes = {
  children: PropTypes.func.isRequired,
};
