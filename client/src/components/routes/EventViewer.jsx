import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';

export default class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    const config = { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } };
    const event = this.props.location.state.event;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log('event:', event);
    console.log('user:', user);
    this.setState({
      event: event
    });
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
        let isAttendant = attendants.data.reduce((acc, attendant) => (acc || attendant.user_id === user.id), false);
        this.setState({
          attendants: attendants.data,
          role: event.host_id === user.id ? 'host' : isAttendant ? 'attendant' : 'stranger'
        });
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
      <div>
        <NavBar history={this.props.history} />
        <h2>{this.state.event.title}</h2>
        <img src={this.state.event.thumbnail}/>
        <p>{this.state.event.description}</p>
        {this.state.event.start_time.replace('T', ' ').substring(0, this.state.event.start_time.length - 5)} - {this.state.event.end_time.replace('T', ' ').substring(0, this.state.event.end_time.length - 5)}
      </div>
    );
  }
}
