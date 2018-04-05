const mongoose = require('mongoose');
const config = require('../config.js');

const authDbName =
  config.rdb.environment === 'test'
    ? config.auth.uri_testing
    : config.auth.uri_dev;

mongoose.connect(authDbName);
const authDb = mongoose.connection;

authDb.once('open', () => {
  console.log(`Mongoose connected successfully to ${authDbName}`);
});

authDb.on('error', () => {
  console.log(`mongoose connection error with ${authDbName}`);
});
module.exports.authDb = authDb;
