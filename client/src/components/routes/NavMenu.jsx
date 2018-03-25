import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { Menu, MenuItem } from 'material-ui/Menu';

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
            <Divider />
            <MenuItem primaryText="Log Out" onClick={e => console.log(e.target.innerText)} />
          </Menu>
      </div>
    );
  }
}
