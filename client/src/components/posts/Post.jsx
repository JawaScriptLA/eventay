import React from 'react';
import { Avatar, Card, CardHeader, Paper, CardText, TextField, IconButton, Checkbox } from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import axios from 'axios';

class Post extends React.Component {
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
                >{post.userInfo.username}</div>}
              avatar={post.userInfo.profile_picture}
            />
            <CardText style={{ fontSize: 36 }}>
              {post.body}
            </CardText>
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

export default Post;
