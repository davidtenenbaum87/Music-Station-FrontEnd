import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentUserScores, toggleMusicFormDisplay, fetchGetMusicScores, toggleVideosDisplay, toggleCommentsDisplay } from '../actions.js';
import MyMusicScoresListItem from './MyMusicScoresListItem.js';
import MusicUploadForm from './MusicUploadForm.js';
import MusicScore from './MusicScore';
import Metronome from './Metronome.js';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import YouTubeVideosList from './YouTubeVideosList';
import Tuner from './Tuner.js';
import '../lib/music.css'
import '../lib/comments.css'


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
        <div className="music-scores-container-header-form-metronome-tuner">
          <h1>My Music</h1>
          <div className="metronome-tuner-buttons">
            <button id="metronome-button" onClick={this.displayMetronome}><img src="../metronome-img.png" height="50px"/>Metronome</button>
            <button id="tuner-button" onClick={this.displayTuner}><img src="../tuner-img.png" height="50px" background-color='white'/>Tuner</button>
          </div>
        </div>
        { this.state.displayMetronome ? <Metronome /> : null }
        { this.state.displayTuner ? <Tuner /> : null }

        {
          this.props.musicUploadFormDisplay ?
            <MusicUploadForm />
          :
            null
        }
        <div className="music-scores-list-score-comments">
          <div className="music-scores-list">
            <MusicUploadForm  />
            {this.renderScores()}
          </div>
          <div className="music-score-file">
            {
              this.props.viewMusicScore ?
              <Fragment>
                <MusicScore />
              </Fragment>
              :
              null
            }
          </div>
          { this.props.commentsDisplay ?
            <Fragment>
              <CommentsList />
            </Fragment>
            :
            null
          }
        </div>
        <div className="youtube-videos-div">
          { this.props.videosDisplay ?
            <YouTubeVideosList />
            :
            null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    current_user_scores: state.current_user_scores,
    musicUploadFormDisplay: state.musicUploadFormDisplay,
    viewMusicScore: state.viewMusicScore,
    selectedScore: state.selectedScore,
    videosDisplay: state.videosDisplay,
    commentsDisplay: state.commentsDisplay,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUserScores: (scores) => dispatch(getCurrentUserScores(scores)),
    toggleMusicFormDisplay: () => dispatch(toggleMusicFormDisplay()),
    fetchGetMusicScores: (userId) => dispatch(fetchGetMusicScores(userId)),
    toggleVideosDisplay: () => dispatch(toggleVideosDisplay()),
    toggleCommentsDisplay: () => dispatch(toggleCommentsDisplay()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusicScoresList);
