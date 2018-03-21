const db = require('../../db/db');

const sendRequest = async (req, res) => {
  try {
    const { user_id, target_id } = req.body;
    const data = await db.queryAsync(`
      INSERT INTO friends (status, user_id, target_id)
      SELECT 'pending', ${user_id}, ${target_id}
      WHERE NOT EXISTS (
        SELECT user_id, target_id
        FROM friends
        WHERE user_id=${user_id} AND target_id=${target_id}
      ) RETURNING user_id, target_id;
    `);
    res.sendStatus(201);
  } catch (err) {
    console.log(`Error during friends POST request: ${err}`);
    res.sendStatus(500);
  }
};

const pendingRequests = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log('in the friend req controller');
    const data = await db.queryAsync(`
      SELECT * FROM friends
      WHERE user_id=${user_id} AND status='pending'
    `);
    res.send(data.rows);
  } catch (err) {
    res.sendStatus(500);
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { user_id, target_id } = req.body;
    const data = await db.queryAsync(`
      UPDATE friends
      SET status='accepted'
      WHERE user_id=${target_id} AND target_id=${user_id}
      RETURNING user_id, target_id, status
    `);
    res.sendStatus(201);
  } catch (err) {
    console.log(`Error during friends GET request: ${err}`);
    res.sendStatus(500);
  }
};

const declineRequest = async (req, res) => {
  try {
    const { user_id, target_id } = req.body;
    const data = await db.queryAsync(`
      DELETE FROM friends
      WHERE user_id=${target_id} AND target_id=${user_id} AND status='pending'
      RETURNING user_id, target_id
    `);
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error during friends DELETE request: ${err}`);
    res.sendStatus(500);
  }
};

const seeMyFriends = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await db.queryAsync(`
      SELECT * FROM friends
      WHERE user_id=${user_id} OR target_id=${user_id}
    `);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during friends GET request: ${err}`);
    res.sendStatus(500);
  }
};

module.exports = {
  sendRequest,
  pendingRequests,
  acceptRequest,
  declineRequest,
  seeMyFriends
};
