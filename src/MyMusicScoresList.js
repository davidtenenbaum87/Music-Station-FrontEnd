import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { updateCurrentUserScores } from './actions.js';
import MyMusicScoresListItem from './MyMusicScoresListItem.js';
import MusicUploadForm from './MusicUploadForm.js';

class MyMusicScoresList extends Component {
  state = {
    viewUploadForm: false,
  }

  renderScores = () => {
    return this.props.current_user_scores.map(score => {
      return <MyMusicScoresListItem key={score.id} score={score}/>
    })
  }

  handleClick = () => {
    this.setState({
      viewUploadForm: !this.state.viewUploadForm,
    })
  }


  render() {
    console.log('mymusic', this.props);
    return (
      <div className="my-music-scores-list">
        <h1>My Music</h1>
        <button onClick={this.handleClick}>Add music</button>
        {
          this.state.viewUploadForm ?
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
    title: state.title,
    composer: state.composer,
    music_score: state.music_score,
    current_user_scores: state.current_user_scores,
    userId: state.userId,
    username: state.username,
    viewOn: state.viewOn,
    selectedScore: state.selectedScore,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentUserScores: (scores) => dispatch(updateCurrentUserScores(scores)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusicScoresList);
