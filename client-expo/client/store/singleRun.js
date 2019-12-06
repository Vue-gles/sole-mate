import axios from 'axios';
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();

// ACTION TYPE
const GOT_SINGLE_RUN = 'GOT_SINGLE_RUN';
const REMOVE_SINGLE_RUN = 'REMOVE_SINGLE_RUN';

// ACTION CREATOR
const gotSingleRun = run => ({
  type: GOT_SINGLE_RUN,
  run,
});
export const removeSingleRun = () => ({
  type: REMOVE_SINGLE_RUN,
});

// THUNK CREATOR
export const getSingleRun = id => async dispatch => {
  try {
    const { data } = await axios.get(`${BACKEND_HOST}/api/runs/${id}`);
    dispatch(gotSingleRun(data));
  } catch (err) {
    console.log('Error:', err);
  }
};

const initialState = {};

// REDUCER
export default singleRun = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SINGLE_RUN:
      return action.run;
    case REMOVE_SINGLE_RUN:
      return initialState;
    default:
      return state;
  }
};
