import React from "react";

import axios from "axios";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitClick() {
    axios
      .post("/api/auth/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.data === "success") {
          localStorage.setItem("id", "signupStorage");
          this.props.history.push("/");
        }
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
      </div>
    );
  }
}
