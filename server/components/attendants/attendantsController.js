const db = require('../../db/db');

const inviteTargetToEvent = async (req, res) => {
  let { access, status, user_id, event_id, invitor_id } = req.body;
  try {
    const data = await db.queryAsync(`
      INSERT INTO attendants (
        access,
        status,
        user_id,
        event_id,
        invitor_id
      ) SELECT
      ${access || 0},
      '${status || 'pending'}',
      ${user_id},
      ${event_id},
      ${invitor_id || null}
      WHERE NOT EXISTS (
        SELECT * FROM attendants
        WHERE event_id=${event_id} AND invitor_id=${invitor_id}
      ) RETURNING user_id, event_id, invitor_id
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during attendants POST request: ${err}`);
    res.sendStatus(500);
  }
};

const seeAllEventAttendants = async (req, res) => {
  try {
    const { event_id } = req.params;
    const data = await db.queryAsync(`
      SELECT * FROM attendants
      WHERE event_id=${event_id}
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during attendants GET request: ${err}`);
    res.sendStatus(500);
  }
};

const respondToEventInvite = async (req, res) => {
  try {
    const { user_id, status, event_id } = req.body;
    const data = await db.queryAsync(`
      UPDATE attendants
      SET status='${status}'
      WHERE user_id=${user_id} AND event_id=${event_id}
      RETURNING access, status, user_id, event_id, invitor_id
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during attendants PUT request: ${err}`)
    res.sendStatus(500);
  }
};

const attendantSeeTheirInvites = async (req, res) => {
  const { user_id } = req.params;
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

module.exports = {
  inviteTargetToEvent,
  seeAllEventAttendants,
  respondToEventInvite,
  attendantSeeTheirInvites,
  showUserEvents
};
