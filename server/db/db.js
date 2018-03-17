const dev = require('../config.js');
const local = require('../config.example.js');
const config = dev || local;
const { Pool } = require('pg');
const db = require('bluebird').promisifyAll(new Pool(config.relationalDbUrl));

db.on('connect', () => {
  console.log('Successfully connected to database', config.relationalDbName);
});

db.on('remove', (client) => {
  console.log('Successfully removed client');
});

db.on('error', () => {
  console.log('Error in database ', config.relationalDbName);
});

db.connect();

module.exports = db;