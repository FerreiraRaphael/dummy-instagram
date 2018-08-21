/* eslint-disable no-underscore-dangle */
module.exports = {
  resolver: {
    Query: {
      me: (root, args, { getCurrentUser }) => getCurrentUser(),
      user: (root, { name }, { UserService }) =>
        UserService.findOneUser({ name }),
    },
    User: {
      id: ({ _id }) => _id,
    },
    Photo: {
      owner: ({ ownerId }, args, { UserService }) =>
        UserService.findOneUser({ _id: parseInt(ownerId, 10) }),
    },
  },
};
