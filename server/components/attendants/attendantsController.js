const db = require('../../db/db');

module.exports = {
  inviteTargetToEvent: async ({ access, status, user_id, event_id, invitor_id }) => {
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
        ${invitor_id ? invitor_id : null}
        WHERE NOT EXISTS (
          SELECT * FROM attendants
          WHERE event_id=${event_id} AND invitor_id=${invitor_id}
        ) RETURNING user_id, event_id, invitor_id
      `);
    } catch (err) {
      throw err;
    }
  },
  seeAllEventAttendants: async ({ event_id }) => {
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
  attendantSeeTheirInvites: async ({ user_id }) => {
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
  respondToEventInvite: async ({ status, user_id, event_id }) => {
    try {
      await db.queryAsync(`
        UPDATE attendants
        SET status='${status}'
        WHERE user_id=${user_id} AND event_id=${event_id}
        RETURNING access, status, user_id, event_id, invitor_id
      `);
    } catch (err) {
      throw err;
    }
  },
  declineEventInvite: async ({ user_id, event_id }) => {
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

const showUserEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const eventIdsQuery = `
      SELECT * FROM attendants
      WHERE user_id=${user_id}
    `;
    const data = await db.queryAsync(eventIdsQuery);
    const userEvents = [];
    data.rows.forEach(row => {
      userEvents.push(row.event_id);
    });
    let eventQuery;
    const eventList = [];
    for (let i = 0; i < userEvents.length; i++) {
      eventQuery = `SELECT * FROM events
    WHERE id=${userEvents[i]}`;
      eventData = await db.queryAsync(eventQuery);
      eventList.push(eventData.rows);
    }
    res.send(eventList);
  } catch (err) {
    console.log(`Error during attendants GET request: ${err}`);
    res.end();
  }
};
