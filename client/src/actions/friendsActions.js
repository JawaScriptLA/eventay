import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const receiveFriendsList = (data) => {
  return { type: actionTypes.RECEIVE_FRIENDS, event: data };
}

export const fetchFriendsList = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveFriendsList(response.data))
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
