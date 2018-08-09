import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class MusicScoreItem extends Component {
  state = {
    scoreURL: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/scores/${this.props.selectedScoreId}`)
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
          <object data={this.state.scoreURL} width="400" height="400"/>
        )
      } else {
        return (
          <img src={this.state.scoreURL} width="400" height="400"/>
        )
      }
    }
  }

  render() {
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
    selectedScoreId: state.selectedScoreId,
  }
}
export default connect(mapStateToProps)(MusicScoreItem);
