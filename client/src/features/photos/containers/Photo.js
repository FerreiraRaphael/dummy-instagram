import React from 'react';
import PropTypes from 'prop-types';
import PhotoData from '../graphql/photo';
import { GET_PHOTO_EDITED } from '../graphql/photoEdited';
import { PhotoPreview } from '../components/PhotoPreview';

class Photo extends React.Component {
  componentDidMount() {
    this.props.subscribeToEditPhoto();
  }
  render() {
    const { loading, data, error } = this.props;
    if (error) {
      return <p>Error :(</p>;
    }
    return <PhotoPreview loading={loading} photo={data.photo} />;
  }
}

Photo.propTypes = {
  subscribeToEditPhoto: PropTypes.func.isRequired,
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
        name: PropTypes.string.isRequired,
      }),
      caption: PropTypes.string,
    }),
  }).isRequired,
};

export default (props) => (
  <PhotoData {...props}>
    {({ subscribeToMore, ...result }) => (
      <Photo
        {...result}
        subscribeToEditPhoto={() =>
          subscribeToMore({
            document: GET_PHOTO_EDITED,
            updateQuery(prev, { subscriptionData }) {
              if (!subscriptionData.data) return prev;
              const { photoEdited } = subscriptionData.data;
              return prev.photo.id === photoEdited.id
                ? {
                    photo: {
                      ...prev.photo,
                      ...photoEdited,
                    },
                  }
                : prev;
            },
          })
        }
      />
    )}
  </PhotoData>
);
