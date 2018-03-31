import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { RaisedButton } from 'material-ui';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
    }
    this.handlePost = this.handlePost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  handlePost(e) {
    this.props.generatePost(this.state.postText);
    this.setState({ postText: '' });
  }

  render() {

    return (
      <Paper
        style={{ width: '50%', overflow: 'scroll', padding:'10px'}}
        zDepth={1}
        children={
          <div>
            <TextField
              rows={1}
              rowsMax={4}
              hintText='Say something...'
              name='postText'
              fullWidth={true}
              value={this.state.postText}
              multiLine={true}
              onChange={this.handleInputChange}
            />
            <RaisedButton
              disabled={!!!this.state.postText.replace(/\s/g,'')} // handles when user spams only whitespace
              label='Post'
              primary={true}
              onClick={this.handlePost}
            />
          </div>
        }
      />
    );
  }
}

export default CreatePost;