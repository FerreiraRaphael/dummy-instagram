import React from 'react';
import PropTypes from 'prop-types';
import PhotoData from '../containers/photo';
import './Photo.css';

const BASE_WIDTH = 600;

export const PhotoPreview = ({ width, height, loading, error, data }) => {
  if (loading) {
    return (
      <div className="PhotoPreview loading">
        <div
          className="PhotoPreview-image"
          style={{ width, height: (height / width) * BASE_WIDTH }}
        >
          &nbsp;
        </div>
        <div className="PhotoPreview-metadata">Loading...</div>
      </div>
    );
  }
  if (error) return <div>Error :(</div>;

  const { photo } = data;
  return (
    <div className="PhotoPreview">
      <div
        className="PhotoPreview-image"
        style={{
          backgroundImage: `url('data:image/jpeg;base64,${photo.image}')`,
          width: BASE_WIDTH,
          height: (photo.height / photo.width) * BASE_WIDTH
        }}
      />
      <div className="PhotoPreview-metadata">
        <div className="PhotoPreview-metadata-owner">
          Uploaded by <em>{photo.owner.name}</em>
        </div>
        {photo.caption && (
          <div className="PhotoPreview-metadata-caption">{photo.caption}</div>
        )}
      </div>
    </div>
  );
};

PhotoPreview.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error), // eslint-disable-line react/require-default-props
  data: PropTypes.shape({
    photo: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      width: PropTypes.number,
      height: PropTypes.number,
      owner: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        name: PropTypes.string.isRequired
      }),
      caption: PropTypes.string
    })
  })
};

PhotoPreview.defaultProps = {
  data: {}
};

export default props => <PhotoData {...props}>{PhotoPreview}</PhotoData>;
