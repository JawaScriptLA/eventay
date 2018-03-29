import initialState from './initialState.js';
import { RECEIVE_PROFILE, FETCH_PROFILE } from '../actions/actionTypes.js';

export default function userInfo(state = initialState.profileInfo, action) {
  let newState;

  if (action.type === RECEIVE_PROFILE) {
    newState = action.profileInfo;
    return newState;
  } else if (action.type === FETCH_PROFILE) {
    return action;
  }
  return state;
}