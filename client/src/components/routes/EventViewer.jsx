import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import AttendantsList from '../misc/AttendantsList.jsx';

export default class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } },
      event: {},
      user: {},
      friends: [],
      attendants: null,
      role: '',
      posts: []
    }
  }
  
  componentWillMount() {
    this.setState({ user: JSON.parse(localStorage.getItem('userInfo')) });
    this.props.location.state ? this.setState({ event: this.props.location.state.event }) : 
      axios.get(`/api/event/eventinfo/${this.props.match.params.id}`, this.state.config)
        .then((res) => this.setState({ event: res.data[0] }))
        .catch((err) => console.error('Error get event info: ', err));
  }

  init() {
    if (Object.keys(this.state.event).length > 0) {
      axios.get(`/api/friends/${this.state.user.id}`, this.state.config)
        .then((friends) => this.setState({ friends: friends.data }))
        .catch((err) => console.error('Error friends:', err));
    
      axios.get(`/api/attendant/${this.state.event.id}`, this.state.config)
        .then((attendants) => {
          let isAttendant = attendants.data.reduce((acc, attendant) => (acc || attendant.user_id === this.state.user.id), false);
          this.setState({
            attendants: attendants.data,
            role: this.state.event.host_id === this.state.user.id ? 'host' : isAttendant ? 'attendant' : 'stranger'
          });
        })
        .catch((err) => console.error('Error attendants:', err));
      
      axios.get(`/api/post/${this.state.event.id}`, this.state.config)
        .then((posts) => this.setState({ posts: posts.data }))
        .catch((err) => console.error('Error posts:', err));
      
      axios.get(`/api/user/id/${this.state.event.host_id}`, this.state.config)
        .then((host) => this.setState({ host: host.data }))
        .catch((err) => console.error('Error users:', err));
    }
  }
  
  render() {
    if (!this.state.event) {
      return <div>This is not an event</div>;
    } else if (!Array.isArray(this.state.attendants)) {
      this.init();
      return <div>Loading...</div>;
    }
    
    return (
      <div>
        <NavBar history={this.props.history} />
        <h2>{this.state.event.title}</h2>
        <img src={this.state.event.thumbnail}/>
        <p>{this.state.event.description}</p>
        {
          this.state.event.start_time ? 
          `${this.state.event.start_time.replace('T', ' ').substring(0, this.state.event.start_time.length - 5)} 
          - ${this.state.event.end_time.replace('T', ' ').substring(0, this.state.event.end_time.length - 5)}` : <span>Loading...</span>
        }
        {this.state.host ?
          <div>
            <p>{this.state.host.username}</p>
            <img src={this.state.host.profile_picture}/>
          </div>
        : null}
        <AttendantsList attendants={this.state.attendants} history={this.props.history} />
      </div>
    );
  }
}
