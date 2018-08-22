const { homedir } = require('os');
const path = require('path');
const Datastore = require('nedb-promise');
const pkg = require('../package.json');

const defaultDatabaseFilename = path.join(
  homedir(),
  'databases',
  `.${pkg.name}`,
);

const modelNames = ['idSeq', 'users', 'photos'];

const createDatabase = ({
  filename = defaultDatabaseFilename,
  autoload = true,
  ...rest
} = {}) =>
  modelNames.reduce(
    (db, model) => ({
      ...db,
      [model]: new Datastore({
        filename: `${filename}.${model}.db`,
        autoload,
        ...rest,
      }),
    }),
    {},
  );

const seedDatabase = async (query, seedName) => {
  /* eslint-disable global-require */
  /* eslint-disable import/no-dynamic-require */
  const { up } = require(path.join(__dirname, 'seeds', `${seedName}.js`));
  /* eslint-enable global-require */
  /* eslint-enable import/no-dynamic-require */
  await up(query);
};

module.exports = { createDatabase, seedDatabase };
