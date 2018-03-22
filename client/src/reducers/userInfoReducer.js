import initialState from './initialState.js';
import { RECEIVE_USERINFO } from '../actions/actionTypes.js';

export default function userInfo(state = initialState.userInfo, action) {
  let newState;

  if (action.type === RECEIVE_USERINFO) {
    console.log(`RECEIVE_USERINFO action`);
    newState = action.userInfo;
    return newState;
  }

  console.log('userInfo default...');
  return state;
}