import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { fetchPostScoreComments } from '../actions.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      measure: "",
      description: "",
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal(event) {
    event.preventDefault()

    this.props.fetchPostScoreComments(this.state.measure, this.state.description, this.props.selectedScore.id)
    this.setState({
      modalIsOpen: false,
      measure: "",
      description: "",
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Add Comment</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

        <h2 ref={subtitle => this.subtitle = subtitle}>Piece: {this.props.selectedScore.title}</h2>
        <form>
          <label htmlFor="measure">measure no:</label><br/>
          <input
            type="text"
            name="measure"
            value={this.state.measure}
            onChange={this.handleChange}
          /><br/>
            <label htmlFor="description">description:</label><br/>
            <textarea
              name="message"
              rows="10"
              cols="30"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              ></textarea><br/>
          </form>
          <button onClick={this.closeModal}>Add Comment</button>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedScore: state.selectedScore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostScoreComments: (comment_measure, comment_description, score_id) => dispatch(fetchPostScoreComments(comment_measure, comment_description, score_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
