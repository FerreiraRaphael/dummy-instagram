const { createDatabase, seedDatabase } = require('./index');

/* eslint-disable no-unused-expressions */
require('yargs').command(
  'seed <name>',
  'seed the database',
  (yargs) =>
    yargs.positional('name', { describe: 'the name of the seed to run' }),
  async ({ name }) => {
    const db = await createDatabase();
    console.log('Seeding database from', name); // eslint-disable-line no-console
    try {
      await seedDatabase(db, name);
      console.log('Completed!'); // eslint-disable-line no-console
    } catch (error) {
      console.error('Failed!', error); // eslint-disable-line no-console
    }
  },
).argv;
/* eslint-enable no-unused-expressions */
