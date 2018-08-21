const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function throwAuthError(message = 'username or password wrong') {
  throw new AuthenticationError(message);
}

function createToken({ _id, version }, secret) {
  return jwt.sign({ _id, version }, secret);
}

/**
 * Service responsible for managing the User authentication.
 */
class AuthService {
  constructor(UserService, secret) {
    this.UserService = UserService;
    this.secret = secret;
  }

  /**
   * Authenticate a user, with username and password.
   */
  async login({ username, password }) {
    const user = await this.UserService.findOneUser({ name: username });
    if (!user) {
      throwAuthError();
    }
    if (!(await comparePassword(password, user.password))) {
      throwAuthError();
    }
    return createToken(user, this.secret);
  }

  /**
   * Logouts a user changing incrementing it's version,
   * this away the token is invalided.
   */
  async logout() {
    const currentUser = await this.UserService.getCurrentUser();
    return this.UserService.updateUser(currentUser._id, {
      version: currentUser.version + 1,
    }).then((replaceNum) => !!replaceNum);
  }
}

module.exports = {
  AuthService,
};
