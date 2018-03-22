import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const receiveFriendsList = (data) => {
  return { type: actionTypes.RECEIVE_FRIENDS, friendsList: data };
}

export const fetchFriendsList = (id) => { // refactor so it takes in userId of client
  const config = {
    headers: { 'Authorization': 'bearer ' + localStorage.token}
  }
  return (dispatch) => {
    axios.get(`/api/friends/${id}`, config) // TODO: change to userId of client
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveFriendsList(response.data));
        } else {
          const flash = {
            type: 'error',
            title: 'error getting list',
            content: 'There was an error getting the friends list. Please try again.',
          }
          dispatch({
            type: "DISPLAY_FLASH",
            data: flash,
          });
        }
      });
  };
}
