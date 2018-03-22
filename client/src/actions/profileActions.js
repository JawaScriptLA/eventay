import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const receiveprofile = (data) => {
  return { type: actionTypes.RECEIVE_PROFILE, profileInfo: data };
}

export const fetchProfile = (id, username) => { // refactor so it takes in userId of client
  const config = {
    headers: { 'Authorization': 'bearer ' + localStorage.token}
  }
  return (dispatch) => {
    axios.get(`/api/user/${id}`, config) // TODO: change to userId of client
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveprofile(response.data));
        } else {
          const flash = {
            type: 'error',
            // title: `error getting profile for ${username}`,
            content: 'There was an error getting the profile. Please try again.',
          }
          dispatch({
            type: "DISPLAY_FLASH",
            data: flash,
          });
        }
      });
  };
}
