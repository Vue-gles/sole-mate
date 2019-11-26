import io from 'socket.io-client';
import store from '../store';
import { getOutgoing } from '../store/outgoing';

// //TAKE THIS OUT SOON
require('../secrets');

const socket = io(process.env.BACKEND_HOST);

socket.on('connect', () => {
  console.log('Now connected to socket server');
});

socket.on('getUpdate', () => {
  console.log('get data from backend');
  store.dispatch(getOutgoing());
});

socket.on('disconnect', () => {
  console.log('connection to server lost.');
});

export default socket;
