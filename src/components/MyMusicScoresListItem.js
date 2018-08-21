import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MusicScore from './MusicScore.js';
import { removeScoreFromUserScores, displayMusicScore, selectedClickedScore, toggleVideosDisplay, toggleCommentsDisplay } from '../actions.js';

class MyMusicScoresListItem extends Component {

  handleViewClick = (event) => {
    this.props.displayMusicScore()
    this.props.toggleCommentsDisplay()
    // this.props.toggleVideosDisplay()
    this.props.currentScore(this.props.score)

  }

  removeScoreFromUserScores = (event) => {
    fetch(`http://localhost:3000/api/v1/scores/${event.target.id}`, {
      method: "DELETE"
    })
    this.props.removeScoreFromScores(parseInt(event.target.id))
    if (this.props.videosDisplay) {
      this.props.toggleVideosDisplay()
    }
    if (this.props.viewMusicScore) {
      this.props.displayMusicScore()
    }
    if (this.props.commentsDisplay) {
      this.props.toggleCommentsDisplay()
    }
  }

  render() {
    return (
      <div className="music-score-item">
        <ul className="music-score-details">
          <li key={this.props.score.id} id={this.props.score.id}>
            {this.props.score.title} / {this.props.score.composer}
          </li>
          <div className="music-score-view-delete-comments-videos-buttons">
            <button onClick={this.handleViewClick}><i className="material-icons">pageview</i></button>
            <button onClick={this.props.toggleCommentsDisplay}><i className="material-icons">insert_comment</i></button>
            <button onClick={this.props.toggleVideosDisplay}><i className="material-icons">video_library</i></button>
            <button onClick={this.removeScoreFromUserScores}><i className="material-icons" id={this.props.score.id} value="delete">delete</i></button>
          </div>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_user_scores: state.current_user_scores,
    viewMusicScore: state.viewMusicScore,
    selectedScore: state.selectedScore,
    videosDisplay: state.videosDisplay,
    commentsDisplay: state.commentsDisplay,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeScoreFromScores: (scoreId) => dispatch(removeScoreFromUserScores(scoreId)),
    displayMusicScore: () => dispatch(displayMusicScore()),
    currentScore: (score) => dispatch(selectedClickedScore(score)),
    toggleVideosDisplay: () => dispatch(toggleVideosDisplay()),
    toggleCommentsDisplay: () => dispatch(toggleCommentsDisplay()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyMusicScoresListItem));
