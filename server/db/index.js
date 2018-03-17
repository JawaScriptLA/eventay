const sql = require('./sql.js');

const setup = async () => {
  await sql.dropDatabase();
  await sql.dropUsersTable();
  await sql.dropEventsTable();
  await sql.dropCommentsTable();
  await sql.dropFriendshipsTable();
  await sql.dropGuestsTable();
  await sql.createDatabase();
  await sql.createUsersTable();
  await sql.createEventsTable();
  await sql.createCommentsTable();
  await sql.createFriendshipsTable();
  await sql.createGuestsTable();
  process.exit();
};

setup();