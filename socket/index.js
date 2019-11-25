// import io from 'socket.io-client';
// import store from '../store';
// import { updatedIncoming } from '../store/incoming';

// //TAKE THIS OUT SOON
// require('../secrets');


// const socket = io(process.env.BACKEND_HOST)

// socket.connect();

// socket.on('connect', () => {
//   console.log('connected to socket server');
// });

// socket.connect();

// socket.on('connect', () => {
//   const { userId } = store.getState().user;

//   socket.on('request-update', update => {
//     store.dispatch(updatedIncoming(update));
//   });

//   socket.on('disconnect', () => {
//     console.log('connection to server lost.');
//   });
//   socket.on('newMessage', message => {
//     store.dispatch(storePublicMessages([message]));
//   });
// });


// export default socket;
