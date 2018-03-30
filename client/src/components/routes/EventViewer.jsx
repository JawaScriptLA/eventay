import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import AttendantsList from '../misc/AttendantsList.jsx';
import CreatePost from '../posts/CreatePost.jsx';
import Post from '../posts/Post.jsx';

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
    this.generatePost = this.generatePost.bind(this);
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
        .then((res) => {
          const processedPost = []
          for (let i = 0; i < res.data.length; i++) {
            axios.get(`/api/user/id/${res.data[i].user_id}`, this.state.config)
            .then(userRes => {
              res.data[i].userInfo = userRes.data;
              processedPost.push(res.data[i]);
              if(res.data.length === processedPost.length) {
                this.setState({ posts: processedPost })
              }
            });
          }
        })
        .catch((err) => console.error('Error posts:', err));
      
      axios.get(`/api/user/id/${this.state.event.host_id}`, this.state.config)
        .then((host) => this.setState({ host: host.data }))
        .catch((err) => console.error('Error users:', err));
    }
  }

  generatePost(body) {
    axios.post(`/api/post`, {
      body,
      user_id: this.state.user.id,
      event_id: this.state.event.id,
      parent_id: null,
    }, this.state.config)
      .then(res => console.log(res.status));
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
          `${this.state.event.start_time
              .replace('T', ' ')
              .substring(0, this.state.event.start_time.length - 5)} 
          - ${this.state.event.end_time
              .replace('T', ' ')
              .substring(0, this.state.event.end_time.length - 5)}` : <span>Loading...</span>
        }
        {this.state.host ?
          <div>
            <p>{this.state.host.username}</p>
            <img src={this.state.host.profile_picture}/>
          </div>
        : null}
        <AttendantsList attendants={this.state.attendants} history={this.props.history} /> <br/>
        <CreatePost
          generatePost={this.generatePost}
        /> <br />
        {this.state.posts.length ? <Post history={this.props.history} posts={this.state.posts} /> : null}
      </div>
    );
  }
}
