import * as actionTypes from './actionTypes.js';

export const receiveEvent = (data) => {
  return { type: actionTypes.RECEIVE_EVENT, event: data };
}

export const fetchEvent = () => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/todos') //placeholder
      .then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status,
        }))
    )
    .then(response => {
        if(response.status === 200){
            dispatch(receiveEvent(response.data))
        }else{
            var flash = {
                type: 'error',
                title: 'Error getting event list',
                content: 'There was an error getting the event list. Please try again.'
            }
            dispatch({type: "DISPLAY_FLASH", data: flash})
        }
    });
  };
}
