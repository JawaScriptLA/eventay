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
          <label>Please enter a username:</label>
          <input
            type="text"
            name="username"
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>Please enter a password:</label>
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
      </div>
    );
  }
}

// const Signup = () => (
//   <div>
//     Signup page
//     <form action="/auth/signup" method="post">
//       <div>
//         <label>Please enter a username:</label>
//         <input type="text" name="username" />
//       </div>
//       <div>
//         <label>Please enter a password:</label>
//         <input type="password" name="password" />
//       </div>
//       <div>
//         <input type="submit" value="Submit" />
//       </div>
//     </form>
//   </div>
// );

// export default Signup
