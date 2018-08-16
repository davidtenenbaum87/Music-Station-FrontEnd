import React, { Component } from 'react';
import { connect } from 'react-redux';
import Adapter from './apis/Adapter.js';
import { removeCommentFromUserComments, toggleCommentsDisplay } from './actions.js';


class CommentsList extends React.Component {

  handleClick = () => {
    fetch(`http://localhost:3000/api/v1/comments/${this.props.current_comment.id}`, {
      method: 'DELETE',
    })
    this.props.removeCommentFromUserComments(this.props.current_comment.id);
  }

  render() {
    console.log(this.props.score_comments);
    return (
      <div className="comment">
        @: {this.props.current_comment.measure} |
        Description: {this.props.current_comment.description} |
        <button onClick={this.handleClick}>Delete</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    score_comments: state.score_comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeCommentFromUserComments: (commentId) => dispatch(removeCommentFromUserComments(commentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
