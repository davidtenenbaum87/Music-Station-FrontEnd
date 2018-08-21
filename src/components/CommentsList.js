import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import Comment from './Comment.js';
import { fetchGetScoreComments } from '../actions.js';

class CommentsList extends Component {

  componentDidMount() {
    this.props.fetchGetScoreComments(this.props.selectedScore.id)
  }

  renderComments = () => {
    return this.props.score_comments.map(comment => {
      return <Comment key={comment.id} current_comment={comment}/>
    })
  }

  render() {
    return (
      <div className="comments-list">
        <CommentForm />
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
    fetchGetScoreComments: (score_id) => dispatch(fetchGetScoreComments(score_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
