const db = require('../../db/db.js');

const signup = async (payload) => {
  try {
    const query = `
      INSERT INTO users (username)
      VALUES (${payload.body.username})
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
      WHERE username=${payload.username}
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
