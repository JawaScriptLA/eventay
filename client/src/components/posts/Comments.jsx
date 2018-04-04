import React from 'react';
import { Avatar, List, ListItem, Divider, TextField } from 'material-ui';
import axios from 'axios';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTextComment: '',
      comments: this.props.comments,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handlePostComment(e) {
    if (e.key === 'Enter' && !!this.state.inputTextComment.replace(/\s/g,'')) {
      let bodyToSend = this.state.inputTextComment.replace("'", "''");
      axios.post(`/api/post`, {
        body: bodyToSend,
        user_id: this.props.user.id,
        event_id: this.props.event.id,
        parent_id: this.props.postId,
      }, this.props.config)
        .then(res => {
          const updatedCommentsList = this.state.comments;
          axios.get(`/api/user/id/${res.data[0].user_id}`, this.props.config)
            .then(({ data }) => {
              const temp = res.data[0];
              temp.userInfo = data;
              updatedCommentsList.push(temp);
              this.setState({ comments: updatedCommentsList });
            });
        });
      this.setState({ inputTextComment: '' });
    }
  }

  renderComments(commentList) {
    return commentList.map(comment => {
      return(
        <ListItem
          key={comment.id}
          disabled={true}
          leftAvatar={<Avatar
            src={comment.userInfo.profile_picture}
            style={{ objectFit: 'cover'}}
          />}
        >
          <span
            onClick={() => this.props.history.push(`/profile/${comment.userInfo.username}`)}
          ><strong>{comment.userInfo.username}: </strong></span>
          <p style={{ maxHeight: '8em', overflow: 'scroll', }}>
            {comment.body}
          </p>
        </ListItem>
      )
    })
  }

  render() {
    return(
      <List>
        {this.renderComments(this.state.comments)}
        <TextField
          name="inputTextComment"
          value={this.state.inputTextComment}
          onChange={this.handleInputChange}
          onKeyDown={this.handlePostComment}
          hintText="Respond..."
        />
      </List>
    )
  }
}

export default Comment;