const db = require('../../db/db');

const sendRequest = async (req, res) => {
  const { user_id, target_id } = req.body;
  try {
    const query = `
    INSERT INTO friends (status, user_id, target_id)
    SELECT 'pending', ${user_id}, ${target_id}
    WHERE NOT EXISTS (
      SELECT user_id, target_id
      FROM friends
      WHERE user_id=${user_id} AND target_id=${target_id}
    ) RETURNING user_id, target_id;
    `;
    const data = await db.queryAsync(query);
    res.send(201);
  } catch (err) {
    console.log(`Error during friends POST request: ${err}`);
  }
};

const pendingRequests = async (req, res) => {
  const { user_id } = req.params;
  try {
    console.log("in the friend req controller");
    const query = `
      SELECT * FROM friends
      WHERE user_id=${user_id} AND status='pending'
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    res.sendStatus(401);
  }
};

const acceptRequest = async (req, res) => {
  const { user_id, target_id } = req.body;
  try {
    const query = `
      UPDATE friends
      SET status='accepted'
      WHERE user_id=${target_id} AND target_id=${user_id}
      RETURNING user_id, target_id, status
    `;
    const data = await db.queryAsync(query);
    res.send(201);
  } catch (err) {
    console.log(`Error during friends GET request: ${err}`);
  }
};

const declineRequest = async (req, res) => {
  const { user_id, target_id } = req.body;
  try {
    const query = `
      DELETE FROM friends
      WHERE user_id=${target_id} AND target_id=${user_id} AND status='pending'
      RETURNING user_id, target_id
    `;
    const data = await db.queryAsync(query);
    res.send(200);
  } catch (err) {
    console.log(`Error during friends DELETE request: ${err}`);
    res.sendStatus(501);
  }
};

const seeMyFriends = async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = `
      SELECT * FROM friends
      WHERE user_id=${user_id} OR target_id=${user_id}
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during friends GET request: ${err}`);
    res.end();
  }
};

module.exports = {
  sendRequest,
  pendingRequests,
  acceptRequest,
  declineRequest,
  seeMyFriends,
};
