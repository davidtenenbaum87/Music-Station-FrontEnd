import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import { selectedClickedDate, displayEventForm } from './actions.js';
import EventForm from './EventForm.js';
import EventsList from './EventsList.js';
import moment from 'moment'

class MyCalendar extends Component {

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className="calendar">
        <Calendar
          onChange={this.onChange}
          value={this.props.selectedDate}
          onClickDay={(date) => {this.props.selectedClickedDate(date); this.props.displayEventForm()}}
        />
        {
          this.props.eventFormOn ?
            <EventForm />
          :
            null
        }
        <EventsList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDate: state.selectedDate,
    eventFormOn: state.eventFormOn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectedClickedDate: (date) => dispatch(selectedClickedDate(date)),
    displayEventForm: () => dispatch(displayEventForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar);
