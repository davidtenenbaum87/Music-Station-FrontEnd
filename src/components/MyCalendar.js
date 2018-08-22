import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-day-picker/lib/style.css';
import { selectedClickedDate, fetchGetEvents } from '../actions.js';
import EventForm from '../components/EventForm.js';
import EventsList from '../components/EventsList.js';
import '../lib/calendar.css'

class MyCalendar extends Component {

  componentDidMount() {
    this.props.fetchGetEvents(this.props.userId)
  }

  render() {
    return (
      <div className="calendar-container">
        <h1>My Events</h1>
        <EventForm />
        <EventsList />
      </div>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);

// export default connect()(MyCalendar);
