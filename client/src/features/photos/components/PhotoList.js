import React from 'react';
import PropTypes from 'prop-types';
import Photo from '../containers/Photo';

export const PhotoList = ({ loading, photos }) => {
  if (loading) return <div>Loading...</div>;
  return (
    <div className="PhotoList">
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          id={photo.id}
          width={photo.width}
          height={photo.height}
        />
      ))}
    </div>
  );
};

PhotoList.propTypes = {
  loading: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  ).isRequired,
};
