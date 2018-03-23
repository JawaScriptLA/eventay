import * as actionTypes from './actionTypes.js';

export const receiveUserInfo = data => {
  return { type: actionTypes.RECEIVE_USERINFO, userInfo: data };
};
