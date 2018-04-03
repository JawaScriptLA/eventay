import React, { Component } from 'react';
import styles from './landing.css';

export default class Landing extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    return (
      <div id='page'>
        <nav id='nav-top'>
          <div className='nav about'>About</div>
          <div className='nav logo'>Eventé</div>
          <div className='nav login'>
            <a className="signup"
              href="/signup"
              style={{textDecoration: 'none', color: 'black', paddingRight: '7%'}}
              >Signup</a>
            <a href="/login"
              style={{textDecoration: 'none', color: 'black'}}
            >Login</a>
          </div>
        </nav>
        <div id='main'>
          <div id='img-carousel'>
            <img src='http://genhq.com/wp-content/uploads/2015/05/3-things-you-probably-dont-know-about-marketing-and-selling-to-Millennials.jpg' />
          </div>
          <div id='content'>
            <p>
              Eventé makes it easy and fun to schedule times to meet others.
            </p>
            <p>
              Scheduling a fun brunch or evening with friends should be about
              the experiences you create and memories you share - it should not
              be about asking everyone, rescheduling, and some of your friends
              missing out due to scheduling conflicts.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
