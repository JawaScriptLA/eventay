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
        if (res.data === "success") {
          this.props.history.push("/");
        }
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
          <label>Please enter your username:</label>
          <input
            type="text"
            name="username"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Please enter your password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <input
            type="submit"
            value="submit"
            onClick={this.handleSubmitClick}
          />
        </div>
        <input type="submit" value="Sign up" onClick={this.handleSignupClick} />
      </div>
    );
  }
}

// const Login = () => (
// <div>
//   Login page
//   <form action="/auth/login" method="post">
//     <div>
//       <label>Username:</label>
//       <input type="text" name="username" />
//     </div>
//     <div>
//       <label>Password:</label>
//       <input type="password" name="password" />
//     </div>
//     <div>
//       <input type="submit" value="Log In" />
//     </div>
//   </form>
//   <form action="/auth/signup" method="get">
//     <input type="submit" value="Sign up" />
//   </form>
// </div>
// );

// export default Login;
