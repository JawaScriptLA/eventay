import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import AttendantsList from '../misc/AttendantsList.jsx';
import CreatePost from '../posts/CreatePost.jsx';
import {Avatar} from 'material-ui';
import Posts from '../posts/Posts.jsx';
import FriendsList from '../misc/friendsList.jsx';

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
    };
    this.generatePost = this.generatePost.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
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
          let attendantStatus = attendants.data.reduce((acc, attendant) => acc[0] ? acc : attendant.user_id === this.state.user.id ? [true, attendant.status] : acc, [false, '']);
          console.log('user:', this.state.user.id, 'host:', this.state.event.host_id, 'event:', this.state.event.id);
          this.setState({
            attendants: attendants.data,
            role: this.state.event.host_id === this.state.user.id ? 'host' : attendantStatus[0] ? attendantStatus[1] : 'stranger'
          });
        })
        .catch((err) => console.error('Error attendants:', err));
      
      axios.get(`/api/post/${this.state.event.id}`, this.state.config)
        .then((res) => {
          const processedPosts = [];
          const processedComments = [];
          const postObjList = [];
          for (let i = 0; i < res.data.length; i++) {
            axios.get(`/api/user/id/${res.data[i].user_id}`, this.state.config)
            .then(userRes => {
              res.data[i].userInfo = userRes.data;
              res.data[i].parent_id ? processedComments.push(res.data[i]) : processedPosts.push(res.data[i]);
              if(res.data.length - 1 === i) {
                for (let i = 0; i < processedPosts.length; i++) {
                  let postObj = {};
                  postObj.post = processedPosts[i];
                  postObj.comments = processedComments.filter(comment => comment.parent_id === processedPosts[i].id);
                  postObjList.push(postObj);
                }
                this.setState({ posts: postObjList })
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
    let bodyToSend = body.replace("'", "''");
    axios.post(`/api/post`, {
      body: bodyToSend,
      user_id: this.state.user.id,
      event_id: this.state.event.id,
      parent_id: null,
    }, this.state.config)
      .then((res) => {
        const updatedPostList = this.state.posts;
          axios.get(`/api/user/id/${res.data[0].user_id}`, this.state.config)
            .then(({ data }) => {
              const temp = res.data[0];
              temp.userInfo = data;
              updatedPostList.push({ post: temp, comments: []});
              this.setState({ posts: updatedPostList });
            });
        });
  }

  handleInvite({ target: { name } }) {
    axios.get(`/api/user/${name}`, this.state.config)
      .then(({ data }) => {
        axios.post(`/api/attendant`, {
          access: 'member',
          status: 'pending',
          user_id: data.id,
          event_id: this.state.event.id,
          invitor_id: this.state.user.id
        }, this.state.config)
          .then(() => console.log(`Successfully invited ${name}.`));
      })
      .catch((err) => console.error(err));
  }

  handleResponse(status) {
    axios.put('/api/attendant', { user_id: this.state.user.id, event_id: this.state.event.id, status: status }, this.state.config)
      .then((res) => this.setState({ role: status }))
      .catch((err) => console.error(err));
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
        <span>{
          this.state.event.start_time ? 
          `Time: ${this.state.event.start_time.replace('T', ' ')
            .substring(0, this.state.event.start_time.length - 5)} 
          - ${this.state.event.end_time.replace('T', ' ')
            .substring(0, this.state.event.end_time.length - 5)}` : 'Loading...'
        }</span>
        {
          this.state.role === 'host' ?
            <div>
              <button>Edit</button>
              <FriendsList history={this.props.history} invite={this.handleInvite} />
            </div>
          : this.state.role === 'pending' ?
            <div>
              <button onClick={() => this.handleResponse('going')}>Accept</button>
              <button onClick={() => this.handleResponse('maybe')}>Maybe</button>
              <button onClick={() => this.handleResponse('declined')}>Decline</button>
            </div>
          : this.state.role === 'declined' ?
            <div>
              <button onClick={() => this.handleResponse('going')}>Accept</button>
              <button onClick={() => this.handleResponse('maybe')}>Maybe</button>
            </div>
          : this.state.role === 'going' ?
            <div>
              <button onClick={() => this.handleResponse('maybe')}>Maybe</button>
              <button onClick={() => this.handleResponse('declined')}>Decline</button>
            </div>
          : this.state.role === 'maybe' ?
            <div>
              <button onClick={() => this.handleResponse('going')}>Accept</button>
              <button onClick={() => this.handleResponse('declined')}>Decline</button>
            </div>
          :
            <div>
              stranger
            </div>
        }
        {this.state.host ?
          <div>
            <p>Host: {this.state.host.username}</p>
            <Avatar size={100} src={this.state.host.profile_picture}/>
          </div>
        : null}
        <AttendantsList attendants={this.state.attendants} history={this.props.history} /> <br/>
        <CreatePost
          generatePost={this.generatePost}
        /> <br />
        {this.state.posts.length ? <Posts
            history={this.props.history}
            posts={this.state.posts}
            user={this.state.user}
            event={this.state.event}
            config={this.state.config}
          /> : null}
      </div>
    );
  }
}
