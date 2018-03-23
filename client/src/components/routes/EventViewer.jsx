import React, { Component } from 'react';
import axios from 'axios';

export default class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    const user = localStorage.getItem('userInfo');
    const event = localStorage.getItem('eventInfo');

    axios.get(`/api/friends/${user.id}`)
      .then((friends) => {
        this.setState({ friends: friends });
      })
      .catch((err) => {
        console.log('Error friends:', err);
      });
    
    axios.get(`/api/attendant/${event.id}`)
      .then((attendants) => {
        this.setState({ attendants: attendants });
      })
      .catch((err) => {
        console.log('Error attendants:', err);
      });
    
    axios.get(`/api/post/${event.id}`)
      .then((posts) => {
        this.setState({ posts: posts });
      })
      .catch((err) => {
        console.log('Error posts:', err);
      });
  }
  
  render() {
    return (
      <div>Event Viewer Page</div>
    );
  }
}
