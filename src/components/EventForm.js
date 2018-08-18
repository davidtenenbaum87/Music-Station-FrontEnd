import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TimeField from 'react-simple-timefield';
import { fetchPostEvent, fetchPatchEvent } from '../actions.js';

class EventForm extends Component {

  state = {
    event_id: "",
    event_title: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    user_id: "",
  }

  componentDidMount() {
    if (this.props.foundEvent) {
      this.setState({
        event_id: this.props.foundEvent.id,
        event_title: this.props.foundEvent.event_title,
        description: this.props.foundEvent.description,
        event_date: this.props.foundEvent.event_date,
        start_time: this.props.foundEvent.start_time,
        end_time: this.props.foundEvent.end_time,
        user_id: this.props.userId,
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.event_id) {
      this.props.fetchPostEvent(this.state);
    } else {
      this.props.fetchPatchEvent(this.state);
      this.props.history.push('/myschedule')
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      event_date: this.props.selectedDate,
      user_id: this.props.userId,
    })
  }

  renderDate = () => {
    return <h4>when?: {moment(this.props.selectedDate).format("MMMM, Do, YYYY")}</h4>
  }

  handleStartTimeChange = (start_time) => {
    this.setState({
      start_time
    })
  }

  handleEndTimeChange = (end_time) => {
    this.setState({
      end_time
    })
  }



  render() {
    return (
      <div className="event-form">
        <form onSubmit={this.handleSubmit}>
            {this.renderDate()}
            <label htmlFor="event_title">type:</label>
            <select
              id="event_title"
              name="event_title"
              value={this.state.event_title}
              onChange={this.handleChange}
            >
              <option></option>
              <option>Performance</option>
              <option>Audition</option>
              <option>Rehearsal</option>
              <option>Practice</option>
            </select><br/>
          <label htmlFor="start-time">From:</label>
          <TimeField
            value={this.state.start_time}
            onChange={this.handleStartTimeChange} />
          <label htmlFor="end-time">From:</label>
          <TimeField
            value={this.state.end_time}
            onChange={this.handleEndTimeChange} />
          <label htmlFor="description">description:</label><br/>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="description"
            rows="4"
            cols="50"
            value={this.state.description}
            onChange={this.handleChange}
            /><br/>
          <input type="submit" value="submit"/>
          </form>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userId: state.userId,
    selectedDate: state.selectedDate,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostEvent: (new_event) => dispatch(fetchPostEvent(new_event)),
    fetchPatchEvent: (current_event) => dispatch(fetchPatchEvent(current_event)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
