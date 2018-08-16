import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { handleCommentMeasureChange, handleCommentDescriptionChange, clearCommentsFormFields, addNewCommentToScore, fetchPostScoreComments } from './actions.js';
import Adapter from './apis/Adapter.js';
import CommentsList from './CommentsList.js';

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

class CommentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
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

  closeModal() {
    this.setState({modalIsOpen: false});
    // Adapter.postScoreComment(this.props.comment_measure, this.props.comment_description, this.props.selectedScore.id)
    //   .then(comment => this.props.addNewCommentToScore(comment))
    this.props.fetchPostScoreComments(this.props.comment_measure, this.props.comment_description, this.props.selectedScore.id)
    this.props.clearCommentsFormFields()
    // this.props.addNewCommentToScore()
  }

  render() {
    console.log('form', this.props);
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
              value={this.props.comment_measure}
              onChange={this.props.handleCommentMeasureChange}
            /><br/>
            <label htmlFor="description">description:</label><br/>
            <textarea
              name="message"
              rows="10"
              cols="30"
              value={this.props.comment_description}
              onChange={this.props.handleCommentDescriptionChange}
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
    comment_measure: state.comment_measure,
    comment_description: state.comment_description,
    score_comments: state.score_comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleCommentMeasureChange: (event) => dispatch(handleCommentMeasureChange(event.target.value)),
    handleCommentDescriptionChange: (event) => dispatch(handleCommentDescriptionChange(event.target.value)),
    clearCommentsFormFields: () => dispatch(clearCommentsFormFields()),
    addNewCommentToScore: (comment) => dispatch(addNewCommentToScore(comment)),
    fetchPostScoreComments: (comment_measure, comment_description, score_id) => dispatch(fetchPostScoreComments(comment_measure, comment_description, score_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
