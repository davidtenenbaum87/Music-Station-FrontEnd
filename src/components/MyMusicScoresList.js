import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserScores, toggleMusicFormDisplay, fetchGetMusicScores } from '../actions.js';
import MyMusicScoresListItem from './MyMusicScoresListItem.js';
import MusicUploadForm from './MusicUploadForm.js';
import Metronome from './Metronome.js';
import Tuner from './Tuner.js';
import '../lib/music.css'

class MyMusicScoresList extends Component {
  state = {
    displayMetronome: false,
    displayTuner: false,
  }

  componentDidMount() {
    this.props.fetchGetMusicScores(this.props.userId)
  }

  renderScores = () => {
    if (this.props.current_user_scores) {
      return this.props.current_user_scores.map(score => {
        return <MyMusicScoresListItem key={score.id} score={score}/>
      })
    }
  }

  displayMetronome = () => {
    this.setState({
      displayMetronome: !this.state.displayMetronome,
    })
  }

  displayTuner = () => {
    this.setState({
      displayTuner: !this.state.displayTuner,
    })
  }

  render() {
    return (
      <div className="music-scores-container">
        <h1>My Music</h1>
        <div className="upload-metronome-tuner-buttons">
          <button onClick={this.props.toggleMusicFormDisplay}>Add music</button>
          <button onClick={this.displayMetronome}>Metronome</button>
          <button onClick={this.displayTuner}>Tuner</button>
        </div>
        { this.state.displayMetronome ? <Metronome /> : null }
        { this.state.displayTuner ? <Tuner /> : null }

        {
          this.props.musicUploadFormDisplay ?
            <MusicUploadForm />
          :
            null
        }
        <div className="music-scores-list">
          {this.renderScores()}
        </div>
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
    getCurrentUserScores: (scores) => dispatch(getCurrentUserScores(scores)),
    toggleMusicFormDisplay: () => dispatch(toggleMusicFormDisplay()),
    fetchGetMusicScores: (userId) => dispatch(fetchGetMusicScores(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusicScoresList);
