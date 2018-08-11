import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class MusicScoreItem extends Component {
  state = {
    scoreURL: null,
  }

  componentDidMount() {
    console.log("david");
    fetch(`http://localhost:3000/api/v1/scores/${this.props.selectedScore.id}`)
      .then(res => res.json())
      .then(score => this.setState({
        scoreURL: `http://localhost:3000/${score.url}`
      }))
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

  render() {
    console.log('display', this.props);
    return (
      <div className="music-score-display">
        {this.displayScore()}
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
export default connect(mapStateToProps)(MusicScoreItem);
