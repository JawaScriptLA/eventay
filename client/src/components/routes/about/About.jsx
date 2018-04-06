import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';

import './about.css';

import will from '../../../assets/will.jpg';
import tony from '../../../assets/tony.jpg';
import alex from '../../../assets/alex.jpg';
import jason from '../../../assets/jason.jpg';
import github from '../../../assets/GitHub.png';

export default class About extends Component {
  render () {
    return (
      <div id="page">

        <nav id="nav-top">
          <div className='nav home'>
            <a
              href="/landing"
              style={{
                textDecoration: 'none',
                color: 'black', paddingRight: '7%'
              }}
            >Home</a>
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


        <div id="levels">

          <div id="will" className="dev">
            <Avatar
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={will} size={230} />
            <p className="dev-name" >Will Ruiz</p>
            <a
              href="https://github.com/waruiz"
            ><img className="content" src={github} /></a>
            <p className="content">
              I enjoy the intellectual challenges of Software Engineering and the rewarding feeling of creating something that can touch millions of users' lives.
            </p>
          </div>
          
          <div id="tony" className="dev">
            <Avatar
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={tony} size={230} />
            <p className="dev-name" >Tony Castro</p>
            <a
              href="https://github.com/toncas"
            ><img className="content" src={github} /></a>
            <p className="content">
              I deeply enjoy the spirit of collaboration and thrive within a team of exceptional developers.
            </p>
          </div>

          <div id ="alex" className="dev">
            <Avatar
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={alex} size={230} />
            <p className="dev-name" >Alex Monirji</p>
            <a
              href="https://github.com/alexmonirji"
            ><img className="content" src={github} /></a>
            <p className="content">
              Creating things brings me joy I cannot explain with words.
            </p>
          </div>

          <div id="jason" className="dev">
            <Avatar
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={jason} size={230} />
            <p className="dev-name" >Jason Sato</p>
            <a
              href="https://github.com/hirosato223"
            ><img className="content" src={github} /></a>
            <p className="content">
              I love taking on new challenges, learning new technologies, and empowering others to succeed.
            </p>
          </div>

        </div>

      </div>
    );
  }
}