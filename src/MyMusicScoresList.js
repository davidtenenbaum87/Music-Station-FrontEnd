import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { updateCurrentUserScores } from './actions.js';
import MyMusicScoresListItem from './MyMusicScoresListItem.js';


class MyMusicScoresList extends Component {

  renderScores = () => {
    return this.props.current_user_scores.map(score => {
      return <MyMusicScoresListItem key={score.id} score={score}/>
    })
  }


  render() {
    console.log('mymusicscoreslist', this.props);
    return (
      <div className="my-music-scores-list">
        <h1>My Music</h1>
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
