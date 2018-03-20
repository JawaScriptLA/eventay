import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import PropTypes from 'prop-types';
import React from 'react';

class Test extends React.Component {
  componentWillMount () {
    this.props.eventActions.fetchEvent();
  }

  renderData(item) {
    return <div key={item.id}>{item.title}</div>;
  } 

  render() {
    if (!this.props.event) {
      return <div>loading...</div>
    } else {
      return (
        <div>
          {
            this.props.event.map((item, index) => {
              return (
                this.renderData(item)
              );
            })
          }
        </div>
      )
    }
  }
}

Test.propTypes = {
  eventActions: PropTypes.object,
  event: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    event: state.event
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
