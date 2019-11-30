import axios from 'axios';

// ACTION TYPES
const GOT_PAST_RUNS = 'GOT__PAST_RUNS';


// ACTION CREATORS
const gotPastRuns = pastRuns => ({
  type: GOT_PAST_RUNS,
  pastRuns
});

// THUNK CREATORS
export const getPastRunsThunk = type => async dispatch => {
  try {
      console.log("THUUUUUNK")
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/runs?type=${type}`
    );
    dispatch(gotPastRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};




// REDUCER
export default pastRuns = (state = [], action) => {
  switch (action.type) {
    case GOT_PAST_RUNS:
      return action.pastRuns;
    default:
      return state;
  }
};