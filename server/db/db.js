const dev = require('../config.js');
const local = require('../config.example.js');
const config = dev || local;
const { Client } = require('pg');
const db = new Client(config.relationalDbUrl);

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