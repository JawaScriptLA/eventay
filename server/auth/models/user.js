const mongoose = require('mongoose');
const config = require('../../config.js');

const mongooseDbName =
  config.rdb.environment === 'test'
    ? config.auth.uri_testing
    : config.auth.uri_dev;

mongoose.connect(mongooseDbName);
const db = mongoose.connection;

db.once('open', () => {
  console.log(`Mongoose connected successfully to ${mongooseDbName}`);
});

db.on('error', () => {
  console.log(`mongoose connection error with ${mongooseDbName}`);
});

const User = mongoose.model(
  'User',
  mongoose.Schema({
    username: String,
    password: String,
    email: String
  })
);

module.exports.User = User;
module.exports.authDB = db;
