const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/eventay';
mongoose.connect(mongoUri);
const db = mongoose.connection;

db.once('open', () => {
  console.log('mongoose connected successfully');
});

db.on('error', () => {
  console.log('mongoose connection error');
});

module.exports = mongoose.model('User', mongoose.Schema({
  username: String,
  password: String,
  email: String
}));
