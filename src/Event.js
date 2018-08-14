import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import { removeEventFromUserEvents } from './actions.js';

class Event extends Component {

  handleClick = () => {
    fetch(`http://localhost:3000/api/v1/events/${this.props.user_event.id}`, {
      method: 'DELETE',
    })
    this.props.removeEventFromUserEvents(parseInt(this.props.user_event.id))
  }

  render() {
    return (
      <div className="event-item">
        <h5>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h5>
        <p>{this.props.user_event.event_title}</p>
        <p>{this.props.user_event.description}</p>
        <p>{this.props.user_event.start_time} - {this.props.user_event.end_time}</p>
        <NavLink to={`/events/${this.props.user_event.id}/edit`}>Edit</NavLink>
        <a onClick={this.handleClick} value="edit">Delete</a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    current_user_events: state.current_user_events,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeEventFromUserEvents: (eventId) => dispatch(removeEventFromUserEvents(eventId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
