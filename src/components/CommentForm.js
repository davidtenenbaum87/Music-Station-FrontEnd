import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { fetchPostScoreComments } from '../actions.js';
import '../lib/comments.css'

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

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      page: "",
      measure: "",
      description: "",
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal(event) {
    event.preventDefault()
    let comment = {
      page: this.state.page,
      measure: this.state.measure,
      description: this.state.description,
      score_id: this.props.selectedScore.id
    }

    this.props.fetchPostScoreComments(comment)
    this.setState({
      modalIsOpen: false,
      page: "",
      measure: "",
      description: "",
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div className="comments-form-div">
        <button id="new-comment-button" onClick={this.openModal}><i class="material-icons">note_add</i>New Comment</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

        <form className="comments-form">
          <h2>{this.props.selectedScore.title} / {this.props.selectedScore.composer}</h2>
          <label htmlFor="page">Page #:</label><br/>
          <input
            type="number"
            name="page"
            min="0"
            value={this.state.page}
            onChange={this.handleChange}
          /><br/>
        <label htmlFor="measure">measure #:</label><br/>
          <input
            type="text"
            name="measure"
            value={this.state.measure}
            onChange={this.handleChange}
          /><br/>
            <label htmlFor="description">description:</label><br/>
            <textarea
              name="message"
              rows="5"
              cols="30"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              ></textarea><br/>
          </form>
          <button id="add-comment-button" onClick={this.closeModal}>Add Comment</button>
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
