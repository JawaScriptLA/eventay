const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/eventay';

mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
