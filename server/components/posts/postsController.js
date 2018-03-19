const db = require('../../db/db.js');

const createPost = async (req, res) => {
  const { body, user_id, event_id, parent_id } = req.body;
  try {
    const query = `
      INSERT INTO posts (body, user_id, event_id, parent_id)
      SELECT '${body}', ${user_id}, ${event_id}, ${parent_id || null}
      WHERE EXISTS (
        SELECT user_id FROM attendants
        WHERE user_id=${user_id}
      )
      RETURNING body, user_id, event_id, parent_id
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during posts POST requests: ${err}`);
    res.end();
  }
};

const editPost = async (req, res) => {
  const { body, user_id, event_id } = req.body;
  try {
    const query = `
      UPDATE posts
      SET body='${body}'
      WHERE user_id=${user_id} AND event_id=${event_id}
      RETURNING body, user_id, event_id
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during posts UPDATE: ${err}`);
    res.end();
  }
};

const deletePost = async (req, res) => {
  const { body, user_id, event_id } = req.body;
  try {
    const query = `
      DELETE FROM posts
      WHERE user_id=${user_id} AND event_id=${event_id}
      RETURNING body, user_id, event_id
    `;
    const data = await db.queryAsync(query);
    res.send(200);
  } catch (err) {
    console.log(`Error during posts DELETE: ${err}`);
    res.end();
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
};
