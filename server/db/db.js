const { Pool } = require('pg');
const Promise = require('bluebird');
let config;

try {
  config = require('../config.js');
} catch (err) {
  config = require('../config.example.js');
}

const db = new Pool({
  user: config.rdb.user,
  host: config.rdb.host,
  database: config.rdb.name,
  password: config.rdb.password,
  port: config.rdb.port,
  max: 20
});

db.on('connect', () => {
  console.log('Successfully connected to database', config.rdb.name);
});

db.on('remove', (client) => {
  console.log('Successfully removed client');
});

db.on('error', () => {
  console.log('Error in database ', config.rdb.name);
});

db.connect();
Promise.promisifyAll(db);
module.exports = db;