const db = require('../../db/db.js');

module.exports = {
  createPost: async ({ body, user_id, event_id, parent_id }) => {
    console.log('createPost');
    try {
      await db.queryAsync(`
        INSERT INTO posts (body, user_id, event_id, parent_id)
        SELECT '${body}', ${user_id}, ${event_id}, ${parent_id ? `'${parent_id}'` : null}
        WHERE EXISTS (
          SELECT user_id FROM attendants
          WHERE user_id=${user_id} AND event_id=${event_id}
        )
      `);
    } catch (err) {
      throw err;
    }
  },
  getEventPosts: async ({ event_id }) => {
    try {
      const data = await db.queryAsync(`
        SELECT * FROM posts
        WHERE event_id=${event_id}
      `);
      return data.rows;
    } catch (err) {
      throw err;
    }
  },
  updatePost: async ({ id, body, user_id, event_id }) => {
    try {
      await db.queryAsync(`
        UPDATE posts
        SET body='${body}'
        WHERE id=${id} AND user_id=${user_id} AND event_id=${event_id}
      `);
    } catch (err) {
      throw err;
    }
  },
  removePost: async ({ id, user_id, event_id }) => {
    try {
      await db.queryAsync(`
        DELETE FROM posts
        WHERE id=${id} AND user_id=${user_id} AND event_id=${event_id}
      `);
    } catch (err) {
      throw err;
    }
  }
};
