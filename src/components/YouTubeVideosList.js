import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as youtubeSearch from "youtube-search";
import YouTube from 'react-youtube';

class YouTubeVideosList extends Component {
  state = {
    videos: [],
  }

  componentDidMount() {
    var opts: youtubeSearch.YouTubeSearchOptions = {
      maxResults: 20,
      key: "AIzaSyC6LK03UaFIQ4YAn8pwt1tWTevHzQbo0Ak"
    };

    youtubeSearch(
      `${this.props.selectedScore.title},
      ${this.props.selectedScore.composer},
      ${this.props.selectedScore.instrumentation}`,
      opts, (err, results) => {
      this.setState({
        videos: results,
      })
    });
  }

  displayVideos = () => {
    const opts = {
      height: '250',
      width: '250',
      playerVars: {
        autoplay: 0
      }
    }
    return this.state.videos.map(video => {
      return (
        <YouTube
          key={video.id}
          videoId={video.id}
          opts={opts}
        />
      )
    })
  }

  render() {
    return (
      <div className="youtube-videos-list">
        {this.displayVideos()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.title,
    composer: state.composer,
    instrumentation: state.instrumentation,
    musicScoreDisplay: state.musicScoreDisplay,
    selectedScore: state.selectedScore,
    displayVideos: state.displayVideos,
  }
}

export default connect(mapStateToProps)(YouTubeVideosList);
