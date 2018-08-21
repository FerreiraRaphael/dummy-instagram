const { withFilter } = require('graphql-subscriptions');
const { pubsub } = require('../../subscritions');
const { PHOTO_ADDED, PHOTO_DELETED, PHOTO_EDITED } = require('./service');

/* eslint-disable no-underscore-dangle */
module.exports = {
  resolver: {
    Photo: { id: ({ _id }) => _id },
    User: {
      photos: (owner, args, { PhotoService }) =>
        PhotoService.findUserPhotos(owner._id),
    },
    Query: {
      photos: (root, args, { PhotoService }) => PhotoService.findPhotos(),
      photo: (root, { id }, { PhotoService }) => PhotoService.findPhoto(id),
    },
    Mutation: {
      uploadPhoto: (root, { image, caption, isPrivate }, { PhotoService }) =>
        PhotoService.uploadPhoto({ image, caption, isPrivate }).then(
          (photo) => {
            pubsub.publish(PHOTO_ADDED, { [PHOTO_ADDED]: photo });
            return photo;
          },
        ),
      editPhoto: async (root, { id, caption, isPrivate }, { PhotoService }) =>
        PhotoService.editPhoto({ id, caption, isPrivate }).then((photo) => {
          pubsub.publish(PHOTO_EDITED, { [PHOTO_EDITED]: photo });
          return photo;
        }),
      deletePhoto: async (root, { id }, { PhotoService }) =>
        PhotoService.deletePhoto(id).then((deleted) => {
          if (deleted) {
            pubsub.publish(PHOTO_DELETED, { [PHOTO_DELETED]: id });
          }
          return deleted;
        }),
    },
    Subscription: {
      photoAdded: {
        subscribe: withFilter(
          () => pubsub.asyncIterator([PHOTO_ADDED]),
          ({ photoAdded }, args, { getCurrentUser }) => {
            if (photoAdded.isPrivate) {
              return getCurrentUser().then(
                (user) => user && photoAdded.ownerId === user._id,
              );
            }
            return true;
          },
        ),
      },
      photoEdited: {
        subscribe: () => pubsub.asyncIterator([PHOTO_EDITED]),
      },
      photoDeleted: {
        subscribe: () => pubsub.asyncIterator([PHOTO_DELETED]),
      },
    },
  },
};
