import React from "react";

export default class Protected extends React.Component {
  componentDidMount() {
    console.log("token:", localStorage.getItem("token"));

    // check if token is valid
    // if not, push to history!
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}
