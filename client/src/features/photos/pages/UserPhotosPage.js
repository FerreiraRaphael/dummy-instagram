import React from 'react';
import PropTypes from 'prop-types';
import UserPhotosList from '../containers/UserPhotosList';

export const UserPhotosPage = ({
  match: {
    params: { name },
  },
}) => (
  <div>
    <UserPhotosList username={name} />
  </div>
);

UserPhotosPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
