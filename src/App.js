import React, { Component } from 'react';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';

class App extends Component {
  state = {
    userId: 1,
    userScores: [],
  }

  // componentDidMount() {
  //   fetch(`http://localhost:3000/api/v1/users/${this.state.userId}`)
  //     .then(res => res.json())
  //     .then(data => this.parseData(data))
  // }
  //
  // parseData = (data) => {
  //   let userScores = data.scores
  //   if (userScores !== undefined) {
  //     data.scores.map(score => {
  //       fetch(`http://localhost:3000/api/v1/scores/${score.id}`)
  //       .then(res => res.json())
  //       .then(console.log)
  //     })
  //   }
  // }

  render() {
    return (
      <div className="App">
        <MusicUploadForm />
      </div>
    );
  }
}

export default App;
