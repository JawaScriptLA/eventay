import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';

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
      this.state.searchEvents.forEach( (data, i) => {
        counter++;
        content.push(<li key={counter}>{data.title}</li>);
      });
    }
    if (this.state.searchFriends.length) {
      content.push(<h3 key='friends'>Friends</h3>);
      this.state.searchFriends.forEach( (data, i) => {
        counter++;
        content.push(<li key={counter}>{data.username}</li>);
      });
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
          title="Results"
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
