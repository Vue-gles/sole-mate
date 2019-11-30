import axios from 'axios';

// ACTION TYPES
const GOT_UPCOMING_RUNS = 'GOT__UPCOMING_RUNS';


// ACTION CREATORS
const gotUpcomingRuns = upcomingRuns => ({
  type: GOT_UPCOMING_RUNS,
  upcomingRuns
});

// THUNK CREATORS
export const getUpcomingRunsThunk = type => async dispatch => {
  try {
      console.log("THUUUUUNK")
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/runs?type=${type}`
    );
    dispatch(gotUpcomingRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};




// REDUCER
export default upcomingRuns = (state = [], action) => {
  switch (action.type) {
    case GOT_UPCOMING_RUNS:
      return action.upcomingRuns;
    default:
      return state;
  }
};
