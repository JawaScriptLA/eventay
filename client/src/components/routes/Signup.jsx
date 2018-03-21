import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActions from '../../actions/userInfoActions';
import PropTypes from 'prop-types';

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
      .catch(error => {
        console.log(error);
      });
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        Signup page
        <div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <input
            type='submit'
            value='Submit'
            onClick={this.handleSubmitClick}
          />
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
