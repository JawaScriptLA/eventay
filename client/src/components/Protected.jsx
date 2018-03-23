import React from 'react';
import jwt from 'jsonwebtoken';

export default class Protected extends React.Component {
  componentWillMount() {
    try {
      console.log('currently my token is:', localStorage.getItem('token'));
      if (!localStorage.getItem('token')) {
        this.props.history.push('/login');
      }
    } catch (e) {
      console.log('Error in Protected component', e);
      this.props.history.push('/login');
    }
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}
