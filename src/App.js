import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import MusicUploadForm from './MusicUploadForm.js';
import MyMusicScoresList from './MyMusicScoresList.js';
import MusicScoreItem from './MusicScoreItem.js';
import YouTubeVideosList from './YouTubeVideosList.js';
import NavBar from './NavBar.js';
import Login from './Login.js';
import { setCurrentUser, updateCurrentUserScores } from './actions.js';

class App extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/current_user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(json => {
        this.props.setUserIdandName(json.id, json.username),
        this.props.getCurrentUserScores(json.scores)
      })
  }

  render() {
    console.log('app', this.props);
    return (
      <div className="App">
        <NavBar />
          <Fragment>
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path='/uploadmusic' render={() => <MusicUploadForm />} />
            <Route exact path='/mymusic' render={() => <MyMusicScoresList />} />
          </Fragment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    username: state.username,
    viewOn: state.viewOn,
    selectedScoreId: state.selectedScoreId,
    current_user_scores: state.current_user_scores,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserIdandName: (userId, username) => dispatch(setCurrentUser(userId, username)),
    getCurrentUserScores: (scores) => dispatch(updateCurrentUserScores(scores)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// export default connect(mapStateToProps, mapDispatchToProps)(App);
