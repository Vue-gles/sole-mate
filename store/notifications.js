import axios from 'axios';

// ACTION TYPE
const GOT_OUTGOING = 'GOT_OUTGOING';
const GOT_INCOMING = 'GOT_INCOMING';

// ACTION CREATOR
const gotOutgoing = notifications => ({
  type: GOT_OUTGOING,
  notifications,
});
const gotIncoming = notifications => ({
  type: GOT_INCOMING,
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
export const getIncoming = () => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/requests/incoming`
    );
    dispatch(gotIncoming(data));
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
    case GOT_INCOMING:
      return action.notifications;
    default:
      return state;
  }
};
