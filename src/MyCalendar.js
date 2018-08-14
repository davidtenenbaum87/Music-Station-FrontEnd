import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { selectedClickedDate } from './actions.js';
import EventForm from './EventForm.js';
import EventsList from './EventsList.js';
import moment from 'moment';

class MyCalendar extends Component {

  render() {

    return (
      <div className="calendar">
        <h1>My Events</h1>
        <DayPicker
          onDayClick={(day) => this.props.selectedClickedDate(day)}
        />
        <EventForm />
        <EventsList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_user_events: state.current_user_events,
    selectedDate: state.selectedDate,
    eventFormOn: state.eventFormOn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectedClickedDate: (date) => dispatch(selectedClickedDate(date)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);
