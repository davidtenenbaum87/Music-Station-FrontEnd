import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import MyMusicScoresList from './MyMusicScoresList.js';
import MusicScore from './MusicScore.js';
import NavBar from './NavBar.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import MyCalendar from './MyCalendar.js';
import UserProfile from './UserProfile.js';
import EventForm from './EventForm.js';
import Adapter from './apis/Adapter.js';

import { setCurrentUser, fetchGetMusicScores, fetchGetEvents } from './actions.js';

class App extends Component {

  componentDidMount() {
    Adapter.getCurrentUser()
     .then(json => {
       this.props.setCurrentUser(json.id, json.username)
       this.props.fetchGetMusicScores(json.id)
       this.props.fetchGetEvents(json.id)
     })
     .catch(err => {
			Adapter.deleteToken();
			this.props.history.push('/login');
		})
  }

  render() {
    console.log('app', this.props.current_user_events);
    return (
      <div className="App">
        <NavBar />
          <Fragment>
            {
              !!Adapter.getToken() ?
                <Switch>
                  <Route exact path='/mymusic' render={() => <MyMusicScoresList />} />
                  <Route exact path='/myschedule' render={() => <MyCalendar />} />
                  <Route exact path='/myprofile' render={() => <UserProfile />} />
                  <Route path="/events/:id/edit" render={(routerProps) => {
  								let id = routerProps.match.params.id
  								let foundEvent = this.props.current_user_events.find((r) => r.id === parseInt(id, 10))
  								return <EventForm {...routerProps} foundEvent={foundEvent} />
  							  }}/>
                </Switch>
              :
                <Switch>
                  <Route exact path='/login' render={() => <Login />} />
                  <Route exact path='/signup' render={() => <SignUp />} />
                </Switch>
            }
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
    current_user_events: state.current_user_events,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (userId, username) => dispatch(setCurrentUser(userId, username)),
    fetchGetMusicScores: (userId) => dispatch(fetchGetMusicScores(userId)),
    fetchGetEvents: (userId) => dispatch(fetchGetEvents(userId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
