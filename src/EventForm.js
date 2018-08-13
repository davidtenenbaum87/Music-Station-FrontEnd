import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleEventTitleChange, handleEventDescriptionChange, handleEventDateChange, handleEventStartTimeChange, handleEventEndTimeChange } from './actions.js';

class EventForm extends Component {

  handleSubmit = (event) => {
    // event.preventDefault()
    this.props.handleEventDateChange(this.props.selectedDate)
    fetch("http://localhost:3000/api/v1/events", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_title: this.props.event_title,
        description: this.props.event_description,
        event_date: this.props.selectedDate,
        start_time: this.props.event_start_time,
        end_time: this.props.event_end_time,
        user_id: this.props.userId,
      })
    })
      .then(res => res.json())
      .then(console.log)
  }

  render() {
    console.log(this.props);
    return (
      <div className="event-form">
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="type">type:</label>
            <select
              id="type"
              name="type"
              value={this.props.event_title}
              onChange={this.props.handleEventTitleChange}
            >
              <option></option>
              <option>Performance</option>
              <option>Rehearsal</option>
              <option>Practice</option>
            </select><br/>
            <label htmlFor="description">description:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="description"
              rows="4"
              cols="50"
              value={this.props.event_description}
              onChange={this.props.handleEventDescriptionChange}
              /><br/>
            <label htmlFor="start-time">start:</label>
            <input
              type="time"
              id="start-time"
              name="start-time"
              required
              value={this.props.event_start_time}
              onChange={this.props.handleEventStartTimeChange}
            /><br/>
            <label htmlFor="end-time">end:</label>
            <input
              type="time"
              id="end-time"
              name="end-time"
              required
              value={this.props.event_end_time}
              onChange={this.props.handleEventEndTimeChange}
            /><br/>
          <input type="submit" value="add"/>
          </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDate: state.selectedDate,
    event_title: state.event_title,
    event_description: state.event_description,
    event_date: state.event_date,
    event_start_time: state.event_start_time,
    event_end_time: state.event_end_time,
    userId: state.userId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleEventTitleChange: (event) => dispatch(handleEventTitleChange(event.target.value)),
    handleEventDescriptionChange: (event) => dispatch(handleEventDescriptionChange(event.target.value)),
    handleEventDateChange: (date) => dispatch(handleEventDateChange(date)),
    handleEventStartTimeChange: (event) => dispatch(handleEventStartTimeChange(event.target.value)),
    handleEventEndTimeChange: (event) => dispatch(handleEventEndTimeChange(event.target.value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
