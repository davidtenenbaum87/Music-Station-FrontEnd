import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event.js';

class EventsList extends Component {

  displayEvents = () => {
    if (this.props.current_user_events) {
      return this.props.current_user_events.map(user_event => {
        return <Event user_event={user_event} key={user_event.id}/>
      })
    }
  }

  render() {
    console.log('eventlist', this.props.current_user_events);
    return (
      <div className="events-list">
        {this.displayEvents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    current_user_events: state.current_user_events,
  }
}


export default connect(mapStateToProps)(EventsList);
