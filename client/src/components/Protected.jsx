import React from "react";

export default class Protected extends React.Component {
  componentDidMount() {
    console.log(localStorage.getItem("id"));
    if (!localStorage.getItem("id")) {
      this.props.history.push("/login");
    }
  }
  //   try {
  //     const { exp } = await jwtDecode(localStorage.token);
  //     if (exp < Math.floor(Date.now() / 1000)) {
  //       this.props.history.push("/login");
  //     }
  //   } catch (e) {
  //     console.log("error in Protected ", e);
  //     this.props.history.push("/login");
  //   }
  // }

  // componentDidMount() {
  //   console.log("session id: ", localStorage.getItem("id"));
  //     if(!localStorage.getItem('id') {
  //     }
  // }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}
