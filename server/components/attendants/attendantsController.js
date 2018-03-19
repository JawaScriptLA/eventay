const db = require('../../db/db');

const inviteTargetToEvent = async (req, res) => {
  let {
    access,
    status,
    user_id,
    event_id,
    invitor_id,
  } = req.body;
  try {
    const query = `
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
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during attendants POST request: ${err}`);
    res.end();
  }
};

const seeAllEventAttendants = async (req, res) => {
  const { event_id } = req.params;
  try {
    const query = `
      SELECT * FROM attendants
      WHERE event_id=${event_id}
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during attendants GET request: ${err}`);
    res.end();
  }
};

const respondToEventInvite = async (req, res) => {
  const { user_id, status, event_id } = req.body;
  try {
    const query = `
      UPDATE attendants
      SET status='${status}'
      WHERE user_id=${user_id} AND event_id=${event_id}
      RETURNING access, status, user_id, event_id, invitor_id
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during attendants PUT request: ${err}`)
    res.end();
  }
};

const attendantSeeTheirInvites = async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = `
      SELECT * FROM attendants
      WHERE user_id=${user_id}
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
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
};
