import React from "react";

// const Home = () => (
//   <div>
//     Home page

//   </div>
// );

// export default Home;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  handleHomeClick() {
    this.props.history.push("/event");
  }

  render() {
    return (
      <div>
        <h1 onCh1ck={this.handleHomeClick}>Home</h1>
      </div>
    );
  }
}
