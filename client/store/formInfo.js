import axios from 'axios';

const GOT_RUN_NOW_FORM_INFO = 'GOT_RUN_NOW_FORM_INFO';

export const gotRunNowFormInfo = runNowInfo => {

  return {
    type: GOT_RUN_NOW_FORM_INFO,
    runNowInfo,
  };
};

const initialState = {
  runNowInfo: {
    lat: 50,
    long: 50,
    maxDistance: 0,
  },
};

export default formInfo = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RUN_NOW_FORM_INFO:
      return { ...state, runNowInfo: action.runNowInfo };
    default:
      return state;
  }
};
