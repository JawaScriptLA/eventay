const db = require('../../db/db');

module.exports = {
  search: async (req, res) => {
    const { user_id, query } = req.params;
    try {
      const makeQuery = (phrase, field) => {
        let str = ``;
        phrase.split(' ').forEach((word, i) => {
          str += i
            ? ` OR LOWER(${field}) LIKE LOWER('%${word}%')`
            : ` LOWER(${field}) LIKE LOWER('%${word}%')`;
        });
        return str;
      };
      const dbQueryFriends = `
        SELECT * FROM users
        WHERE ${makeQuery(query, 'username')}
      `;
      const dbQueryEvents = `
        SELECT * FROM events
        WHERE (host_id=${user_id} AND (${makeQuery(query, 'title')}))
        OR (publicity=TRUE AND (${makeQuery(query, 'title')}))
      `;
      const dataFriends = await db.queryAsync(dbQueryFriends);
      const dataEvents = await db.queryAsync(dbQueryEvents);
      let obj = {};
      obj.friends = dataFriends.rows;
      obj.events = dataEvents.rows;
      res.send(obj);
    } catch (err) {
      res.send(400);
    }
  }
};
