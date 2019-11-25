import axios from 'axios';

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
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/requests/outgoing`
    );
    dispatch(gotOutgoing(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

export const makeRequest = runId => async dispatch => {
  try {
    console.log('make request');
    const { data } = await axios.post(
      `${process.env.BACKEND_HOST}/api/requests/${runId}`
    );
    dispatch(madeRequest(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

// INITIAL STATE
const initialState = [];

// REDUCER
export default notifications = (state = initialState, action) => {
  switch (action.type) {
    case GOT_OUTGOING:
      return action.notifications;
    case MADE_REQUEST:
      return action.notifications;
    default:
      return state;
  }
};
