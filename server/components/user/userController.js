const db = require('../../db/db');

const getUserProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = `
      SELECT * FROM users
      WHERE id='${user_id}'
    `;
    const data = await db.queryAsync(query);
    res.send(data.rows);
  } catch (err) {
    console.log(`Error during event GET request: ${err}`);
    res.sendStatus(401);
  }
};

module.exports = {
  getUserProfile,
}