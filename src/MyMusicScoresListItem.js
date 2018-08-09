import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicScoreItem from './MusicScoreItem.js';

class App extends Component {
  state = {
    isClicked: false,
    scoreId: null,
  }

  handleClick = (event) => {
    this.setState({
      isClicked: !this.state.isClicked,
      scoreId: parseInt(event.target.id),
    }, () => console.log(this.state))
  }


  render() {
    return (
      <div className="music-score-item">
        <p key={this.props.score.id} id={this.props.score.id}>
          {this.props.score.title} | {this.props.score.composer} | <button id={this.props.score.id} onClick={this.handleClick}>VIEW</button>
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

export default connect()(App);
