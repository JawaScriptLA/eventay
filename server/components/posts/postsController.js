const db = require('../../db/db.js');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { body, user_id, event_id, parent_id } = req.body;
      const data = await db.queryAsync(`
        INSERT INTO posts (body, user_id, event_id, parent_id)
        SELECT '${body}', ${user_id}, ${event_id}, ${parent_id || null}
        WHERE EXISTS (
          SELECT user_id FROM attendants
          WHERE user_id=${user_id}
        )
        RETURNING body, user_id, event_id, parent_id
      `);
      res.send(data.rows);
    } catch (err) {
      console.log(`Error during posts POST requests: ${err}`);
      res.sendStatus(500);
    }
  },
  editPost: async (req, res) => {
    try {
      const { body, user_id, event_id } = req.body;
      const data = await db.queryAsync(`
        UPDATE posts
        SET body='${body}'
        WHERE user_id=${user_id} AND event_id=${event_id}
        RETURNING body, user_id, event_id
      `);
      res.send(data.rows);
    } catch (err) {
      console.log(`Error during posts UPDATE: ${err}`);
      res.sendStatus(500);
    }
  },
  deletePost: async (req, res) => {
    try {
      const { body, user_id, event_id } = req.body;
      const data = await db.queryAsync(`
        DELETE FROM posts
        WHERE user_id=${user_id} AND event_id=${event_id}
        RETURNING body, user_id, event_id
      `);
      res.sendStatus(200);
    } catch (err) {
      console.log(`Error during posts DELETE: ${err}`);
      res.sendStatus(500);
    }
  }
};
