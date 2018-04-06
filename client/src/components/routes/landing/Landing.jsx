import React, { Component } from 'react';
// import '../../../../public/reset.css';
import styles from './landing.css';

import img_profile from '../../../assets/profile.png';
import create1 from '../../../assets/create1.png';
import notifs from '../../../assets/notifs.png';

export default class Landing extends Component {
  constructor (props) {
    super (props);
  }
  carousel (imgArr) {
    return imgArr[0];
  }
  render () {
    return (
      <div id='page'>

        <nav id='nav-top'>
          <div className='nav about'>
            <a
              href="/about"
              style={{
                textDecoration: 'none',
                color: 'black', paddingRight: '7%'
              }}
            >About</a>
          </div>
          <div className='nav logo'>Eventé</div>
          <div className='nav login'>
            <div id='buttons'>
              <a className="auth signup"
                href="/signup"
                style={{textDecoration: 'none', color: 'black', paddingRight: '7%'}}
                >Signup</a>
              <a className='auth log' href="/login"
                style={{textDecoration: 'none', color: 'black'}}
              >Login</a>
            </div>
          </div>
        </nav>

        <div id='levels'>

          <div id='profile-image'>
            <img src={img_profile} />
          </div>

          <div id="profile-description">
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


          <div id="event-description">
            <p>
              Eventé makes it easy to schedule events with friends and coworkers. 
              Simply create an event, select who you want to invite, and Eventé's 
              deep logic algorithms will only recommend times you are all available to meet.
            </p>
          </div>

          <div id="event-image">
            <img src={this.carousel([create1])} />
          </div>

          <div id="notifs-image">
            <img src={this.carousel([notifs])} />
          </div>

          <div id="notifs-content">
            <p>
              Always be in the loop of when your friends and coworkers are meeting. 
              Never miss an update. You are instantly notified when someone's invited 
              you to a new event, or sent you a friend request.
            </p>
            <p>
              You can also search your events, events you've been invited to, public 
              events local and worldwide, as well as public profiles.
            </p>
          </div>

        </div>

      </div>


    );
  }
}
