const db = require('../../db/db.js');

const signup = async (payload) => {
  console.log(`SIGNUP payload body is: `, payload.body);
  try {
    const query = `
      INSERT INTO users (username, likes_count)
      VALUES ('${payload.body.username}', DEFAULT)
      RETURNING username
    `;
    data = db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during signup: ${err}`);
  }
};

const login = async (payload) => {
  try {
    const query = `
      SELECT username FROM users
      WHERE username='${payload.username}'
    `;
    const data = db.queryAsync(query);
    return data;
  } catch (err) {
    console.log(`Error during login: ${err}`);
  }
};

module.exports = {
  signup,
  login,
};
