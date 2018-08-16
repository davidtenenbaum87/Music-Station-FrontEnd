import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { updateCurrentUserScores, toggleMusicFormDisplay, fetchGetMusicScores } from './actions.js';
import MyMusicScoresListItem from './MyMusicScoresListItem.js';
import MusicUploadForm from './MusicUploadForm.js';

class MyMusicScoresList extends Component {

  componentDidMount() {

    this.props.fetchGetMusicScores(this.props.userId)
    // Adapter.getScoreComments(this.props.selectedScore.id)
    // .then(comments => this.props.getCurrentScoreComments(comments))
  }

  renderScores = () => {
    if (this.props.current_user_scores) {

      return this.props.current_user_scores.map(score => {
        return <MyMusicScoresListItem key={score.id} score={score}/>
      })
    }
  }

  render() {
    return (
      <div className="my-music-scores-list">
        <h1>My Music</h1>
        <button onClick={this.props.toggleMusicFormDisplay}>Add music</button>
        {
          this.props.musicUploadFormDisplay ?
            <MusicUploadForm />
          :
            null
        }
        {this.renderScores()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    current_user_scores: state.current_user_scores,
    musicUploadFormDisplay: state.musicUploadFormDisplay
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUserScores: (scores) => dispatch(updateCurrentUserScores(scores)),
    toggleMusicFormDisplay: () => dispatch(toggleMusicFormDisplay()),
    fetchGetMusicScores: (userId) => dispatch(fetchGetMusicScores(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusicScoresList);
