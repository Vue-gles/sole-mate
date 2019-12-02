const axios = require('axios');
const { User, Run, Request } = require('../db');

///// BACKEND

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made! with ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has disconnected!`);
    });

    socket.on('requestUpdate', () => {
      console.log(`Backend: requestUpdate received`);
      io.emit('requestUpdated');

    });

    socket.on('newRequest', () => {
      console.log('Backend: newRequest received');
      socket.broadcast.emit('newRequestReceived');
    });

    socket.on('newMessage', partnerId => {
      console.log('Backend: newMessage received', partnerId);
      socket.broadcast.emit('newMessageReceived', partnerId);
    });
  });
};
