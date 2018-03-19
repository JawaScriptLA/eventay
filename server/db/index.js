const sql = require('./sql.js');

const setup = async () => {
<<<<<<< HEAD
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
=======
  await dropDatabase();
  await dropUsersTable();
  await dropEventsTable();
  await dropCommentsTable();
  await dropFriendshipsTable();
  await dropGuestsTable();
  await createDatabase();
  await useDatabase();
  //   .then(async () => {
      await createUsersTable();
      await createEventsTable();
      await createCommentsTable();
      await createFriendshipsTable();
      await createGuestsTable();
    // });
>>>>>>> f40d93314447cf7d7e6b4a946b4baa39f4eaa015
  process.exit();
};

setup();