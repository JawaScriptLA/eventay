const sql = require('./sql.js');
let config;

try {
  config = require('../config.js');
} catch (err) {
  config = require('../config.example.js');
}

const setup = async () => {
  await sql.drop('table', 'reactions');
  await sql.drop('table', 'emojis');
  await sql.drop('table', 'likes');
  await sql.drop('table', 'posts');
  await sql.drop('table', 'attendants');
  await sql.drop('table', 'friends');
  await sql.drop('table', 'events');
  await sql.drop('table', 'users');
  await sql.drop(
    'database',
    config.rdb.environment === 'test'
      ? config.rdb.name_testing
      : config.rdb.name_dev
  );
  await sql.createDatabase();
  await sql.createUsersTable();
  await sql.createEventsTable();
  await sql.createFriendsTable();
  await sql.createAttendantsTable();
  await sql.createPostsTable();
  await sql.createLikesTable();
  await sql.createEmojisTable();
  await sql.createReactionsTable();
};

module.exports = setup;
