/* eslint-disable no-underscore-dangle */
module.exports = {
  resolver: {
    Photo: { id: ({ _id }) => _id },
    User: {
      photos: (owner, args, { user, db }) =>
        db.photos
          .cfind({
            $and: [
              { ownerId: owner._id },
              user
                ? {
                    $or: {
                      $and: { private: true, ownerId: user.id },
                      private: false
                    }
                  }
                : { private: false }
            ]
          })
          .sort({ createdAt: -1 })
          .exec()
    },
    Query: {
      photos: (root, args, { user, db }) =>
        db.photos
          .cfind(
            user
              ? {
                  $or: {
                    $and: { private: true, ownerId: parseInt(user.id, 10) },
                    private: false
                  }
                }
              : { private: false }
          )
          .sort({ createdAt: -1 })
          .exec(),
      photo: (root, { id }, { db, user }) =>
        db.photos.findOne({
          $and: [
            { _id: parseInt(id, 10) },
            user
              ? {
                  $or: {
                    $and: { private: true, ownerId: user.id },
                    private: false
                  }
                }
              : { private: false }
          ]
        })
    },
    Mutation: {
      uploadPhoto: async (root, args, { user }) => {
        // TODO: handle uploadPhoto
      },
      editPhoto: async (root, args, { user }) => {
        // TODO: handle editPhoto
      },
      deletePhoto: async (root, args, { user }) => {
        // TODO: handle deletePhoto
      }
    },
    Subscription: {
      photoAdded: async (root, args, ctx) => {
        // TODO: handle photoAdded Subscription
      },
      photoEdited: async (root, args, ctx) => {
        // TODO: handle photoEdited Subscription
      },
      photoDeleted: async (root, args, ctx) => {
        // TODO: handle photoDeleted Subscription
      }
    }
  }
};
