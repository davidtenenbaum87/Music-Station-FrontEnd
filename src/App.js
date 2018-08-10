import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';
import MyMusicScoresList from './MyMusicScoresList.js';
import MusicScoreItem from './MusicScoreItem.js';
import YouTubeVideosList from './YouTubeVideosList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="form-and-list">
          {
            this.props.viewOn ?
            <Fragment>
              <MusicScoreItem />
              <YouTubeVideosList />
            </Fragment>
            :
            null
          }
          <MusicUploadForm />
          <MyMusicScoresList />
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
