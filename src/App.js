import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';


class App extends Component {

  render() {
    return (
      <div className="App">
        <MusicUploadForm />
      </div>
    );
  }

}



export default connect()(App);
