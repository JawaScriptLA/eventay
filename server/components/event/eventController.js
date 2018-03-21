const db = require('../../db/db');

const createEvent = async (req, res) => {
  const {
    title,
    description,
    thumbnail,
    location,
    likes_count,
    start_time,
    end_time,
    publicity,
    host_id
  } = req.body;

  try {
    const data = await db.queryAsync(`
      INSERT INTO events (
        title,
        description,
        thumbnail,
        location,
        likes_count,
        start_time,
        end_time,
        publicity,
        host_id
      ) VALUES (
        '${title}',
        ${description ? `'${description}'` : null},
        ${thumbnail ? thumbnail : null},
        ${location ? '' + location : null},
        ${likes_count ? likes_count : 'DEFAULT'},
        ${start_time ? start_time : null},
        ${end_time ? end_time : null},
        ${publicity ? publicity : 'DEFAULT'}, 
        '${host_id}'
      ) RETURNING id, title, likes_count, publicity, host_id
    `);
    const dataAddingHost = await db.queryAsync(`
      INSERT INTO attendants (
        access, status, user_id, event_id, invitor_id
      ) VALUES (
        'host', 'going', ${host_id}, ${data.rows[0].id}, null
      )
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event POST request: ${err}`);
  }
};

const seeHostingEvents = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await db.queryAsync(`
      SELECT * FROM events
      WHERE host_id='${user_id}'
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event GET request: ${err}`);
    res.sendStatus(401);
  }
};

const seeUserEventsAndInvites = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await db.queryAsync(`
      SELECT title FROM attendants, events
      WHERE user_id=${user_id} OR host_id=${user_id}
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event GET request: ${err}`);
    res.end();
  }
};

module.exports = {
  createEvent,
  seeHostingEvents,
  seeUserEventsAndInvites
};
