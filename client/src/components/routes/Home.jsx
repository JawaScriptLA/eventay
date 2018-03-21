import React from "react";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  handleLogoutClick() {
    axios
      .post("/api/auth/logout", {})
      .then(res => {
        localStorage.removeItem("token");
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogoutClick}>Logout!</button>
      </div>
    );
  }
}
