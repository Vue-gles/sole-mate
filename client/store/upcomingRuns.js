import axios from 'axios';

// ACTION TYPES
const GOT_UPCOMING_RUNS = 'GOT__UPCOMING_RUNS';
const COMPLETE_RUN = 'COMPLETE_RUN';

// ACTION CREATORS
const gotUpcomingRuns = upcomingRuns => ({
  type: GOT_UPCOMING_RUNS,
  upcomingRuns,
});

export const completeRun = runId => ({
  type: COMPLETE_RUN,
  runId,
});

// THUNK CREATORS
export const getUpcomingRunsThunk = type => async dispatch => {
  try {
    console.log('THUUUUUNK');
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
    case COMPLETE_RUN:
      return state.filter(run => {
        if (run.id === action.runId) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
};
