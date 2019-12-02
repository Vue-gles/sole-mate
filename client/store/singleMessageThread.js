import axios from 'axios';

// ACTION TYPES
const GOT_MESSAGES = 'GOT_MESSAGES';
const SENT_MESSAGE = 'SENT_MESSAGE';

// ACTION CREATORS
const gotMessages = messages => ({
  type: GOT_MESSAGES,
  messages,
});
const sentMessage = messages => ({
  type: SENT_MESSAGE,
  messages,
});

// THUNK CREATORS
export const getMessages = partnerId => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/messages/${partnerId}`
    );
    dispatch(gotMessages(data));
  } catch (error) {
    console.log('Error:', error);
  }
};

export const sendMessage = (partnerId, content) => async dispatch => {
  try {
    const {
      data,
    } = await axios.post(
      `${process.env.BACKEND_HOST}/api/messages/${partnerId}`,
      { content }
    );
    dispatch(sentMessage(data));
  } catch (error) {
    console.log('Error:', error);
  }
};

// INITIAL STATE
const initialState = [];

// REDUCER
export default singleMessageThread = function(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES:
      return action.messages;
    case SENT_MESSAGE:
      return action.messages;
    default:
      return state;
  }
};
