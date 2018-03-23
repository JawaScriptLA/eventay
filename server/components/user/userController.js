const db = require('../../db/db');

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const query = `
      SELECT * FROM users
      WHERE username='${username}'
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event GET request: ${err}`);
    res.sendStatus(401);
  }
};

const updateUserProfile = async (req, res) => {
  res.send({ message: 'todo' });
}

module.exports = {
  getUserProfile,
}