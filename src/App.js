import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';
import MyMusicScoresList from './MyMusicScoresList.js';
// import NavBar from './NavBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="form-and-list">
          <MusicUploadForm />
          <MyMusicScoresList />
        </div>
      </div>
    );
  }
}

export default connect()(App);
