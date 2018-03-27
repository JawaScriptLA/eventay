import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';

const config = {
  headers: { Authorization: 'bearer ' + localStorage.token }
};

export default class Search extends Component {
  constructor (props) {
    super (props);
    this.state = {
      query: '',
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
  }

  handleSearchInput (e) {
    this.setState( { query: e } );
  }

  handleSearchRequest () {
    axios.get(`/api/search/${this.props.userInfo.id}/${this.state.query}`, config)
      .then(result => {
        console.log(`HEY OUR SEARCH WAS SUCCESSFUL! ${JSON.stringify(result.data)}`);
      })
      .catch(err => {
        console.log(`OOPS LOOKS LIKE SEARCH FAILED: ${err}`);
      });
  }

  render () {
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
      </div>
    );
  }
}
