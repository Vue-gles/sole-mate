import io from 'socket.io-client';
import store from '../store';
import { getOutgoing } from '../store/outgoing';
import { getIncoming } from '../store/incoming';
import { getMessageThreads } from '../store/messageThreads';
import { getMessages } from '../store/singleMessageThread';
import { getUpcomingRunsThunk } from '../store/upcomingRuns';
import { completeRun } from '../store/upcomingRuns';
import { saveRun } from '../store/pastRuns';

///// FRONTEND
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();

const socket = io(BACKEND_HOST);

socket.on('connect', () => {
  console.log('Now connected to socket server');
});

socket.on('requestUpdated', () => {
  console.log('Frontend: requestUpdated received');
  store.dispatch(getOutgoing());
  store.dispatch(getMessageThreads());
  store.dispatch(getUpcomingRunsThunk('upcoming'));
});

socket.on('newRequestReceived', () => {
  console.log('Frontend: newRequestReceived');
  store.dispatch(getIncoming());
});

socket.on('newMessageReceived', partnerId => {
  console.log('Frontend: newMessageReceived', partnerId);
  const state = store.getState();
  if (state.user && state.user.id === partnerId) {
    store.dispatch(getMessageThreads());
    if (state.partner && state.partner.id) {
      store.dispatch(getMessages(state.partner.id));
    }
  }
});

socket.on('completeRunReceived', payload => {
  console.log('Frontend: completeRunReceived', payload);
  const { runId, coords, distance } = payload;
  store.dispatch(completeRun(runId));
  store.dispatch(saveRun(runId, coords, distance));
});

socket.on('disconnect', () => {
  console.log('connection to server lost.');
});

export default socket;
