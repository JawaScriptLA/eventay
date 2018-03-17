// const { Pool } = require('pg');
// const config = require('../config.js');
// Promise = require('bluebird');
// const db = Promise.promisifyAll(new Pool(config.relationalDbUrl));
// db.on('connect', () => {
//   console.log('Successfully connected to database', config.relationalDbName);
// });
// db.on('remove', (client) => {
//   console.log('Successfully removed client');
// });
// db.on('error', () => {
//   console.log('Error in database ', config.relationalDbName);
// });
// db.connect();
// module.exports = db;