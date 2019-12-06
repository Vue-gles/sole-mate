import axios from 'axios';
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();
/**
 * ACTION TYPES
 */

const GOT_PARTNER = 'GOT_PARTNER';

/**
 * INITIAL STATE
 */
const defaultPartner = {};

/**
 * ACTION CREATORS
 */
const gotPartner = partner => ({ type: GOT_PARTNER, partner });

/**
 * THUNK CREATORS
 */
export const getPartner = id => async dispatch => {
  try {
    const { data } = await axios.get(`${BACKEND_HOST}/api/users/${id}`);
    dispatch(gotPartner(data));
  } catch (error) {
    console.log('Error:', error);
  }
};

export default partner = function(state = defaultPartner, action) {
  switch (action.type) {
    case GOT_PARTNER:
      return action.partner;
    default:
      return state;
  }
};
