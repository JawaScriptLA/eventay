const db = require('../../db/db');

module.exports = {
  search: async (req, res) => {
    const { query } = req.params;
    console.log(`MY SEARCH PARAMS ARE: ${query}`);
    try {
      let str = ``;
      query.split(' ')
        .forEach((word, i) => {
          str += i ? ` OR username LIKE '%${word}%'` : ` username LIKE '%${word}%'`;
        });
      const dbQuery = `
        SELECT id, username FROM users
        WHERE ${str}
      `;
      const data = await db.queryAsync(dbQuery);
      console.log(`Search query results: ${data.rows}`)
      res.send(data.rows);
    } catch (err) {
      console.log(`Failed during search GET request: ${err}`);
      res.send(err);
    }
  }
}