import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Event extends Component {


  render() {
    console.log(this.props.user_event);
    return (
      <div className="event-item">
        <h5>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h5>
        <p>{this.props.user_event.event_title}</p>
        <p>{this.props.user_event.description}</p>
        <p>{this.props.user_event.start_time} - {this.props.user_event.end_time}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    current_user_events: state.current_user_events,
  }
}

export default connect(mapStateToProps)(Event);
