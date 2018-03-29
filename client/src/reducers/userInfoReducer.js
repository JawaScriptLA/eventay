import initialState from './initialState.js';
import { RECEIVE_USERINFO } from '../actions/actionTypes.js';

export default function userInfo(state = initialState.userInfo, action) {
  let newState;

  if (action.type === RECEIVE_USERINFO) {
    newState = action.userInfo;
    return newState;
  }
  return state;
}