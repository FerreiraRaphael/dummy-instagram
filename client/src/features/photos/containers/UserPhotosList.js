import React from 'react';
import PropTypes from 'prop-types';
import UserPhotos from '../graphql/userPhotos';
import { GET_PHOTO_ADDED } from '../graphql/photoAdded';
import { GET_PHOTO_DELETED } from '../graphql/photoDeleted';
import { GET_PHOTO_EDITED } from '../graphql/photoEdited';
import { PhotoList } from '../components/PhotoList';
import { CurrentUser } from '../../auth/graphql/currentUser';

class UserPhotosList extends React.Component {
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
    return (
      <PhotoList
        loading={loading}
        photos={(data.user && data.user.photos) || []}
      />
    );
  }
}

UserPhotosList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error), // eslint-disable-line react/require-default-props
  data: PropTypes.shape({
    name: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    ),
  }),
  subscribeToNewPhoto: PropTypes.func.isRequired,
  subscribeToDeletedPhoto: PropTypes.func.isRequired,
  subscribeToEditPhoto: PropTypes.func.isRequired,
};

UserPhotosList.defaultProps = {
  data: {
    name: '',
    photos: [],
  },
};

const UserPhotosListWrapped = ({ username }) => (
  <CurrentUser>
    {({ currentUser }) => (
      <UserPhotos variables={{ name: username }}>
        {({ subscribeToMore, ...result }) => (
          <UserPhotosList
            {...result}
            subscribeToNewPhoto={() =>
              subscribeToMore({
                document: GET_PHOTO_ADDED,
                updateQuery(prev, { subscriptionData }) {
                  if (!subscriptionData.data) return prev;
                  const { photoAdded } = subscriptionData.data;
                  return {
                    ...prev,
                    user: {
                      ...prev.user,
                      photos: [photoAdded, ...prev.user.photos],
                    },
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
                  const index = prev.user.photos.findIndex(
                    (photo) => photo.id === photoDeleted,
                  );
                  if (index !== -1) {
                    return {
                      ...prev,
                      user: {
                        ...prev.user,
                        photos: [
                          ...prev.user.photos.slice(0, index),
                          ...prev.user.photos.slice(index + 1),
                        ],
                      },
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
                    (!currentUser ||
                      (currentUser &&
                        currentUser.id !== photoEdited.owner.id)) &&
                    photoEdited.isPrivate
                  ) {
                    const index = prev.user.photos.findIndex(
                      (photo) => photo.id === photoEdited.id,
                    );
                    if (index !== -1) {
                      return {
                        ...prev,
                        user: {
                          ...prev.user,
                          photos: [
                            ...prev.user.photos.slice(0, index),
                            ...prev.user.photos.slice(index + 1),
                          ],
                        },
                      };
                    }
                  }
                  return prev;
                },
              })
            }
          />
        )}
      </UserPhotos>
    )}
  </CurrentUser>
);

UserPhotosListWrapped.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserPhotosListWrapped;
