const db = require('./db.js');

const insert = async () => {
  try {
    await db.queryAsync(`
      DELETE FROM users WHERE username='alex';
      INSERT INTO users (username, profile_picture, bio) VALUES ('antonio',
      'http://baypoint.academy/wp-content/uploads/2017/01/dummy-profile-pic-300x300.jpg', 'I love lamp');
      INSERT INTO users (username, profile_picture, bio) VALUES ('alex',
      'http://baypoint.academy/wp-content/uploads/2017/01/dummy-profile-pic-300x300.jpg', 'I love lamp');
      INSERT INTO users (username, profile_picture, bio) VALUES ('will',
      'http://baypoint.academy/wp-content/uploads/2017/01/dummy-profile-pic-300x300.jpg', 'I love lamp');
      INSERT INTO users (username, profile_picture, bio) VALUES ('jason',
      'http://baypoint.academy/wp-content/uploads/2017/01/dummy-profile-pic-300x300.jpg', 'I love lamp');
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'antonio'), (SELECT id from users where username = 'alex'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'antonio'), (SELECT id from users where username = 'will'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'antonio'), (SELECT id from users where username = 'jason'));
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-07 09:00:00-07', '2018-05-07 11:00:00-07', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'member', (SELECT id FROM users WHERE username = 'alex'), 1, (SELECT id FROM users WHERE username = 'antonio'));
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-07 13:00:00-07', '2018-05-07 14:00:00-07', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'member', (SELECT id FROM users WHERE username = 'will'), 1, (SELECT id FROM users WHERE username = 'antonio'));
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-07 15:00:00-07', '2018-05-07 17:00:00-07', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-07 10:00:00-07', '2018-05-07 12:00:00-07', 
      (SELECT id from users where username = 'will'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-07 15:00:00-07', '2018-05-07 17:00:00-07', 
      (SELECT id from users where username = 'will'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-07 11:00:00-07', '2018-05-07 12:00:00-07', 
      (SELECT id from users where username = 'alex'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 10:00:00-07', '2018-05-08 12:00:00-07', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 12:00:00-07', '2018-05-08 13:00:00-07', 
      (SELECT id from users where username = 'will'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 13:00:00-07', '2018-05-08 14:00:00-07', 
      (SELECT id from users where username = 'will'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 16:00:00-07', '2018-05-08 18:00:00-07', 
      (SELECT id from users where username = 'will'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 09:00:00-07', '2018-05-08 12:00:00-07', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 11:00:00-07', '2018-05-08 11:30:00-07', 
      (SELECT id from users where username = 'alex'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-08 13:00:00-07', '2018-05-08 16:00:00-07', 
      (SELECT id from users where username = 'alex'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-09 10:00:00-07', '2018-05-09 12:00:00-07', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-09 10:00:00-07', '2018-05-09 12:00:00-07', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('dummy event', 'this is a dummy event', '2018-05-09 11:00:00-07', '2018-05-09 12:00:00-07', 
      (SELECT id from users where username = 'alex'), 'true');
    `);
    process.exit();
  } catch (err) {
    console.log('Error:', err);
  }
};

insert();
