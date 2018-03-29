import React from 'react';
import { Avatar } from 'material-ui';
import axios from 'axios';

class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      postOwner = {},
    }
  }

  componentWillMount() {
    axios.get(`/api/user/id`)
  }
}

export default Post;
