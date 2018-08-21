import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import YouTubeVideosList from './YouTubeVideosList.js';
import CommentsList from './CommentsList.js';
import CommentForm from './CommentForm.js';

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

  render() {
    console.log(this.props.selectedScore);
      return (
        <div className="music-score-pdf">
          <h3>{this.props.selectedScore.title} by {this.props.selectedScore.composer}</h3>
          {this.displayScore()}
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

export default connect(mapStateToProps)(MusicScore);
