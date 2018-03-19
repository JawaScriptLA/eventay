const db = require('./db.js');
let config;

try {
  config = require('../config.js');
} catch (err) {
  config = require('../config.example.js');
}

module.exports = {
  dropDatabase: async () => {
    try {
      await db.queryAsync(`DROP DATABASE IF EXISTS ${config.rdb.name}`);
      console.log('Successfully dropped database', config.rdb.name);
    } catch (err) {
      console.log('Error dropping database', config.rdb.name);
    }
  },
  createDatabase: async () => {
    try {
      await db.queryAsync(`CREATE DATABASE ${config.rdb.name}`);
      console.log('Successfully created database', config.rdb.name);
    } catch (err) {
      console.log('Error creating database', config.rdb.name);
    }
  },
  useDatabase: async () => {
    try {
      await db.queryAsync(`USE IF EXISTS ${config.rdb.name}`);
      console.log('Successfully using database', config.rdb.name);
    } catch (err) {
      console.log('Error using database', config.rdb.name);
    }
  },
  dropUsersTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS users');
      console.log('Successfully dropped users table.');
    } catch (err) {
      console.log('Error dropping users table.', err);
    }
  },
  createUsersTable: async () => {
    try {
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS users
        (
          id SERIAL,
          username VARCHAR(255) UNIQUE NOT NULL,
          profile_picture VARCHAR(255),
          bio TEXT,
          likes_count INT NOT NULL DEFAULT 0,
          CONSTRAINT users_pk
            PRIMARY KEY(id)
        )
      `);
      console.log('Successfully created users table.');
    } catch (err) {
      console.log('Error creating users table.', err);
    }
  },
  dropFriendsTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS friends');
      console.log('Successfully dropped friends table.');
    } catch (err) {
      console.log('Error dropping friends table.', err);
    }
  },
  createFriendsTable: async () => {
    try {
      await db.queryAsync('DROP TYPE IF EXISTS FRIEND_STATUS');
      await db.queryAsync(`
        CREATE TYPE FRIEND_STATUS AS ENUM (
          'pending',
          'accepted',
          'blocked'
        )
      `);
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS friends
        (
          id SERIAL,
          status FRIEND_STATUS NOT NULL DEFAULT 'pending',
          user_id INT NOT NULL,
          target_id INT NOT NULL,
          CONSTRAINT friends_id
            PRIMARY KEY(id),
          CONSTRAINT fk_friends_user_id
            FOREIGN KEY(user_id) REFERENCES users(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_friends_target_id
            FOREIGN KEY(target_id) REFERENCES users(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created friends table.');
    } catch (err) {
      console.log('Error creating friends table.', err);
    }
  },
  dropEventsTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS events');
      console.log('Successfully dropped events table.');
    } catch (err) {
      console.log('Error dropping events table.', err);
    }
  },
  createEventsTable: async () => {
    try {
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS events
        (
          id SERIAL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          thumbnail VARCHAR(255),
          location VARCHAR(255),
          likes_count INT NOT NULL DEFAULT 0,
          start_time TIMESTAMP,
          end_time TIMESTAMP,
          publicity BOOLEAN NOT NULL DEFAULT false,
          host_id INT NOT NULL,
          CONSTRAINT events_pk
            PRIMARY KEY(id),
          CONSTRAINT fk_events_host_id
            FOREIGN KEY(host_id) REFERENCES users(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created events table.');
    } catch (err) {
      console.log('Error creating events table.', err);
    }
  },
  dropAttendantsTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS attendants');
      console.log('Successfully dropped attendants table.');
    } catch (err) {
      console.log('Error dropping attendants table.', err);
    }
  },
  createAttendantsTable: async () => {
    try {
      await db.queryAsync('DROP TYPE IF EXISTS ATTENDANTS_STATUS');
      await db.queryAsync(`
        CREATE TYPE ATTENDANTS_STATUS AS ENUM (
          'pending', 
          'going', 
          'declined',
          'maybe'
        )
      `);
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS attendants
        (
          id SERIAL,
          access INT NOT NULL DEFAULT 0,
          status ATTENDANTS_STATUS NOT NULL DEFAULT 'pending',
          user_id INT NOT NULL,
          event_id INT NOT NULL,
          invitor_id INT,
          CONSTRAINT attendants_id
            PRIMARY KEY(id),
          CONSTRAINT fk_attendants_user_id
            FOREIGN KEY(user_id) REFERENCES users(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_attendants_event_id
            FOREIGN KEY(event_id) REFERENCES events(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_attendants_invitor_id
            FOREIGN KEY(invitor_id) REFERENCES users(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created attendants table.');
    } catch (err) {
      console.log('Error creating attendants table.', err);
    }
  },
  dropPostsTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS posts');
      console.log('Successfully dropped posts table.');
    } catch (err) {
      console.log('Error dropping posts table.', err);
    }
  },
  createPostsTable: async () => {
    try {
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS posts
        (
          id SERIAL,
          body TEXT,
          user_id INT NOT NULL,
          event_id INT NOT NULL,
          parent_id INT,
          CONSTRAINT post_id
            PRIMARY KEY(id),
          CONSTRAINT fk_posts_user_id
            FOREIGN KEY(user_id) REFERENCES users(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_posts_event_id
            FOREIGN KEY(event_id) REFERENCES events(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_posts_parent_id
            FOREIGN KEY(parent_id) REFERENCES posts(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created posts table.');
    } catch (err) {
      console.log('Error creating posts table.', err);
    }
  },
  dropLikesTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS likes');
      console.log('Successfully dropped likes table.');
    } catch (err) {
      console.log('Error dropping likes table.', err);
    }
  },
  createLikesTable: async () => {
    try {
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS likes
        (
          id SERIAL,
          user_id INT NOT NULL,
          event_id iNT NOT NULL,
          CONSTRAINT likes_id
            PRIMARY KEY(id),
          CONSTRAINT fk_likes_user_id
            FOREIGN KEY(user_id) REFERENCES users(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_likes_event_id
            FOREIGN KEY(event_id) REFERENCES events(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created likes table.');
    } catch (err) {
      console.log('Error creating likes table.', err);
    }
  },
  dropEmojisTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS emojis');
      console.log('Successfully dropped emojis table.');
    } catch (err) {
      console.log('Error dropping emojis table.', err);
    }
  },
  createEmojisTable: async () => {
    try {
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS emojis
        (
          id SERIAL,
          body VARCHAR(255) NOT NULL,
          user_id INT,
          event_id INT,
          CONSTRAINT emoji_id
            PRIMARY KEY(id),
          CONSTRAINT fk_emojis_user_id
            FOREIGN KEY(user_id) REFERENCES users(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_emojis_event_id
            FOREIGN KEY(event_id) REFERENCES events(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created emojis table.');
    } catch (err) {
      console.log('Error creating emojis table.', err);
    }
  },
  dropReactionsTable: async () => {
    try {
      await db.queryAsync('DROP TABLE IF EXISTS reactions');
      console.log('Successfully dropped reactions table.');
    } catch (err) {
      console.log('Error dropping reactions table.', err);
    }
  },
  createReactionsTable: async () => {
    try {
      await db.queryAsync(`
        CREATE TABLE IF NOT EXISTS reactions
        (
          id SERIAL,
          user_id INT NOT NULL,
          emoji_id INT NOT NULL,
          post_id INT NOT NULL,
          CONSTRAINT reaction_id
            PRIMARY KEY(id),
          CONSTRAINT fk_reactions_user_id
            FOREIGN KEY(user_id) REFERENCES users(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_reactions_emoji_id
            FOREIGN KEY(emoji_id) REFERENCES emojis(id)
            ON DELETE CASCADE,
          CONSTRAINT fk_reactions_post_id
            FOREIGN KEY(post_id) REFERENCES posts(id)
            ON DELETE CASCADE
        )
      `);
      console.log('Successfully created reactions table.');
    } catch (err) {
      console.log('Error creating reactions table.', err);
    }
  }
};
