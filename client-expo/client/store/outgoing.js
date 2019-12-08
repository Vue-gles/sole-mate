import axios from 'axios';
import getEnvVars from '../../environment';
import {gotOutgoingNotificationsFetchingStatus} from './isFetching'
const { BACKEND_HOST } = getEnvVars();

// ACTION TYPE
const GOT_OUTGOING = 'GOT_OUTGOING';
const MADE_REQUEST = 'MADE_REQUEST';

// ACTION CREATOR
const gotOutgoing = notifications => ({
  type: GOT_OUTGOING,
  notifications,
});
const madeRequest = notifications => ({
  type: MADE_REQUEST,
  notifications,
});

// THUNK CREATOR
export const getOutgoing = () => async dispatch => {
  try {
    //console.log('Is getOutgoing running?');
    const { data } = await axios.get(`${BACKEND_HOST}/api/requests/outgoing`);
    dispatch(gotOutgoing(data));
    dispatch(gotOutgoingNotificationsFetchingStatus(false))
  } catch (err) {
    console.log('Error:', err);
  }
};

export const makeRequest = runId => async dispatch => {
  try {
    const { data } = await axios.post(`${BACKEND_HOST}/api/requests/${runId}`);
    dispatch(madeRequest(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

// INITIAL STATE
const initialState = [];

// REDUCER
export default outgoing = (state = initialState, action) => {
  switch (action.type) {
    case GOT_OUTGOING:
      return action.notifications;
    case MADE_REQUEST:
      return action.notifications;
    default:
      return state;
  }
};
