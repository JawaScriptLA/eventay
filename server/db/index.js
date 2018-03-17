const {
  dropDatabase,
  createDatabase,
  useDatabase,
  dropUsersTable,
  createUsersTable,
  dropEventsTable,
  createEventsTable,
  dropCommentsTable,
  createCommentsTable,
  dropFriendshipsTable,
  createFriendshipsTable,
  dropGuestsTable,
  createGuestsTable,
} = require('./sql');

const setup = async () => {
  await dropDatabase();
  await dropUsersTable();
  await dropEventsTable();
  await dropCommentsTable();
  await dropFriendshipsTable();
  await dropGuestsTable();
  await createDatabase();
  // useDatabase()
  //   .then(async () => {
      await createUsersTable();
      await createEventsTable();
      await createCommentsTable();
      await createFriendshipsTable();
      await createGuestsTable();
    // });
  process.exit();
};

setup();
