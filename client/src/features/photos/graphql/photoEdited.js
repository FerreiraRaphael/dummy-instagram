import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo';

export const GET_PHOTO_EDITED = gql`
  subscription onPhotoEdited {
    photoEdited {
      id
      width
      height
      image
      caption
      isPrivate
      owner {
        id
        name
      }
    }
  }
`;

export const PhotoEdited = ({ children }) => (
  <Subscription subscription={GET_PHOTO_EDITED}>{children}</Subscription>
);

PhotoEdited.propTypes = {
  children: PropTypes.func.isRequired,
};
