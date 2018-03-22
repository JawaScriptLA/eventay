import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActions from '../../actions/userInfoActions';
import PropTypes from 'prop-types';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitClick() {
    axios
      .post("/api/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        // store res.data.userInfo into application state
        this.props.userInfoActions.receiveUserInfo(res.data.userInfo);

        // store res.data.token to local storage
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSignupClick() {
    this.props.history.push("/signup");
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        Login page
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            onClick={this.handleSubmitClick}
          />
        </div>
        <input
          type="submit"
          value="Create new account"
          onClick={this.handleSignupClick}
        />
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
)(Login);
