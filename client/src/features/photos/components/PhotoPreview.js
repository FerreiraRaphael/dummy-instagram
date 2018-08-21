import React from 'react';
import PropTypes from 'prop-types';
import './PhotoPreview.css';

const BASE_WIDTH = 600;

export const PhotoPreview = ({ loading, photo }) => {
  if (loading) {
    return (
      <div className="PhotoPreview loading">
        <div
          className="PhotoPreview-image"
          style={{ width: BASE_WIDTH, height: BASE_WIDTH }}
        >
          &nbsp;
        </div>
        <div className="PhotoPreview-metadata">Loading...</div>
      </div>
    );
  }

  return (
    <div className="PhotoPreview">
      <div
        className="PhotoPreview-image"
        style={{
          backgroundImage: `url('data:image/jpeg;base64,${photo.image}')`,
          width: BASE_WIDTH,
          height: (photo.height / photo.width) * BASE_WIDTH,
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
  loading: PropTypes.bool.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.number,
    height: PropTypes.number,
    owner: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string,
    }),
    caption: PropTypes.string,
  }),
};

PhotoPreview.defaultProps = {
  photo: {},
};
