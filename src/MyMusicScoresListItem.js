import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicScoreItem from './MusicScoreItem.js';
import { removeScoreFromUserScores } from './actions.js';


class App extends Component {
  state = {
    isClicked: false,
    scoreId: null,
  }

  handleClick = (event) => {
    this.setState({
      isClicked: !this.state.isClicked,
      scoreId: parseInt(event.target.id),
    })
  }

  removeScoreFromUserScores = (event) => {
    fetch(`http://localhost:3000/api/v1/scores/${event.target.id}`, {
      method: "DELETE"
    })
    this.props.removeScoreFromScores(parseInt(event.target.id))
  }


  render() {
    console.log('listitem', this.props);
    return (
      <div className="music-score-item">
        <p key={this.props.score.id} id={this.props.score.id}>
          {this.props.score.title} | {this.props.score.composer} | <button id={this.props.score.id} value="view" onClick={this.handleClick}>view</button> | <button id={this.props.score.id} value="delete" onClick={this.removeScoreFromUserScores}>delete</button>
        </p>
        {
          this.state.isClicked ?
            <MusicScoreItem scoreId={this.state.scoreId} />
            :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_user_scores: state.current_user_scores,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeScoreFromScores: (scoreId) => dispatch(removeScoreFromUserScores(scoreId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
