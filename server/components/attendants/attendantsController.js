const db = require('../../db/db.js');

module.exports = {
  addAttendant: async ({ access, status, user_id, event_id, invitor_id }) => {
    try {
      await db.queryAsync(`
        INSERT INTO attendants (
          access,
          status,
          user_id,
          event_id,
          invitor_id
        ) SELECT
        ${access || 'member'},
        '${status || 'pending'}',
        ${user_id},
        ${event_id},
        ${invitor_id ? `'${invitor_id}'` : null}
        WHERE NOT EXISTS (
          SELECT * FROM attendants
          WHERE event_id=${event_id} AND invitor_id=${invitor_id}
        )
      `);
    } catch (err) {
      throw err;
    }
  },
  getEventAttendants: async ({ event_id }) => {
    try {
      const data = await db.queryAsync(`
        SELECT * FROM attendants
        WHERE event_id=${event_id}
      `);
      return data.rows;
    } catch (err) {
      throw err;
    }
  },
  getAllAttending: async ({ user_id }) => {
    try {
      const data = await db.queryAsync(`
        SELECT * FROM attendants
        WHERE user_id=${user_id}
      `);
      res.send(data.rows);
    } catch (err) {
      console.log(`Error during attendants GET request: ${err}`);
      res.sendStatus(500);
    }
  },
  showUserEvents: async ({ user_id }) => {
    try {
      const userEvents = [];
      const eventList = [];
      let eventQuery;
      const data = await db.queryAsync(`SELECT * FROM attendants WHERE user_id=${user_id}`);

      data.rows.forEach((row) => userEvents.push(row.event_id));
      for (let i = 0; i < userEvents.length; i++) {
        eventQuery = `SELECT * FROM events WHERE id=${userEvents[i]}`;
        eventData = await db.queryAsync(eventQuery);
        eventList.push(eventData.rows);
      }
      return eventList;
    } catch (err) {
      throw err;
    }
  },
  updateAttendant: async (data) => {
    try {
      let fields = Object.entries(data)
        .map(([ key, value ]) => typeof value === 'string' ? `${key} = '${value}'` : `${key} = ${value}`)
        .join(', ');
      await db.queryAsync(`
        UPDATE attendants
        SET ${fields}
        WHERE user_id=${data.user_id} AND event_id=${data.event_id}
      `);
    } catch (err) {
      throw err;
    }
  },
  removeAttendant: async ({ user_id, event_id }) => {
    try {
      await db.queryAsync(`
        DELETE FROM attendants
        WHERE user_id=${user_id} AND event_id=${event_id}
      `);
    } catch (err) {
      throw err;
    }
  }
};
