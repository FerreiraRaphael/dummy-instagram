module.exports = {
  resolver: {
    Mutation: {
      register: (root, { username, password }, { UserService, AuthService }) =>
        UserService.createUser({ username, password }).then(() =>
          AuthService.login({ username, password }),
        ),

      login: async (root, { username, password }, { AuthService }) =>
        AuthService.login({ username, password }),

      logout: async (root, args, { AuthService }) => AuthService.logout(),
    },
  },
};
