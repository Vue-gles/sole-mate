import axios from 'axios';

// ACTION TYPES
const GOT_RUNS = 'GOT_RUNS';

// ACTION CREATORS
const gotRuns = runs => ({
  type: GOT_RUNS,
  runs,
});

// THUNK CREATORS
export const getRuns = () => async dispatch => {
  try {
    const { data } = await axios.get(`${process.env.BACKEND_HOST}/api/runs`);
    dispatch(gotRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

// REDUCER
export default runs = (state = {}, action) => {
  switch (action.type) {
    case GOT_RUNS:
      return action.runs;
    default:
      return state;
  }
};
