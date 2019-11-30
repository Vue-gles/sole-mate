import axios from 'axios';
import { awaitExpression } from '@babel/types';

// ACTION TYPE
const GOT_MESSAGE_THREADS = 'GOT_MESSAGE_THREADS';

// ACTION CREATOR
const gotMessageThreads = messages => ({
  type: GOT_MESSAGE_THREADS,
  messages,
});

// THUNK CREATOR
export const getMessageThreads = () => async dispatch => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/messages`
    );
    dispatch(gotMessageThreads(data));
  } catch (error) {
    console.log('Error:', error);
  }
};

// INITIAL STATE
const initialState = {};
// REDUCER
export default messageThreads = function(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGE_THREADS:
      return action.messages;
    default:
      return state;
  }
};
