import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicScoreItem from './MusicScoreItem.js';
import { removeScoreFromUserScores, toggleScoreDisplay, selectedClickedScore } from './actions.js';

class App extends Component {

  handleClick = (event) => {
    this.props.viewScoreToggle()
    this.props.currentScoreId(parseInt(event.target.id))
  }

  removeScoreFromUserScores = (event) => {
    fetch(`http://localhost:3000/api/v1/scores/${event.target.id}`, {
      method: "DELETE"
    })
    this.props.removeScoreFromScores(parseInt(event.target.id))
  }

  render() {
    return (
      <div className="music-score-item">
        <p key={this.props.score.id} id={this.props.score.id}>
          {this.props.score.title} | {this.props.score.composer} | <button id={this.props.score.id} value="view" onClick={this.handleClick}>view</button> | <button id={this.props.score.id} value="delete" onClick={this.removeScoreFromUserScores}>delete</button>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_user_scores: state.current_user_scores,
    viewOn: state.viewOn,
    selectedScoreId: state.selectedScoreId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeScoreFromScores: (scoreId) => dispatch(removeScoreFromUserScores(scoreId)),
    viewScoreToggle: () => dispatch(toggleScoreDisplay()),
    currentScoreId: (scoreId) => dispatch(selectedClickedScore(scoreId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
