import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

const config = {
  headers: { Authorization: 'bearer ' }
};
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchFriends: [],
      searchEvents: [],
      open: false,
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSearchInput(e) {
    this.setState({ query: e });
  }
  componentWillMount() {
    config.headers.Authorization += localStorage.token;
  }
  handleSearchRequest() {
    axios
      .get(`/api/search/${this.props.userInfo.id}/${this.state.query}`, config)
      .then(result => {
        var obj = {};
        this.setState({
          searchFriends: result.data.friends,
          searchEvents: result.data.events,
          open: true,
        });
      })
      .catch(err => {
        console.log(`OOPS LOOKS LIKE SEARCH FAILED: ${err}`);
      });
  }
  handleClose () {
    this.setState({open: false});
  }
  renderSearchResults () {
    let content = [];
    let counter = 0;
    if ( !(this.state.searchEvents.length) && !(this.state.searchFriends.length) ) {
      return (<p>Sorry, no search results found.</p>)
    }
    if (this.state.searchEvents.length) {
      content.push(<h3 key='events'>Events</h3>);
      content.push(
        <List key='events-list'>
          {
            this.state.searchEvents.map( (data, i) => {
              counter++;
              return (
                <ListItem
                  key={counter}
                  disabled={true}
                  leftAvatar={
                    <Avatar src={data.thumbnail} />
                  }
                >
                <span
                  onClick={() => this.props.history.push({
                    pathname: `/event/${data.id}`,
                    state: {event: data},
                  })}
                >
                  {data.title}
                </span>
                </ListItem>
              );
            })
          }
        </List>
      )

    }
    if (this.state.searchFriends.length) {
      content.push(<h3 key='friends'>Friends</h3>);
      content.push(
        <List key='friends-list'>
          {
            this.state.searchFriends.map( (data, i) => {
              counter++;
              return (
                <ListItem
                  key={counter}
                  disabled={true}
                  leftAvatar={
                    <Avatar src={data.profile_picture} />
                  }
                >
                  <span
                    onClick={
                      () => this.props.history.push(`/profile/${data.username}`)
                    }
                  >
                    {data.username}
                  </span>
                </ListItem>
              )
            })
          }
        </List>
      )
    }
    return content;
  }
  render() {
    return (
      <div
        style={{
          float: 'none',
          maxWidth: 800,
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto'
        }}
      >
        <SearchBar
          onChange={e => this.handleSearchInput(e)}
          onRequestSearch={this.handleSearchRequest}
        />
        <Dialog
          title='Results'
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        {this.renderSearchResults()}
        </Dialog>
      </div>
    );
  }
}
