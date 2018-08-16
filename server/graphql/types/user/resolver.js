module.exports = {
  resolver: {
    Query: {
      me: (root, args, { user, db }) =>
        db.users.findOne({ _id: parseInt(user.id, 10) }),
      user: (root, { name }, { db }) => db.users.findOne({ name })
    },
    User: {
      id: ({ _id }) => _id
    },
    Photo: {
      owner: ({ ownerId }, args, { db }) =>
        db.users.findOne({ _id: parseInt(ownerId, 10) })
    }
  }
};
