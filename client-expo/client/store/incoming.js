import axios from 'axios';
// import socket from '../socket';
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();

// ACTION TYPE
const GOT_INCOMING = 'GOT_INCOMING';
const UPDATED_INCOMING = 'UPDATED_INCOMING';

// ACTION CREATOR
const gotIncoming = notifications => ({
  type: GOT_INCOMING,
  notifications,
});
const updatedIncoming = notifications => ({
  type: UPDATED_INCOMING,
  notifications,
});

// THUNK CREATOR
export const getIncoming = () => async dispatch => {
  try {
    const { data } = await axios.get(`${BACKEND_HOST}/api/requests/incoming`);
    dispatch(gotIncoming(data));
  } catch (err) {
    console.log('Error:', err);
  }
};
export const updateIncoming = (
  runId,
  requesterId,
  status
) => async dispatch => {
  try {
    const { data } = await axios.put(`${BACKEND_HOST}/api/requests`, {
      runId,
      requesterId,
      status,
    });
    dispatch(updatedIncoming(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

// INITIAL STATE
const initialState = [];

// REDUCER
export default incoming = (state = initialState, action) => {
  switch (action.type) {
    case GOT_INCOMING:
      return action.notifications;
    case UPDATED_INCOMING:
      return action.notifications;
    default:
      return state;
  }
};
