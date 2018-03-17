const db = require('./db.js');
const { relationalDbName } = require('../config.js');

const database = relationalDbName;

const dropDatabase = async () => {
  try {
    await db.queryAsync(`
    DROP DATABASE IF EXISTS ${database}
    `);
    console.log('Successfully dropped database ', database);
  } catch (err) {
    console.log('Error dropping database ', database);
  }
};

const createDatabase = async () => {
  try {
    await db.queryAsync(`
      CREATE DATABASE ${database}
    `);
    console.log('Successfully created database ', database);
  } catch (err) {
    console.log('Error creating database ', database);
  }
};

const useDatabase = async () => {
  try {
    await db.queryAsync(`
      USE IF EXISTS ${database}
    `);
    console.log('Successfully using database ', database);
  } catch (err) {
    console.log('Error using database ', database);
  }
};

const dropUsersTable = async () => {
  try {
    await db.queryAsync(`
      DROP TABLE IF EXISTS users
    `);
    console.log('Successfully dropped users table.');
  } catch (err) {
    console.log('Error dropping users table.');
  }
};

const createUsersTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS users
      (
        id SERIAL,
        username VARCHAR(255) UNIQUE NOT NULL,
        CONSTRAINT usersPk
          PRIMARY KEY(id)
      )
    `);
    console.log('Successfully created users table.');
  } catch (err) {
    console.log('Error creating users table.');
  }
};

const dropEventsTable = async () => {
  try {
    await db.queryAsync(`
      DROP TABLE IF EXISTS events
    `);
    console.log('Successfully dropped events table.');
  } catch (err) {
    console.log('Error dropping events table.');
  }
};

const createEventsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS events
      (
        id SERIAL,
        hostId INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255),
        startTime TIMESTAMP,
        endTime TIMESTAMP,
        CONSTRAINT eventsPk
          PRIMARY KEY(id),
        CONSTRAINT fkEventsHostId
          FOREIGN KEY(hostId) REFERENCES users(id)
          ON DELETE CASCADE
      )
    `);
    console.log('Successfully created events table.');
  } catch (err) {
    console.log('Error creating events table.');
  }
};

const dropCommentsTable = async () => {
  try {
    await db.queryAsync(`
      DROP TABLE IF EXISTS comments
    `);
    console.log('Successfully dropped comments table.');
  } catch (err) {
    console.log('Error dropping comments table.');
  }
};

const createCommentsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS comments
      (
        id SERIAL,
        userId INT NOT NULL,
        eventId INT NOT NULL,
        commentBody TEXT,
        CONSTRAINT commentId
          PRIMARY KEY(id),
        CONSTRAINT fkCommentsUserId
          FOREIGN KEY(userId) REFERENCES users(id),
        CONSTRAINT fkCommentsEventId
          FOREIGN KEY(eventId) REFERENCES events(id)
      )
    `);
    console.log('Successfully created comments table.');
  } catch (err) {
    console.log('Error creating comments table.');
  }
};

const dropFriendshipsTable = async () => {
  try {
    await db.queryAsync(`
      DROP TABLE IF EXISTS friendships
    `);
    console.log('Successfully dropped friendships table.');
  } catch (err) {
    console.log('Error dropping friendships table.');
  }
};

const createFriendshipsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS friendships
      (
        id SERIAL,
        userId INT NOT NULL,
        targetId INT NOT NULL,
        isAccepted BOOLEAN,
        CONSTRAINT friendshipsId
          PRIMARY KEY(id),
        CONSTRAINT fkFriendshipsUserId
          FOREIGN KEY(userId) REFERENCES users(id),
        CONSTRAINT fkFriendshipsTargetId
          FOREIGN KEY(targetId) REFERENCES users(id)
      )
    `);
    console.log('Successfully created friendships table.');
  } catch (err) {
    console.log('Error creating friendships table.');
  }
};

const dropGuestsTable = async () => {
  try {
    await db.queryAsync(`
      DROP TABLE IF EXISTS guests
    `);
    console.log('Successfully dropped guests table.');
  } catch (err) {
    console.log('Error dropping guests table.');
  }
};

const createGuestsTable = async () => {
  try {
    await db.queryAsync(`
      CREATE TYPE status AS ENUM (
        'pending', 
        'going', 
        'declined',
        'maybe'
      )
    `)
    await db.queryAsync(`
      CREATE TABLE IF NOT EXISTS guests
      (
        id SERIAL,
        eventId INT NOT NULL,
        userId INT NOT NULL,
        eventStatus status,
        CONSTRAINT guestsId
          PRIMARY KEY(id),
        CONSTRAINT fkGuestsEventId
          FOREIGN KEY(eventId) REFERENCES events(id),
        CONSTRAINT fkGuestsUserId
          FOREIGN KEY(userId) REFERENCES users(id),
      )
    `);
    console.log('Successfully created guests table.');
  } catch (err) {
    console.log('Error creating guests table.');
  }
};

module.exports = {
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
};
