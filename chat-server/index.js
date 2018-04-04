const express = require('express');
const socket = require('socket.io');
const Chat = require('./chat-db/chat.js')
const PORT = 9001;
const app = express();
const server = app.listen(PORT, () => console.log('Chat server up and running at Port ', PORT));

//socket setup
const io = socket(server);

io.on('connection', (socket) => {
  socket.on('handshake', (data) => {
    socket.join(data.userInfo.username);
  });

  socket.on('fetchChat', ({ user, target }) => {
    const chatHistory = [];
    Chat.find().or([{ senderUsername: user.username, receiverUsername: target.username },
      {senderUsername: target.username, receiverUsername: user.username}])
      .then(data => {
        console.log('emitting getChat');
        setTimeout(() => io.to(user.username).emit('getChat', data), 200);
      });
  });

  socket.on('leaveRoom', (data) => {
    socket.leave(data.userInfo.username);
  });

  socket.on('chat', (data) => {
    let newChat = new Chat();
    newChat.message = data.message;
    newChat.senderUsername = data.senderUsername;
    newChat.receiverUsername = data.receiverUsername;
    newChat.sender = JSON.stringify(data.sender);
    newChat.receiver = JSON.stringify(data.receiver);
    newChat.save(err => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
    io.to(data.receiver.username).emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.to(data.receiver.username).emit('typing', data);
  });
});