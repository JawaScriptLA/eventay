const db = require('../../db/db');

const createEvent = async (payload) => {
  console.log('BODY IS: ', payload.body);
  try {
    const query = `
      INSERT INTO events (hostId, title, description, location, startTime, endTime)
      VALUES (${payload.body.hostid},
        ${payload.body.title},
        ${payload.body.description ? payload.body.description : ''},
        ${payload.body.location ? payload.body.location : ''},
        ${payload.body.startTime ? payload.body.startTime : ''},
        ${payload.body.endTime ? payload.body.endTime : ''}
      )
      RETURNING hostId, title
    `;
    const data = db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during event POST request: ${err}`);
  }
};

const seeUserEvents = async (payload) => {
  try {
    const query = `
      SELECT title FROM event
      WHERE hostId=${payload.hostId}
      RETURNING title
    `;
    const data = db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during event GET request: ${err}`);
  }
};

module.exports = {
  createEvent,
  seeUserEvents,
};
