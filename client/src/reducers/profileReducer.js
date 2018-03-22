import initialState from './initialState.js';
import { RECEIVE_PROFILE, FETCH_PROFILE } from '../actions/actionTypes.js';

export default function userInfo(state = initialState.profileInfo, action) {
  let newState;

  if (action.type === RECEIVE_PROFILE) {
    console.log(`RECEIVE_PROFILE action`);
    newState = action.profileInfo;
    return newState;
  } else if (action.type === FETCH_PROFILE) {
    console.log(`FETCH_PROFILE action`);
    return action;
  }

  console.log('userInfo default...');
  return state;
}