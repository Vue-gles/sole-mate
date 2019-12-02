import axios from 'axios';

// ACTION TYPES
const GOT_PAST_RUNS = 'GOT__PAST_RUNS';
const SAVED_RUN = 'SAVED_RUN';

// ACTION CREATORS
const gotPastRuns = pastRuns => ({
  type: GOT_PAST_RUNS,
  pastRuns,
});

const savedRun = run => ({
  type: SAVED_RUN,
  run,
});

// THUNK CREATORS
export const getPastRunsThunk = type => async dispatch => {
  try {
    console.log('THUUUUUNK');
    const { data } = await axios.get(
      `${process.env.BACKEND_HOST}/api/runs?type=${type}`
    );
    dispatch(gotPastRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

export const saveRun = (runId, route, distance) => async dispatch => {
  try {
    console.log('thunk there it is:', runId, route, distance);
    const { data } = await axios.put(
      `${process.env.BACKEND_HOST}/api/runs/${runId}`,
      {
        route,
        distance,
      }
    );
    console.log('what is saveRun data', data);
    dispatch(savedRun(data));
  } catch (error) {
    console.log('is this a saveRun error?');
    console.log('Error:', error);
  }
};

// REDUCER
export default pastRuns = (state = [], action) => {
  switch (action.type) {
    case GOT_PAST_RUNS:
      return action.pastRuns;
    case SAVED_RUN:
      return [...state, action.run];
    default:
      return state;
  }
};
