const db = require('../../db/db');

module.exports = {
  getUserProfile: async ({ username }) => {
    try {
      const data = await db.queryAsync(`
        SELECT * FROM users
        WHERE username='${username}'
      `);
      return data.rows;
    } catch (err) {
      throw err;
    }
  },

  updateUserBio: async ({ bio, username }) => {
    try {
      const data = await db.queryAsync(`
        UPDATE users
        SET bio='${bio}'
        WHERE username='${username}'
        RETURNING bio
      `)
      return data.rows;

    } catch (err) {
      throw err;
    }
  }

}
