import React from "react";
import axios from "axios";

export default class Login extends React.Component {
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
        localStorage.setItem("token", res.data);
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
