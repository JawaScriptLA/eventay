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
  },

  updateUserPhoto: async ({ profile_pic, username }) => {
    try {
      const data = await db.queryAsync(`
        UPDATE users
        SET profile_picture='${profile_pic}'
        WHERE username='${username}'
        RETURNING profile_picture
      `)
      return data.rows;

    } catch (err) {
      throw err;
    }
  }

}
