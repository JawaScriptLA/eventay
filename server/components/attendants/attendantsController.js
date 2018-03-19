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
    res.send(`Error during attendants POST request: ${err}`);
  }
};

module.exports = {
  inviteTargetToEvent,
};
