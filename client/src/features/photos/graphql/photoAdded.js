import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

export const GET_PHOTO_ADDED = gql`
  subscription onPhotoAdded {
    photoAdded {
      id
      width
      height
    }
  }
`;

export const PhotoAdded = ({ children }) => (
  <Subscription subscription={GET_PHOTO_ADDED}>{children}</Subscription>
);

PhotoAdded.propTypes = {
  children: PropTypes.func.isRequired,
};
