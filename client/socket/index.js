import io from 'socket.io-client';
import store from '../store';
import { getOutgoing } from '../store/outgoing';
import { getIncoming } from '../store/incoming';

///// FRONTEND

// //TAKE THIS OUT SOON
require('../../secrets');

const socket = io(process.env.BACKEND_HOST);

socket.on('connect', () => {
  console.log('Now connected to socket server');
});

socket.on('requestUpdated', () => {
  console.log('Frontend: requestUpdated received');
  store.dispatch(getOutgoing());
});

socket.on('newRequestReceived', () => {
  console.log('Frontend: newRequestReceived');
  store.dispatch(getIncoming());
});

socket.on('disconnect', () => {
  console.log('connection to server lost.');
});

export default socket;