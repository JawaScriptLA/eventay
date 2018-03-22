const db = require('../../db/db.js');

module.exports = {
  addFriend: async ({ user_id, target_id }) => {
    try {
      await db.queryAsync(`
        INSERT INTO friends (user_id, target_id)
        SELECT ${user_id}, ${target_id}
        WHERE NOT EXISTS (
          SELECT * FROM friends
          WHERE user_id=${user_id} AND target_id=${target_id} OR user_id=${target_id} AND target_id=${user_id}
        )
      `);
    } catch (err) {
      throw err;
    }
  },
  getPendingFriends: async ({ user_id }) => {
    try {
      const data = await db.queryAsync(`
        SELECT * FROM friends
        WHERE target_id=${user_id} AND status='pending'
      `);
      return data.rows;
    } catch (err) {
      throw err;
    }
  },
  getAllFriends: async ({ user_id }) => {
    try {
      const data = await db.queryAsync(`
        SELECT * FROM friends
        WHERE user_id=${user_id} OR target_id=${user_id}
      `);
      return data.rows;
    } catch (err) {
      throw err;
    }
  },
  updateFriend: async ({ user_id, target_id, status }) => {
    try {
      await db.queryAsync(`
        UPDATE friends
        SET status='${status}'
        WHERE user_id=${target_id} AND target_id=${user_id}
      `);
    } catch (err) {
      throw err;
    }
  },
  removeFriend: async ({ user_id, target_id }) => {
    try {
      const data = await db.queryAsync(`
        DELETE FROM friends
        WHERE user_id=${user_id} AND target_id=${target_id} OR user_id=${target_id} AND target_id=${user_id}
      `);
    } catch (err) {
      throw err;
    }
  }
};
