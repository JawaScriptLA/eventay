const express = require('express');
const socket = require('socket.io');

const PORT = 9001;
const app = express();
const server = app.listen(PORT, () => console.log('Chat server up and running at Port ', PORT));

//socket setup
const io = socket(server);

io.on('connection', (socket) => {
  socket.on('handshake', (data) => {
    console.log('joining room');
    socket.join(data.userInfo.username);
  });

  socket.on('leaveRoom', (data) => {
    console.log('leaving room');
    socket.leave(data.userInfo.username);
  });

  socket.on('chat', (data) => {
    console.log('sending chat');
    io.to(data.receiver.username).emit('chat', data);
  });
});