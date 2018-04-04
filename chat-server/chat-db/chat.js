const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/eventay-chat';
mongoose.connect(mongoUri);
const db = mongoose.connection;

db.once('open', () => {
  console.log('mongoose connected successfully');
});

db.on('error', () => {
  console.log('mongoose connection error');
});

module.exports = mongoose.model('Chat', mongoose.Schema({
  message: String,
  sender: Object,
  receiver: Object,
  senderUsername: String,
  receiverUsername: String,
  date: { type: Date, default: Date.now },
}));
