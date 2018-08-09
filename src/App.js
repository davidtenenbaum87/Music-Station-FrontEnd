import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';
import MyMusicScoresList from './MyMusicScoresList.js';
import MusicScoreItem from './MusicScoreItem.js';
// import NavBar from './NavBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="form-and-list">
          <MusicUploadForm />
          <MyMusicScoresList />
          {
            this.props.viewOn ?
            <MusicScoreItem />
            :
            null
          }
        </div>
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

export default connect(mapStateToProps)(App);
