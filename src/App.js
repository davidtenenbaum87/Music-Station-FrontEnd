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

import { setCurrentUser, updateCurrentUserScores, getCurrentUserEvents } from './actions.js';

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
        this.props.setUserIdandName(json.id, json.username)
        this.props.getCurrentUserScores(json.scores)
        this.props.getCurrentUserEvents(json.events)
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
            <Route exact path='/score' render={() => <MusicScore />} />
            <Route path="/score/:id" render={(routerProps) => {
							let id = routerProps.match.params.id
							let foundScore = this.props.current_user_scores.find((r) => r.id === parseInt(id, 10))
							return <MusicScore {...routerProps} foundScore={foundScore} />
						}}/>
          </Fragment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current_user_scores: state.current_user_scores,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserIdandName: (userId, username) => dispatch(setCurrentUser(userId, username)),
    getCurrentUserScores: (scores) => dispatch(updateCurrentUserScores(scores)),
    getCurrentUserEvents: (events) => dispatch(getCurrentUserEvents(events)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
