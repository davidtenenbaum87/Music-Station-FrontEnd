import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';
import MyMusicScoresList from './MyMusicScoresList.js';
import MusicScore from './MusicScore.js';
import * as youtubeSearch from "youtube-search";
import YouTube from 'react-youtube';

class YouTubeVideosList extends Component {
  state = {
    videos: [],
  }

  componentDidMount() {
    console.log('YT', this.props);
    fetch(`http://localhost:3000/api/v1/scores/${this.props.selectedScore.id}`)
      .then(res => res.json())
      .then(data => this.setState({
        clickedTitle: data.score.title,
        clickedComposer: data.score.composer,
      }))

    const API_KEY = 'AIzaSyC6LK03UaFIQ4YAn8pwt1tWTevHzQbo0Ak';

    var opts: youtubeSearch.YouTubeSearchOptions = {
      maxResults: 10,
      key: "AIzaSyC6LK03UaFIQ4YAn8pwt1tWTevHzQbo0Ak"
    };

    youtubeSearch(`${this.props.selectedScore.composer}`, opts, (err, results) => {
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
    console.log('vids', this.props);
    return (
      <div className="youtube-videos-list">
        {
          this.props.viewOn ?
            this.displayVideos()
          :
            null
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.title,
    composer: state.composer,
    viewOn: state.viewOn,
    selectedScore: state.selectedScore,
  }
}

export default connect(mapStateToProps)(YouTubeVideosList);
