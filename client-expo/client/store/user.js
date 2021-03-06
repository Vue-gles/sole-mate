import axios from 'axios';
import getEnvVars from '../../environment';
const { BACKEND_HOST } = getEnvVars();

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
const CREATE_USER = 'CREATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateUser = updatedUser => ({ type: UPDATE_USER, updatedUser });
const updateUserProfile = updatedUser => ({
  type: UPDATE_USER_PROFILE,
  updatedUser,
});
const createUser = user => ({ type: CREATE_USER, user });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`${BACKEND_HOST}/auth/me`);
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (inputs, method) => async dispatch => {
  let res;
  const {
    email,
    password,
    firstName,
    lastName,
    defaultAddress,
    imageUrl,
    avgPace,
    avgMileage,
    goal,
    bio,
  } = inputs;
  try {
    res = await axios.post(`${BACKEND_HOST}/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
      defaultAddress,
      imageUrl,
      avgPace,
      avgMileage,
      goal,
      bio,
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post(`${BACKEND_HOST}/auth/logout`);
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const update = userInfo => async dispatch => {
  try {
    const { data } = await axios.put(`${BACKEND_HOST}/api/users`, userInfo);
    dispatch(updateUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = userInfo => async dispatch => {
  try {
    const { data } = await axios.put(
      `${BACKEND_HOST}/api/users/profile`,
      userInfo
    );
    dispatch(updateUserProfile(data));
  } catch (error) {
    console.error(error);
  }
};

export const createUserThunk = user => async dispatch => {
  try {
    const { data } = await axios.post(`${BACKEND_HOST}/api/users`, user);
    dispatch(createUser(data));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER:
      return action.updatedUser;
    case UPDATE_USER_PROFILE:
      return action.updatedUser;
    case CREATE_USER:
      return action.user;
    default:
      return state;
  }
}
