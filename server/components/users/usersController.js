const db = require('../../db/db');

module.exports = {
  getUserInfo: async ({ username }) => {
    try {
      const data = await db.queryAsync(`SELECT * FROM users WHERE username='${username}'`);
      return data.rows;
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
      await db.queryAsync(`UPDATE users SET ${fields} WHERE username=${data.username}`);
    } catch (err) {
      throw err;
    }
  }
};
