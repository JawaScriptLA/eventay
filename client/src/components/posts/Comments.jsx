import React from 'react';
import { Avatar, List, ListItem, Divider } from 'material-ui'; 

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <List>
        <ListItem
          disabled={true}
          leftAvatar={<Avatar
            src="https://canna-pet.com/wp-content/uploads/2017/12/dog-1232449_1920-e1513038111900.jpg"
            style={{ objectFit: 'cover'}}
          />}
        >
        <span><strong>username: </strong></span>
        <p style={{ height: '8em', overflow: 'scroll', }}>
          This is a really, really long comment that kinda goes on forever but as you keep
          reading it, you realise that there doesn't seem to be any actual content so you're just sitting there
          like an idiot for wasting your time reading this and I feel like a moron sitting here
          at four in the morning writing this stupid stub just so I can see how long comments get
          rendered on the page. Help me.
        </p>
        </ListItem>
        <Divider />
        <ListItem
          disabled={true}
          leftAvatar={<Avatar
            src="https://canna-pet.com/wp-content/uploads/2017/12/dog-1232449_1920-e1513038111900.jpg"
            style={{ objectFit: 'cover'}}
          />}
        >
        <span><strong>username: </strong></span>
        <p style={{ maxHeight: '8em', overflow: 'scroll', }}>
          This is a shorter comment
        </p>
        </ListItem>
        <Divider />
      </List>
    )
  }
}

export default Comment;