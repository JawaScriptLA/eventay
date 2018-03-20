const db = require('../db/db.js');

module.exports = {
  select: async (table) => {
    let data = await db.queryAsync(`SELECT * FROM ${table};`);
    return data.rows;
  }
};