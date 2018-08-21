const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt));
}

async function getNextUserId(idSeqRepository) {
  const seq = await idSeqRepository.findOne({
    _id: 'user',
  });
  if (!seq) {
    const newSeq = await idSeqRepository.insert({
      _id: 'user',
      value: 1,
    });
    return newSeq.value;
  }
  const newId = seq.value + 1;
  return idSeqRepository
    .update({ _id: 'user' }, { value: newId })
    .then(() => newId);
}

/**
 * Service responsible for managing the Users Repository.
 */
class UserService {
  constructor(db, getCurrentUser) {
    this.usersRepository = db.users;
    this.idSeqRepository = db.idSeq;
    this.getCurrentUser = getCurrentUser;
  }

  /**
   * Creates a User
   */
  async createUser({ username, password }) {
    return this.usersRepository
      .insert({
        _id: await getNextUserId(this.idSeqRepository),
        name: username,
        password: await hashPassword(password),
        version: 1,
      })
      .catch((e) => {
        if (e.errorType === 'uniqueViolated') {
          throw new UserInputError('username is already in use');
        }
      });
  }

  /**
   * Finds one User, by the given attributes.
   */
  findOneUser(userPartial) {
    return this.usersRepository.findOne(userPartial);
  }

  /**
   * Updates a user, given his id, and the attributes to change.
   */
  updateUser(id, userPartial) {
    return this.usersRepository.findOne({ _id: id }).then((user) => {
      if (!user) {
        return 0;
      }
      return this.usersRepository.update(
        { _id: id },
        { ...user, ...userPartial },
      );
    });
  }
}

module.exports = {
  UserService,
};
