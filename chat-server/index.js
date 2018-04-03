const express = require('express');
const socket = require('socket.io');

const PORT = 9001;
const app = express();
const server = app.listen(PORT, () => console.log('Chat server up and running at Port ', PORT));

//socket setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
});