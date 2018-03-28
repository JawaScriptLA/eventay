const db = require('../../db/db');

module.exports = {
  getUserInfo: async ({ username }) => {
    try {
      const data = await db.queryAsync(`SELECT * FROM users WHERE username='${username}'`);
      return data.rows[0];
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (data) => {
    try {
      let fields = Object.entries(data)
        .map(([ key, value ]) =>
          typeof value === 'string' ?
            `${key} = '${value}'`
          :
            `${key} = ${value}`
        )
        .join(', ');
      let user = await db.queryAsync(`UPDATE users SET ${fields} WHERE username='${data.username}' RETURNING profile_picture, bio, likes_count`);
      return user.rows[0];
    } catch (err) {
      console.log('throwing', err);
      throw err;
    }
  }
};
