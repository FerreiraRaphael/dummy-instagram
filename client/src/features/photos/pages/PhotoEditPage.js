import React from 'react';
import PropTypes from 'prop-types';
import PhotoEditForm from '../containers/PhotoEditForm';

export const PhotoEditPage = ({
  match: {
    params: { id },
  },
}) => (
  <div>
    <PhotoEditForm id={id} />
  </div>
);

PhotoEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
