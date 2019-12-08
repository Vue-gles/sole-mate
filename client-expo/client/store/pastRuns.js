import axios from 'axios';
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();

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
    const { data } = await axios.get(`${BACKEND_HOST}/api/runs?type=${type}`);
    dispatch(gotPastRuns(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

export const saveRun = (runId, route, distance, seconds) => async dispatch => {
  try {
    const { data } = await axios.put(`${BACKEND_HOST}/api/runs/${runId}`, {
      route,
      distance,
      seconds,
    });
    dispatch(savedRun(data));
  } catch (error) {
    console.log('Error:', error);
  }
};

// REDUCER
export default pastRuns = (state = [], action) => {
  switch (action.type) {
    case GOT_PAST_RUNS:
      return action.pastRuns;
    case SAVED_RUN:
      return [action.run, ...state];
    default:
      return state;
  }
};
