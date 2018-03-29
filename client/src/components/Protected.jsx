import React from 'react';
import jwt from 'jsonwebtoken';

export default class Protected extends React.Component {
  componentWillMount() {
    try {
      if (!localStorage.getItem('token')) {
        this.props.history.push('/login');
      }
    } catch (e) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { component: Component } = this.props;
    return localStorage.getItem('token') ? <Component {...this.props} /> : <div></div>;
  }
}
