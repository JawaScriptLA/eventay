const sql = require('./sql.js');

const setup = async () => {
  await sql.dropReactionsTable();
  await sql.dropEmojisTable();
  await sql.dropLikesTable();
  await sql.dropPostsTable();
  await sql.dropAttendantsTable();
  await sql.dropFriendsTable();
  await sql.dropEventsTable();
  await sql.dropUsersTable();
  await sql.dropDatabase();
  await sql.createDatabase();
  await sql.createUsersTable();
  await sql.createEventsTable();
  await sql.createFriendsTable();
  await sql.createAttendantsTable();
  await sql.createPostsTable();
  await sql.createLikesTable();
  await sql.createEmojisTable();
  await sql.createReactionsTable();
  process.exit();
};

setup();