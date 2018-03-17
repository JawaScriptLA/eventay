import React from "react";

export default class Protected extends React.Component {
  componentDidMount() {
    console.log(localStorage.getItem("id"));
    if (!localStorage.getItem("id")) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}
