import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import YouTubeVideosList from './YouTubeVideosList.js';
import CommentsList from './CommentsList.js';
import CommentForm from './CommentForm.js';
import { toggleVideosDisplay, toggleCommentsDisplay } from './actions.js';

class MusicScore extends Component {
  state = {
    scoreURL: null,
  }

  componentDidMount() {
    if (this.props.selectedScore) {
      fetch(`http://localhost:3000/api/v1/scores/${this.props.selectedScore.id}`)
      .then(res => res.json())
      .then(score => this.setState({
        scoreURL: `http://localhost:3000/${score.url}`
      }))
    }
  }

  displayScore = () => {
    let url = this.state.scoreURL
    if (url) {
      let arr = url.split(".")
      if (arr[arr.length - 1] === 'pdf') {
        return (
          <iframe
            src={this.state.scoreURL}
            title={this.props.selectedScore.title}
            width="700"
            height="700"
            >
          </iframe>
        )
      } else {
        return (
          <img
            src={this.state.scoreURL}
            alt={this.props.selectedScore.title}
            width="400"
            height="400"
            />
        )
      }
    }
  }

  handleCommentsInput = () => {
    const comment = prompt(`add a comment to: ${this.props.selectedScore.title}`)
  }

  render() {
      return (
        <div className="music-score-display">
          <div className="music-score">
            {this.displayScore()}
          </div>
          <a onClick={this.props.toggleCommentsDisplay}><i className="material-icons">comments</i>comments</a>
          <a onClick={this.props.toggleVideosDisplay}><i className="material-icons">music_video</i>watch videos</a>
          { this.props.commentsDisplay ?
            <Fragment>
              <CommentForm />
              <CommentsList />
            </Fragment>
            :
            null
          }
          { this.props.videosDisplay ?
            <YouTubeVideosList />
            :
            null
          }
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    selectedScore: state.selectedScore,
    videosDisplay: state.videosDisplay,
    commentsDisplay: state.commentsDisplay,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleVideosDisplay: () => dispatch(toggleVideosDisplay()),
    toggleCommentsDisplay: () => dispatch(toggleCommentsDisplay()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicScore);
