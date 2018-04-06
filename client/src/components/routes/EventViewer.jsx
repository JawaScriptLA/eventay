import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import AttendantsList from '../misc/AttendantsList.jsx';
import CreatePost from '../posts/CreatePost.jsx';
import { Avatar, Dialog, Paper, TextField, Divider } from 'material-ui';
import Posts from '../posts/Posts.jsx';
import FriendsList from '../misc/friendsList.jsx';
import { convertTime } from '../../../../utils/utils.js';
import ReactFilestack from 'filestack-react';
import filestack from '../../../config.js';
import RaisedButton from 'material-ui/RaisedButton';

export default class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        headers: { Authorization: 'bearer ' + localStorage.getItem('token') }
      },
      event: {},
      user: {},
      friends: [],
      attendants: null,
      role: '',
      posts: [],
      mode: 'view',
      changeTitle: '',
      changeDescription: '',
      changeStartTime: '',
      changeEndTime: '',
      changeStartMonth: '',
      changeEndMonth: '',
      changeStartDate: '',
      changeEndDate: '',
      changeStartYear: '',
      changeEndYear: ''
    };
    this.generatePost = this.generatePost.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleUninvite = this.handleUninvite.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleThumbnailUpload = this.handleThumbnailUpload.bind(this);
  }

  componentWillMount() {
    this.setState({ user: JSON.parse(localStorage.getItem('userInfo')) });
    this.props.location.state ? (
      this.props.location.state.event.startTime = `${convertTime(this.props.location.state.event.start_time).split(' ')[4]} ${convertTime(this.props.location.state.event.start_time).split(' ')[5]}`,
      this.props.location.state.event.endTime = `${convertTime(this.props.location.state.event.end_time).split(' ')[4]} ${convertTime(this.props.location.state.event.end_time).split(' ')[5]}`,
      this.props.location.state.event.startMonth = convertTime(this.props.location.state.event.start_time).split(' ')[1],
      this.props.location.state.event.endMonth = convertTime(this.props.location.state.event.end_time).split(' ')[1],
      this.props.location.state.event.startDate = convertTime(this.props.location.state.event.start_time).split(' ')[2].substring(0, convertTime(this.props.location.state.event.start_time).split(' ')[2].length - 1),
      this.props.location.state.event.endDate = convertTime(this.props.location.state.event.start_time).split(' ')[2].substring(0, convertTime(this.props.location.state.event.end_time).split(' ')[2].length - 1),
      this.props.location.state.event.startYear = convertTime(this.props.location.state.event.start_time).split(' ')[3],
      this.props.location.state.event.endYear = convertTime(this.props.location.state.event.start_time).split(' ')[3],
      this.setState({
        event: this.props.location.state.event,
        changeTitle: this.props.location.state.event.title,
        changeDescription: this.props.location.state.event.description,
        changeStartTime: `${this.props.location.state.event.startTime.split(' ')[0]} ${this.props.location.state.event.startTime.split(' ')[1]}`,
        changeEndTime: `${this.props.location.state.event.endTime.split(' ')[0]} ${this.props.location.state.event.endTime.split(' ')[1]}`,
        changeStartMonth: this.props.location.state.event.startMonth,
        changeEndMonth: this.props.location.state.event.endMonth,
        changeStartDate: this.props.location.state.event.startDate,
        changeEndDate: this.props.location.state.event.endDate,
        changeStartYear: this.props.location.state.event.startYear,
        changeEndYear: this.props.location.state.event.endYear
      })
    ) : 
      axios.get(`/api/event/eventinfo/${this.props.match.params.id}`, this.state.config)
        .then((res) => {
          res.data[0].startTime = `${convertTime(res.data[0].start_time).split(' ')[4]} ${convertTime(res.data[0].start_time).split(' ')[5]}`;
          res.data[0].endTime = `${convertTime(res.data[0].end_time).split(' ')[4]} ${convertTime(res.data[0].end_time).split(' ')[5]}`;
          res.data[0].startMonth = convertTime(res.data[0].start_time).split(' ')[1];
          res.data[0].endMonth = convertTime(res.data[0].end_time).split(' ')[1];
          res.data[0].startDate = convertTime(res.data[0].start_time).split(' ')[2].substring(0, convertTime(res.data[0].start_time).split(' ')[2].length - 1);
          res.data[0].endDate = convertTime(res.data[0].end_time).split(' ')[2].substring(0, convertTime(res.data[0].end_time).split(' ')[2].length - 1);
          res.data[0].startYear = convertTime(res.data[0].start_time).split(' ')[3];
          res.data[0].endYear = convertTime(res.data[0].end_time).split(' ')[3];
          this.setState({
            event: res.data[0],
            changeTitle: res.data[0].title,
            changeDescription: res.data[0].description,
            changeStartTime: `${res.data[0].start_time.split(' ')[4]} ${res.data[0].start_time.split(' ')[5]}`,
            changeEndTime: `${res.data[0].end_time.split(' ')[4]} ${res.data[0].end_time.split(' ')[5]}`,
            changeStartMonth: res.data[0].startMonth,
            changeEndMonth: res.data[0].endMonth,
            changeStartDate: res.data[0].startDate,
            changeEndDate: res.data[0].endDate,
            changeStartYear: res.data[0].startYear,
            changeEndYear: res.data[0].endYear
          });
        })
        .catch((err) => console.error('Error get event info: ', err));
  }

  init() {
    if (Object.keys(this.state.event).length > 0) {
      axios
        .get(`/api/friends/${this.state.user.id}`, this.state.config)
        .then(friends => this.setState({ friends: friends.data }))
        .catch(err => console.error('Error friends:', err));

      axios
        .get(`/api/attendant/${this.state.event.id}`, this.state.config)
        .then(attendants => {
          let attendantStatus = attendants.data.reduce(
            (acc, attendant) =>
              acc[0]
                ? acc
                : attendant.user_id === this.state.user.id
                  ? [true, attendant.status]
                  : acc,
            [false, '']
          );
          this.setState({
            attendants: attendants.data,
            role:
              this.state.event.host_id === this.state.user.id
                ? 'host'
                : attendantStatus[0] ? attendantStatus[1] : 'stranger'
          });
        })
        .catch(err => console.error('Error attendants:', err));

      axios
        .get(`/api/post/${this.state.event.id}`, this.state.config)
        .then(res => {
          const processedPosts = [];
          const processedComments = [];
          const postObjList = [];
          for (let i = 0; i < res.data.length; i++) {
            axios
              .get(`/api/user/id/${res.data[i].user_id}`, this.state.config)
              .then(userRes => {
                res.data[i].userInfo = userRes.data;
                res.data[i].parent_id
                  ? processedComments.push(res.data[i])
                  : processedPosts.push(res.data[i]);
                if (res.data.length - 1 === i) {
                  for (let i = 0; i < processedPosts.length; i++) {
                    let postObj = {};
                    postObj.post = processedPosts[i];
                    postObj.comments = processedComments.filter(
                      comment => comment.parent_id === processedPosts[i].id
                    );
                    postObjList.push(postObj);
                  }
                  this.setState({ posts: postObjList });
                }
              });
          }
        })
        .catch(err => console.error('Error posts:', err));

      axios
        .get(`/api/user/id/${this.state.event.host_id}`, this.state.config)
        .then(host => this.setState({ host: host.data }))
        .catch(err => console.error('Error users:', err));
    }
  }

  generatePost(body) {
    let bodyToSend = body.replace("'", "''");
    axios
      .post(
        `/api/post`,
        {
          body: bodyToSend,
          user_id: this.state.user.id,
          event_id: this.state.event.id,
          parent_id: null
        },
        this.state.config
      )
      .then(res => {
        const updatedPostList = this.state.posts;
        axios
          .get(`/api/user/id/${res.data[0].user_id}`, this.state.config)
          .then(({ data }) => {
            const temp = res.data[0];
            temp.userInfo = data;
            updatedPostList.push({ post: temp, comments: [] });
            this.setState({ posts: updatedPostList });
          });
      });
  }

  handleInvite(name) {
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
      .catch(err => console.error(err));
  }

  handleUninvite(name) {
    if (this.state.role === 'host') {
      axios.get(`/api/user/${name}`, this.state.config)
        .then(({ data }) => {
          axios.delete(`/api/attendant`, {
            data: {
              user_id: data.id,
              event_id: this.state.event.id
            },
            headers: this.state.config.headers
          })
            .then(() => console.log(`Successfully uninvited ${name}.`));
        })
        .catch((err) => console.error(err));
    } else {
      console.log('Permission denied.');
    }
  }

  handleResponse(status) {
    axios
      .put(
        '/api/attendant',
        {
          user_id: this.state.user.id,
          event_id: this.state.event.id,
          status: status
        },
        this.state.config
      )
      .then(res => this.setState({ role: status }))
      .catch(err => console.error(err));
  }

  handleEdit() {
    this.setState({ mode: 'edit' });
  }

  handleSave() {
    let startAdd = 0;
    let startHour = this.state.changeStartTime.split(':')[0];
    this.state.changeStartTime.split(' ')[1] === 'pm' ? startHour !== '12' ? startAdd = 12 : null : startHour === '12' ? startHour = '00' : null;
    let startMonth = this.state.changeStartMonth === 'Jan' ? 0 : this.state.changeStartMonth === 'Feb' ? 1 : this.state.changeStartMonth === 'Mar' ? 2 : this.state.changeStartMonth === 'Apr' ? 3 : this.state.changeStartMonth === 'May' ? 4 : this.state.changeStartMonth === 'Jun' ? 5 : this.state.changeStartMonth === 'Jul' ? 6 : this.state.changeStartMonth === 'Aug' ? 7 : this.state.changeStartMonth === 'Sep' ? 8 : this.state.changeStartMonth === 'Oct' ? 9 : this.state.changeStartMonth === 'Nov' ? 10 : this.state.changeStartMonth === 'Dec' ? 12 : null;
    let endMonth = this.state.changeEndMonth === 'Jan' ? 0 : this.state.changeEndMonth === 'Feb' ? 1 : this.state.changeEndMonth === 'Mar' ? 2 : this.state.changeEndMonth === 'Apr' ? 3 : this.state.changeEndMonth === 'May' ? 4 : this.state.changeEndMonth === 'Jun' ? 5 : this.state.changeEndMonth === 'Jul' ? 6 : this.state.changeEndMonth === 'Aug' ? 7 : this.state.changeEndMonth === 'Sep' ? 8 : this.state.changeEndMonth === 'Oct' ? 9 : this.state.changeEndMonth === 'Nov' ? 10 : this.state.changeEndMonth === 'Dec' ? 12 : null;
    startHour = +startHour + startAdd;
    let startMinute = +this.state.changeStartTime.split(':')[1].split(' ')[0];
    let endAdd = 0;
    let endHour = this.state.changeEndTime.split(':')[0];
    this.state.changeEndTime.split(' ')[1] === 'pm' ? endHour !== '12' ? endAdd = 12 : null : endHour === '12' ? endHour = '00' : null;
    endHour = +endHour + endAdd;
    let endMinute = +this.state.changeEndTime.split(':')[1].split(' ')[0];
    axios.put('/api/event', {
      title: this.state.changeTitle,
      description: this.state.changeDescription,
      start_time: new Date(+this.state.changeStartYear, startMonth, +this.state.changeStartDate, startHour, startMinute),
      end_time: new Date(+this.state.changeEndYear, endMonth, +this.state.changeEndDate, endHour, endMinute),
      id: this.state.event.id
    }, this.state.config)
      .then(() => {
        this.state.event.title = this.state.changeTitle;
        this.state.event.description = this.state.changeDescription;
        this.state.event.startTime = this.state.changeStartTime;
        this.state.event.endTime = this.state.changeEndTime;
        this.state.event.startMonth = this.state.changeStartMonth;
        this.state.event.endMonth = this.state.changeEndMonth;
        this.state.event.startDate = this.state.changeStartDate;
        this.state.event.endDate = this.state.changeEndDate;
        this.state.event.startYear = this.state.changeStartYear;
        this.state.event.endYear = this.state.changeEndYear;
        this.setState({
          mode: 'view',
          event: this.state.event
        });
      })
      .catch((err) => console.error(err));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleThumbnailUpload(res) {
    let url = res.filesUploaded[0].url;
    axios.put('/api/event', {
      thumbnail: url,
      id: this.state.event.id
    }, this.state.config)
      .then(() => {
        this.state.event.thumbnail = url;
        this.setState({ event: this.state.event });
      })
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
        {this.state.mode === 'view' ?
          <h2>{this.state.event.title}</h2>
        : <span><TextField
            onChange={this.handleChange}
            type="text"
            name="changeTitle"
            value={this.state.changeTitle}
          /><br/></span>}
          {
            this.state.mode === 'view' ?
              <p>{this.state.event.description}</p> :
              <TextField
                onChange={this.handleChange}
                type="text"
                name="changeDescription"
                value={this.state.changeDescription}
              />
          }
        <Paper>
          <div>
            {this.state.event && this.state.event.thumbnail ? <Avatar size={200} src={this.state.event.thumbnail} /> : null}
            {this.state.host ? <span><p><em>Hosted by: </em>{this.state.host.username}</p></span> : null}
          </div>
          <Divider/>
        {this.state.event.startTime ?
          this.state.mode === 'view' ?
            this.state.event.startTime === this.state.event.endTime ?
              this.state.event.startTime
            : `${this.state.event.startTime} - ${this.state.event.endTime}`
          : <TextField
              onChange={this.handleChange}
              type="text"
              name="changeStartTime"
              value={this.state.changeStartTime}
            />
        : 'Loading...'}
        {this.state.mode === 'edit' ? ' - ' : null}
        {this.state.mode === 'edit' ?
          <TextField
            onChange={this.handleChange}
            type="text"
            name="changeEndTime"
            value={this.state.changeEndTime}
          /> : null}
        <br/>
        {this.state.event.startMonth ?
          this.state.mode === 'view' ?
            this.state.event.startMonth === this.state.event.endMonth ?
              this.state.event.startMonth
            : `${this.state.event.startMonth} - ${this.state.event.endMonth}`
          : <TextField
              onChange={this.handleChange}
              type="text"
              name="changeStartMonth"
              value={this.state.changeStartMonth}
            />
        : null}
        {this.state.mode === 'edit' ? ' - ' : null}
        {this.state.mode === 'edit' ?
          <TextField
            onChange={this.handleChange}
            type="text"
            name="changeEndMonth"
            value={this.state.changeEndMonth}
          /> : null}
        <br/>
        {this.state.event.startDate ?
          this.state.mode === 'view' ?
            this.state.event.startDate === this.state.event.endDate ?
              this.state.event.startDate
            : `${this.state.event.startDate} - ${this.state.event.endDate}`
          : <TextField
              onChange={this.handleChange}
              type="text"
              name="changeStartDate"
              value={this.state.changeStartDate}
            />
        : null}
        {this.state.mode === 'edit' ? ' - ' : null}
        {this.state.mode === 'edit' ?
          <TextField
            onChange={this.handleChange}
            type="text"
            name="changeEndDate"
            value={this.state.changeEndDate}
          /> : null}
        <br/>
        {this.state.event.startYear ?
          this.state.mode === 'view' ?
            this.state.event.startYear === this.state.event.endYear ?
              this.state.event.startYear
            : `${this.state.event.startYear} - ${this.state.event.endYear}`
          : <TextField
              onChange={this.handleChange}
              type="text"
              name="changeStartYear"
              value={this.state.changeStartYear}
            />
        : null}
        {this.state.mode === 'edit' ? ' - ' : null}
        {this.state.mode === 'edit' ?
          <TextField
            onChange={this.handleChange}
            type="text"
            name="changeEndYear"
            value={this.state.changeEndYear}
          /> : null}
        </Paper>
        <br/>
        {
          this.state.role === 'host' ?
            this.state.mode === 'view' ?
              <div>
                <RaisedButton onClick={this.handleEdit}>Edit</RaisedButton>
                <ReactFilestack
                  apikey={filestack.API_KEY2}
                  buttonText="Update event thumbnail"
                  render={({ onPick }) => (
                    <RaisedButton
                      label="Update Event Thumbnail"
                      onClick={onPick}
                    />
                  )}
                  options={{
                    accept: 'image/*',
                    maxFiles: 1,
                    fromSources: ['local_file_system', 'imagesearch', 'url']
                  }}
                  onSuccess={this.handleThumbnailUpload}
                />
              </div>
            : <RaisedButton onClick={this.handleSave}>Save</RaisedButton>
          : this.state.role === 'pending' ?
            <div>
              <button onClick={() => this.handleResponse('going')}>Accept</button>
              <button onClick={() => this.handleResponse('maybe')}>Maybe</button>
              <button onClick={() => this.handleResponse('declined')}>Decline</button>
            </div>
          : this.state.role === 'declined' ?
            <div>
              Not Going
              <button onClick={() => this.handleResponse('going')}>Accept</button>
              <button onClick={() => this.handleResponse('maybe')}>Maybe</button>
            </div>
          : this.state.role === 'going' ?
            <div>
              Attending
              <button onClick={() => this.handleResponse('maybe')}>Maybe</button>
              <button onClick={() => this.handleResponse('declined')}>Decline</button>
            </div>
          : this.state.role === 'maybe' ?
            <div>
              Maybe
              <button onClick={() => this.handleResponse('going')}>Accept</button>
              <button onClick={() => this.handleResponse('declined')}>Decline</button>
            </div>
          :
            <div>Not Invited</div>
        }
        <br/>
        <strong>Attendants</strong>
        <AttendantsList attendants={this.state.attendants} history={this.props.history} uninvite={this.handleUninvite} /><br/>
        {this.state.role === 'host' ? <FriendsList history={this.props.history} invite={this.handleInvite} /> : null}
        <CreatePost
          generatePost={this.generatePost}
          role={this.state.role}
        /> <br />
        {this.state.posts.length ?
          <Posts
            role={this.state.role}
            history={this.props.history}
            posts={this.state.posts}
            user={this.state.user}
            event={this.state.event}
            config={this.state.config}
          />
        : null}
      </div>
    );
  }
}
