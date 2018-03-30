import React from 'react';
import { Avatar, List, ListItem, Divider } from 'material-ui'; 

class Comment extends React.Component {
  constructor(props) {
    super(props);
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
          <span><strong>{comment.userInfo.username}: </strong></span>
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
        {this.renderComments(this.props.comments)}
      </List>
    )
  }
}

export default Comment;