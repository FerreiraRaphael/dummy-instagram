import React from 'react';
import PropTypes from 'prop-types';
import AllPhotos from '../graphql/allPhotos';
import { GET_PHOTO_ADDED } from '../graphql/photoAdded';
import { GET_PHOTO_DELETED } from '../graphql/photoDeleted';
import { GET_PHOTO_EDITED } from '../graphql/photoEdited';
import { PhotoList } from '../components/PhotoList';
import { UserContext } from '../../../core/UserContext';

class AllPhotosList extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewPhoto();
    this.props.subscribeToEditPhoto();
    this.props.subscribeToDeletedPhoto();
  }

  render() {
    const { loading, error, data } = this.props;
    if (error) {
      return <p>Error :(</p>;
    }
    return <PhotoList loading={loading} photos={data.photos || []} />;
  }
}

AllPhotosList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error), // eslint-disable-line react/require-default-props
  data: PropTypes.shape({
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    ),
  }).isRequired,
  subscribeToNewPhoto: PropTypes.func.isRequired,
  subscribeToDeletedPhoto: PropTypes.func.isRequired,
  subscribeToEditPhoto: PropTypes.func.isRequired,
};

export default () => (
  <UserContext.Consumer>
    {({ user }) => (
      <AllPhotos>
        {({ subscribeToMore, ...result }) => (
          <AllPhotosList
            {...result}
            subscribeToNewPhoto={() =>
              subscribeToMore({
                document: GET_PHOTO_ADDED,
                updateQuery(prev, { subscriptionData }) {
                  if (!subscriptionData.data) return prev;
                  const { photoAdded } = subscriptionData.data;
                  return {
                    ...prev,
                    photos: [photoAdded, ...prev.photos],
                  };
                },
              })
            }
            subscribeToDeletedPhoto={() =>
              subscribeToMore({
                document: GET_PHOTO_DELETED,
                updateQuery(prev, { subscriptionData }) {
                  if (!subscriptionData.data) return prev;
                  const { photoDeleted } = subscriptionData.data;
                  const index = prev.photos.findIndex(
                    (photo) => photo.id === photoDeleted,
                  );
                  if (index !== -1) {
                    return {
                      photos: [
                        ...prev.photos.slice(0, index),
                        ...prev.photos.slice(index + 1),
                      ],
                    };
                  }
                  return prev;
                },
              })
            }
            subscribeToEditPhoto={() =>
              subscribeToMore({
                document: GET_PHOTO_EDITED,
                updateQuery(prev, { subscriptionData }) {
                  if (!subscriptionData.data) return prev;
                  const { photoEdited } = subscriptionData.data;
                  if (
                    (!user || (user && user.id !== photoEdited.ownerId)) &&
                    photoEdited.isPrivate
                  ) {
                    const index = prev.photos.findIndex(
                      (photo) => photo.id === photoEdited.id,
                    );
                    if (index !== -1) {
                      return {
                        photos: [
                          ...prev.photos.slice(0, index),
                          ...prev.photos.slice(index + 1),
                        ],
                      };
                    }
                  }
                  return prev;
                },
              })
            }
          />
        )}
      </AllPhotos>
    )}
  </UserContext.Consumer>
);
