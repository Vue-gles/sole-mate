const axios = require('axios');
const { User, Run, Request } = require('../db');

module.exports = io => {
  io.on('connection', socket => {
    console.log(
      `A socket connection to the server has been made! with ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has disconnected!`);
    });

    socket.on('requestUpdate', () => {
      console.log(`--------------->>>>>>>>> Updated an incoming request`);
      socket.broadcast.emit('getUpdate');
    });
  });
};
