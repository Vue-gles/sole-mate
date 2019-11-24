import axios from 'axios';

// ACTION TYPE
const GOT_INCOMING = 'GOT_INCOMING';

// ACTION CREATOR
const gotIncoming = notifications => ({
  type: GOT_INCOMING,
  notifications,
});

// THUNK CREATOR
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
    case GOT_INCOMING:
      return action.notifications;
    default:
      return state;
  }
};
