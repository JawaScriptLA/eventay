import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActions from '../../actions/userInfoActions';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitClick() {
    axios
      .post('/api/auth/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        // store res.data.userInfo into application state
        this.props.userInfoActions.receiveUserInfo(res.data.userInfo);
        localStorage.setItem('token', res.data.token);

        // janky solution to persisting user info upon refresh. Find a better way
        localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));

        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        <div
          style={{
            float: 'none',
            maxWidth: '40%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
        <Paper
          style={{
            height: '100%',
            width: '100%',
            padding: '15%',
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
          }}
          zDepth={3}
        >
        <h1 style={{
          fontFamily: 'Stalemate, cursive',
          fontSize: '4em'
          }}
        >Eventé Signup</h1>

        <br />

        <TextField
          type="text"
          inputStyle={{WebkitBoxShadow: '0 0 0 1000px white inset'}}
          name="username"
          floatingLabelText="username"
          onChange={this.handleInputChange}
        />

        <br />

        <TextField
          type="password"
          inputStyle={{WebkitBoxShadow: '0 0 0 1000px white inset'}}
          name="password"
          floatingLabelText="password"
          onChange={this.handleInputChange}
        />

        <br />

        <RaisedButton
          label="Submit"
          secondary={true}
          style={{margin: 12}}
          onClick={this.handleSubmitClick}
        />

        </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userInfoActions: bindActionCreators(userInfoActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
