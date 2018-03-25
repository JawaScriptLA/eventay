import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

export default class NavMenu extends Component {
  constructor (props) {
    super (props);
    this.state = {

    }
  }
  render () {
    return (
      <div>
          <Menu>
            <MenuItem primaryText="Create Event" onClick={e => console.log(e.target.innerText)} />
            <MenuItem primaryText="Profile" onClick={e => console.log(e.target.innerText)} />
            <MenuItem primaryText="Log Out" onClick={e => console.log(e.target.innerText)} />
          </Menu>
      </div>
    );
  }
}
