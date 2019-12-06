import axios from 'axios';
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();

// ACTION TYPES
const GOT_UPCOMING_RUNS = 'GOT__UPCOMING_RUNS';
const GOT_NEW_UPCOMING_RUN = 'GOT_NEW_UPCOMING_RUN';
const COMPLETE_RUN = 'COMPLETE_RUN';

// ACTION CREATORS
const gotUpcomingRuns = upcomingRuns => ({
  type: GOT_UPCOMING_RUNS,
  upcomingRuns,
});

const gotNewUpcomingRun = newRun => ({
  type: GOT_NEW_UPCOMING_RUN,
  newRun,
});

export const completeRun = runId => ({
  type: COMPLETE_RUN,
  runId,
});

// THUNK CREATORS
export const getUpcomingRunsThunk = type => async dispatch => {
  try {
    console.log('THUUUUUNK');
    const { data } = await axios.get(`${BACKEND_HOST}/api/runs?type=${type}`);
    dispatch(gotUpcomingRuns(data));
    console.log('Thunk worked!');
  } catch (err) {
    console.log('Error:', err);
  }
};

export const createUpcomingRunThunk = runInfo => {
  return async dispatch => {
    try {
      const {
        street,
        city,
        state,
        lattitude,
        longitude,
        endTime,
        startTime,
        prefferedMileage,
      } = runInfo;
      const { data } = await axios.post(`${BACKEND_HOST}/api/runs`, {
        street,
        city,
        state,
        lat: lattitude,
        long: longitude,
        startTimeframe: startTime,
        endTimeframe: endTime,
        prefferedMileage,
      });
      dispatch(gotNewUpcomingRun(data));
    } catch (err) {
      console.log('Error:', err);
    }
  };
};

// REDUCER
export default upcomingRuns = (state = [], action) => {
  switch (action.type) {
    case GOT_UPCOMING_RUNS:
      return action.upcomingRuns;
    case GOT_NEW_UPCOMING_RUN:
      return [...state, action.newRun];
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
