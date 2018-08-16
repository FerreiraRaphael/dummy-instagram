import React from 'react';
import PropTypes from 'prop-types';
import AllPhotos from '../containers/allPhotos';
import Photo from './Photo';

export const PhotoListInner = ({ loading, error, data }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <div className="PhotoList">
      {data.photos.map(photo => (
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

PhotoListInner.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error), // eslint-disable-line react/require-default-props
  data: PropTypes.shape({
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        width: PropTypes.number,
        height: PropTypes.number
      })
    )
  })
};

PhotoListInner.defaultProps = {
  data: {}
};

export const PhotoList = () => <AllPhotos>{PhotoListInner}</AllPhotos>;
