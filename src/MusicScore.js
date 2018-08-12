import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import YouTubeVideosList from './YouTubeVideosList.js';

class MusicScore extends Component {
  state = {
    scoreURL: null,
    displayVideos: false,
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
            width="400"
            height="400">
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

  displayYouTubeVids = () => {
    this.setState({
      displayVideos: !this.state.displayVideos,
    })
  }

  render() {
    return (
      <div className="music-score-display">
        {this.displayScore()}
        <a onClick={this.displayYouTubeVids}><i class="material-icons">music_video</i></a>
        { this.state.displayVideos ?
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
    viewOn: state.viewOn,
    selectedScore: state.selectedScore,
  }
}
export default connect(mapStateToProps)(MusicScore);
