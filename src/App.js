import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import MyMusicScoresList from './MyMusicScoresList.js';
import MusicScore from './MusicScore.js';
import NavBar from './NavBar.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import MyCalendar from './MyCalendar.js';
import EventForm from './EventForm.js';
import Adapter from './apis/Adapter.js';

import { setCurrentUser, updateCurrentUserScores, getCurrentUserEvents, fetchGetMusicScores } from './actions.js';

class App extends Component {

  componentDidMount() {
    Adapter.getCurrentUser()
     .then(json => {
       this.props.setUserIdandName(json.id, json.username)
       // this.props.getCurrentUserScores(json.scores)
       this.props.fetchGetMusicScores(json.id)
       this.props.getCurrentUserEvents(json.events)
     })
     .catch(err => {
			Adapter.deleteToken();
			this.props.history.push('/login');
		})
  }

  render() {
    return (
      <div className="App">
        <NavBar />
          <Fragment>
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path='/signup' render={() => <SignUp />} />
            <Route exact path='/mymusic' render={() => <MyMusicScoresList />} />
            <Route exact path='/myschedule' render={() => <MyCalendar />} />
          </Fragment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    userId: state.userId,
    current_user_scores: state.current_user_scores,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserIdandName: (userId, username) => dispatch(setCurrentUser(userId, username)),
    getCurrentUserScores: (scores) => dispatch(updateCurrentUserScores(scores)),
    getCurrentUserEvents: (events) => dispatch(getCurrentUserEvents(events)),
    fetchGetMusicScores: (userId) => dispatch(fetchGetMusicScores(userId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
