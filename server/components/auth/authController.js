const db = require('../../db/db.js');

const signup = async (req, res) => {
  const { username } = req.body;
  try {
    const query = `
      INSERT INTO users (username, likes_count)
      VALUES ('${username}', DEFAULT)
      RETURNING username
    `;
    const data = await db.queryAsync(query);
    res.send(201);
  } catch (err) {
    console.log(`Error during signup: ${err}`);
  }
};

const login = async (req, res) => {
  const { username } = req.body;
  try {
    const query = `
      SELECT username FROM users
      WHERE username='${username}'
    `;
    const data = await db.queryAsync(query);
    res.send(200);
  } catch (err) {
    console.log(`Error during login: ${err}`);
  }
};

module.exports = {
  signup,
  login,
};
