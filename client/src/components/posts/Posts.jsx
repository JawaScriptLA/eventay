import React from 'react';
import { Avatar, Card, CardHeader, Paper, CardText, TextField, IconButton, Checkbox, Divider } from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Comments from './Comments.jsx'
import axios from 'axios';

class Posts extends React.Component {
  constructor(props){
    super(props);

    this.renderPosts = this.renderPosts.bind(this);
  }

  renderPosts(postList) {
    return (
      postList.reverse().map((post) => {
        return (
          <Card key={post.id} style={{ padding: '10px', margin: '10px' }}>
            <CardHeader
              title={<div
                  onClick={() => this.props.history.push(`/profile/${post.userInfo.username}`)}
                ><strong>{post.userInfo.username}</strong></div>}
              avatar={post.userInfo.profile_picture}
            />
            <CardText style={{ fontSize: '200%', padding: '4px', }}>
              {post.body}
            </CardText>
            <Divider />
            <Comments />
            <TextField hintText="Respond..." />
          </Card>
        )
      })
    )
  }

  render() {
    return(
      <Paper style={{ width: '50%', padding: '1px', }}>
        {this.renderPosts(this.props.posts)}
      </Paper>
    )
  }
}

export default Posts;
