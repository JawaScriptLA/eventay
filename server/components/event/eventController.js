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
    host_id,
  } = req.body;
  try {
    const query = `
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
        ${description ? '' + description : null},
        ${thumbnail ? '' + thumbnail : null},
        ${location ? '' + location : null},
        ${likes_count ? likes_count : 'DEFAULT'},
        ${start_time ? start_time : null},
        ${end_time ? end_time : null},
        ${publicity ? publicity : 'DEFAULT'},
        '${host_id}'
      ) RETURNING title, likes_count, publicity, host_id
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event POST request: ${err}`);
  }
};

const seeUserEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = `
      SELECT * FROM events
      WHERE host_id='${user_id}'
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event GET request: ${err}`);
  }
};

module.exports = {
  createEvent,
  seeUserEvents,
};
