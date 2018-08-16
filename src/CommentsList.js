import React, { Component } from 'react';
import { connect } from 'react-redux';
import Adapter from './apis/Adapter.js';
import Comment from './Comment.js';
import { getCurrentScoreComments, fetchGetScoreComments } from './actions.js';

class CommentsList extends React.Component {

  componentDidMount() {
    this.props.fetchGetScoreComments(this.props.selectedScore.id)
  }

  renderComments = () => {
    return this.props.score_comments.map(comment => {
      return <Comment current_comment={comment}/>
    })
  }

  render() {
    return (
      <div className="comments-list">
        {this.renderComments()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedScore: state.selectedScore,
    score_comments: state.score_comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentScoreComments: (scores) => dispatch(getCurrentScoreComments(scores)),
    fetchGetScoreComments: (score_id) => dispatch(fetchGetScoreComments(score_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
