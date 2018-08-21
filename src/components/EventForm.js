import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TimeField from 'react-simple-timefield';
import { fetchPostEvent, fetchPatchEvent } from '../actions.js';
import Modal from 'react-modal';
import '../lib/events.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

class EventForm extends Component {
  constructor() {
    super();

    this.state = {
      odalIsOpen: false,
      event_id: "",
      event_title: "",
      description: "",
      event_date: "",
      start_time: "",
      end_time: "",
      user_id: "",
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
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

  closeModal(event) {
    event.preventDefault()
    if (!this.state.event_id) {
      this.props.fetchPostEvent(this.state);
    } else {
      this.props.fetchPatchEvent(this.state);
      this.props.history.push('/myschedule')
    }
    this.setState({
      modalIsOpen: false,
      event_id: "",
      event_title: "",
      description: "",
      event_date: "",
      start_time: "",
      end_time: "",
      user_id: "",
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      event_date: this.props.selectedDate,
      user_id: this.props.userId,
    })
  }

  renderDate = () => {
    return <h4>{moment(this.props.selectedDate).format("MMMM, Do, YYYY")}</h4>
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
      <div className="event-form-div">
        <button id="new-event-button" onClick={this.openModal}><i class="material-icons">event</i>New Event</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <form className="event-form" onSubmit={this.handleSubmit}>
            {this.renderDate()}
            <label htmlFor="event_title"></label>
            <select
              id="event_title"
              name="event_title"
              value={this.state.event_title}
              onChange={this.handleChange}
            >
              <option>choose</option>
              <option>Performance</option>
              <option>Audition</option>
              <option>Rehearsal</option>
              <option>Practice</option>
              <option>Other</option>
            </select><br/>
          <div className="input-times">
          <label htmlFor="start-time">From:</label>
          <TimeField
            className="input-time"
            value={this.state.start_time}
            onChange={this.handleStartTimeChange}
            />
          <label htmlFor="end-time">To:</label>
          <TimeField
            className="input-time"
            value={this.state.end_time}
            onChange={this.handleEndTimeChange}
            />
        </div>
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
          </form>
          <button id="add-comment-button" onClick={this.closeModal}>Add Event</button>
        </Modal>
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
