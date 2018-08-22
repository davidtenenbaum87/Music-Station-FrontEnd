import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import moment from 'moment';
import { removeEventFromUserEvents } from '../actions.js';

class Event extends Component {

  handleClick = () => {
    fetch(`http://localhost:3000/api/v1/events/${this.props.user_event.id}`, {
      method: 'DELETE',
    })
    this.props.removeEventFromUserEvents(parseInt(this.props.user_event.id))
  }

  render() {
    if (this.props.user_event.event_title === 'Audition') {
      return (
        <div className="event-item audition">

          <h2>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h2>
          <h1>{this.props.user_event.event_title}</h1>
          <p>{this.props.user_event.description}</p>
          <h2>{this.props.user_event.start_time} - {this.props.user_event.end_time}</h2>
          <div className="event-edit-delete-buttons">
            <NavLink to={`/events/${this.props.user_event.id}/edit`} id="edit-button"> <i class="material-icons">edit</i></NavLink>
            <a onClick={this.handleClick} value="edit" id="delete-button">  <i class="material-icons">delete_forever</i>

            </a>
          </div>
        </div>
      )
    } else if (this.props.user_event.event_title === 'Performance') {
      return (
        <div className="event-item performance">

          <h2>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h2>
          <h1>{this.props.user_event.event_title}</h1>
          <p>{this.props.user_event.description}</p>
          <h2>{this.props.user_event.start_time} - {this.props.user_event.end_time}</h2>
          <div className="event-edit-delete-buttons">
            <NavLink to={`/events/${this.props.user_event.id}/edit`} id="edit-button"> <i class="material-icons">edit</i></NavLink>
            <a onClick={this.handleClick} value="edit" id="delete-button">  <i class="material-icons">delete_forever</i>

            </a>
          </div>
        </div>
      )
    } else if (this.props.user_event.event_title === 'Practice') {
      return (
        <div className="event-item practice">

          <h2>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h2>
          <h1>{this.props.user_event.event_title}</h1>
          <p>{this.props.user_event.description}</p>
          <h2>{this.props.user_event.start_time} - {this.props.user_event.end_time}</h2>
          <div className="event-edit-delete-buttons">
            <NavLink to={`/events/${this.props.user_event.id}/edit`} id="edit-button"> <i class="material-icons">edit</i></NavLink>
            <a onClick={this.handleClick} value="edit" id="delete-button">  <i class="material-icons">delete_forever</i>

            </a>
          </div>
        </div>
      )
    } else if (this.props.user_event.event_title === 'Rehearsal') {
      return (
        <div className="event-item rehearsal">

          <h2>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h2>
          <h1>{this.props.user_event.event_title}</h1>
          <p>{this.props.user_event.description}</p>
          <h2>{this.props.user_event.start_time} - {this.props.user_event.end_time}</h2>
          <div className="event-edit-delete-buttons">
            <NavLink to={`/events/${this.props.user_event.id}/edit`} id="edit-button"> <i class="material-icons">edit</i></NavLink>
            <a onClick={this.handleClick} value="edit" id="delete-button">  <i class="material-icons">delete_forever</i>

            </a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="event-item other">

          <h2>{moment(this.props.user_event.event_date).format("MMMM, Do, YYYY")}</h2>
          <h1>{this.props.user_event.event_title}</h1>
          <p>{this.props.user_event.description}</p>
          <h2>{this.props.user_event.start_time} - {this.props.user_event.end_time}</h2>
          <div className="event-edit-delete-buttons">
            <NavLink to={`/events/${this.props.user_event.id}/edit`} id="edit-button"> <i class="material-icons">edit</i></NavLink>
            <a onClick={this.handleClick} value="edit" id="delete-button">  <i class="material-icons">delete_forever</i>

            </a>
          </div>
        </div>
      )
    }
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
