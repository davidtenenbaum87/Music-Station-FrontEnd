import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './App.css';
import { removeScoreFromUserScores, toggleScoreDisplay, selectedClickedScore } from './actions.js';

class MyMusicScoresListItem extends Component {

  handleViewClick = (event) => {
    this.props.viewScoreToggle()
    this.props.currentScore(this.props.score)
    this.props.history.push(`/score/${this.props.selectedScoreId}`);
  }

  removeScoreFromUserScores = (event) => {
    fetch(`http://localhost:3000/api/v1/scores/${event.target.id}`, {
      method: "DELETE"
    })
    this.props.removeScoreFromScores(parseInt(event.target.id))
  }

  render() {
    return (
      <ul className="music-score-item">
        <li key={this.props.score.id} id={this.props.score.id}>
          {this.props.score.title} | {this.props.score.composer} | <button id={this.props.score.id} value="view" onClick={this.handleViewClick}>view</button> | <button id={this.props.score.id} value="delete" onClick={this.removeScoreFromUserScores}>delete</button>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_user_scores: state.current_user_scores,
    viewOn: state.viewOn,
    selectedScore: state.selectedScore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeScoreFromScores: (scoreId) => dispatch(removeScoreFromUserScores(scoreId)),
    viewScoreToggle: () => dispatch(toggleScoreDisplay()),
    currentScore: (score) => dispatch(selectedClickedScore(score)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyMusicScoresListItem));
