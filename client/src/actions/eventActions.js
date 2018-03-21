import * as actionTypes from './actionTypes.js';
import axios from 'axios';

export const receiveEvent = (data) => {
  return { type: actionTypes.RECEIVE_EVENT, event: data };
}

export const fetchEvent = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (response.status === 200) {
          dispatch(receiveEvent(response.data)) // equivalent to setState({ event: response.data }) if not using redux
        } else {
          const flash = {
            type: 'error',
            title: 'error getting list',
            content: 'There was an error getting the event list. Please try again.',
          }
          dispatch({
            type: 'DISPLAY_FLASH',
            data: flash,
          });
        }
      });
  };
}
