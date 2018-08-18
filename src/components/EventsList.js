import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from './Event.js';
import { fetchGetEvents } from '../actions.js';


class EventsList extends Component {
  componentDidMount() {
    this.props.fetchGetEvents(this.props.userId)
  }

  displayEvents = () => {
    if (this.props.current_user_events) {
      return this.props.current_user_events.map(user_event => {
        return <Event user_event={user_event} key={user_event.id}/>
      })
    }
  }

  render() {
    return (
      <div className="events-list">
        {this.displayEvents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    current_user_events: state.current_user_events,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchGetEvents: (userId) => dispatch(fetchGetEvents(userId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
