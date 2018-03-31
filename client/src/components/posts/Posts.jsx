import React from 'react';
import { Avatar, Card, CardHeader, Paper, CardText, TextField, IconButton, Checkbox, Divider } from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Comments from './Comments.jsx'
import axios from 'axios';

class Posts extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      commentTextInput: ''
    }

    this.renderPosts = this.renderPosts.bind(this);
  }

  renderPosts(postList) {
    return (
      postList.reverse().map((post) => {
        return (
          <Card key={post.post.id} style={{ padding: '10px', margin: '10px' }}>
            <CardHeader
              title={<div
                  onClick={() => this.props.history.push(`/profile/${post.post.userInfo.username}`)}
                ><strong>{post.post.userInfo.username}</strong></div>}
              avatar={post.post.userInfo.profile_picture}
            />
            <CardText style={{ fontSize: '200%', padding: '4px', }}>
              {post.post.body}
            </CardText>
            <Divider />
            <Comments
              postId={post.post.id}
              comments={post.comments}
              posts={this.state.posts}
              user={this.props.user}
              event={this.props.event}
              config={this.props.config}
            />
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
