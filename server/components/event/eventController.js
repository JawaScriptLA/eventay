const db = require('../../db/db');

const createEvent = async (payload) => {
  console.log('BODY IS: ', payload.body);
  try {
    let query;
    if (!(payload.body.startTime) || !(payload.body.endTime)) {
      query = `
        INSERT INTO events (hostid, title)
        VALUES ('${payload.body.hostId}', '${payload.body.title}')
        RETURNING hostid, title
      `;
    } else {
      query = `
        INSERT INTO events (hostid, title)
        VALUES ('${payload.body.hostId}', '${payload.body.title}')
        RETURNING hostid, title
      `;
    }
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
      WHERE hostId='${payload.hostId}'
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
