const db = require('./db.js');
const { User } = require('../auth/models/user.js');
const authDb = require('../auth/db.js');
var bCrypt = require('bcryptjs');

let config;

try {
  config = require('../config.js');
} catch (err) {
  config = require('../config.example.js');
}
const insert = async () => {
  try {
    await db.queryAsync(`
      INSERT INTO users (username, profile_picture, bio) VALUES ('antonio',
      'https://cdn.filestackcontent.com/F19a0BNQTCWJojbCvkRW', 'Nice to meet you!');
      INSERT INTO users (username, profile_picture, bio) VALUES ('alex',
      'https://cdn.filestackcontent.com/hRkRlioRWiWaBNCXA3qg', 'Nice to meet you!');
      INSERT INTO users (username, profile_picture, bio) VALUES ('will',
      'https://cdn.filestackcontent.com/jClQEddxQh2RP6GC14UC', 'Nice to meet you!');
      INSERT INTO users (username, profile_picture, bio) VALUES ('jason',
      'https://cdn.filestackcontent.com/yKHFpKkGTVu31lJgqoli', 'Nice to meet you!');
      
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'antonio'), (SELECT id from users where username = 'alex'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'antonio'), (SELECT id from users where username = 'will'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'antonio'), (SELECT id from users where username = 'jason'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'alex'), (SELECT id from users where username = 'will'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'alex'), (SELECT id from users where username = 'jason'));
      INSERT INTO friends (status, user_id, target_id) VALUES ('accepted',
      (SELECT id from users where username = 'will'), (SELECT id from users where username = 'jason'));
      
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Volunteering', 'Weekly volunteering', '2018-04-09 17:00:00', '2018-04-09 20:00:00', 
      (SELECT id from users where username = 'will'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'will'), 1, (SELECT id FROM users WHERE username = 'will'));
      
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Commute home', 'Commute home from work', '2018-04-09 17:00:00', '2018-04-09 18:00:00', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'antonio'), 2, (SELECT id FROM users WHERE username = 'antonio'));
      
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Date night', 'Date night!', '2018-04-09 20:00:00', '2018-04-09 23:00:00', 
      (SELECT id from users where username = 'alex'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'alex'), 3, (SELECT id FROM users WHERE username = 'alex'));
      
      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Commute home', 'Commute home from work', '2018-04-10 17:00:00', '2018-04-10 18:00:00', 
      (SELECT id from users where username = 'antonio'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'antonio'), 4, (SELECT id FROM users WHERE username = 'antonio'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Stop by airport', 'Stop by airport', '2018-04-10 22:00:00', '2018-04-10 23:00:00', 
      (SELECT id from users where username = 'alex'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'alex'), 5, (SELECT id FROM users WHERE username = 'alex'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Rock climbing', 'Rock climbing', '2018-04-09 07:00:00', '2018-04-09 09:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 6, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Work on toy problems', 'Work on toy problems', '2018-04-10 07:00:00', '2018-04-10 09:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 7, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Rock climbing', 'Rock climbing', '2018-04-11 07:00:00', '2018-04-11 09:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 8, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Add seed data/final testing', 'Add seed data/final testing', '2018-04-05 09:00:00', '2018-04-05 20:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 9, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Built out tests', 'Built out tests', '2018-04-04 09:00:00', '2018-04-04 20:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 10, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Front end styling/begin testing', 'Front end styling/begin testing', '2018-04-03 09:00:00', '2018-04-03 20:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 11, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Start applying to jobs', 'Start applying to jobs', '2018-04-16 00:00:00', '2018-04-16 00:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 12, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Vacation', 'Vacation', '2018-04-18 00:00:00', '2018-04-21 00:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 13, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Career week', 'Career week', '2018-04-09 00:00:00', '2018-04-13 00:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 14, (SELECT id FROM users WHERE username = 'jason'));

      INSERT INTO events (title, description, start_time, end_time, host_id, publicity) VALUES
      ('Hack Reactor Graduation!', 'Hack Reactor Graduation!', '2018-04-13 00:00:00', '2018-04-13 00:00:00', 
      (SELECT id from users where username = 'jason'), 'true');
      INSERT INTO attendants (status, access, user_id, event_id, invitor_id) VALUES
      ('going', 'host', (SELECT id FROM users WHERE username = 'jason'), 15, (SELECT id FROM users WHERE username = 'jason'));
    `);

    var arr = [
      { username: 'antonio', password: createHash('antonio') },
      { username: 'alex', password: createHash('alex') },
      { username: 'will', password: createHash('will') },
      { username: 'jason', password: createHash('jason') }
    ];
    User.insertMany(arr, (err, docs) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        console.log('Users successfully inserted!');
        process.exit();
      }
    });
  } catch (err) {
    console.log('Error:', err);
  }
};

const createHash = password =>
  bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

insert();
