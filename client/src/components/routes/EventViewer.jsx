import React, { Component } from 'react';
import axios from 'axios';

export default class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    const config = { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } };
    const event = this.props.location.state.event;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    
    axios.get(`/api/friends/${user.id}`, config)
      .then((friends) => {
        console.log('friends:', friends.data);
        this.setState({ friends: friends.data });
      })
      .catch((err) => {
        console.log('Error friends:', err);
      });
    
    axios.get(`/api/attendant/${event.id}`, config)
      .then((attendants) => {
        console.log('attendants:', attendants.data);
        this.setState({ attendants: attendants.data });
      })
      .catch((err) => {
        console.log('Error attendants:', err);
      });
    
    axios.get(`/api/post/${event.id}`, config)
      .then((posts) => {
        console.log('posts:', posts.data);
        this.setState({ posts: posts.data });
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
