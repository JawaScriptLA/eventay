const getConfig = () => {
  try {
    return require('../config.js');
  } catch (err) {
    return require('../config.example.js');
  }
};

const config = getConfig();
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