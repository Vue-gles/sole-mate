import io from 'socket.io-client';
import store from '../store';
import { getOutgoing } from '../store/outgoing';
import { getIncoming } from '../store/incoming';
import { getMessageThreads } from '../store/messageThreads';
import { getMessages } from '../store/singleMessageThread';

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

socket.on('newMessageReceived', partnerId => {
  console.log('Frontend: newMessageReceived', partnerId);
  const state = store.getState();
  if (state.user && state.user.id === partnerId_) {
    store.dispatch(getMessageThreads());
    if (state.partner && state.partner.id) {
      store.dispatch(getMessages(state.partner.id));
    }
  }
});

socket.on('disconnect', () => {
  console.log('connection to server lost.');
});

export default socket;
