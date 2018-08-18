import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import MyMusicScoresList from './components//MyMusicScoresList.js';
import NavBar from './components/NavBar.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import MyCalendar from './components/MyCalendar.js';
import Welcome from './components/Welcome.js';
import EventForm from './components/EventForm.js';
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
			this.props.history.push('/welcome');
		})
  }

  render() {
    return (

      <div className="App">
        <NavBar />
          <Fragment>
            {
              !!Adapter.getToken() ?
                <Switch>
                  <Route exact path='/mymusic' render={() => <MyMusicScoresList />} />
                  <Route exact path='/myschedule' render={() => <MyCalendar />} />
                  <Route path="/events/:id/edit" render={(routerProps) => {
  								let id = routerProps.match.params.id
  								let foundEvent = this.props.current_user_events.find((r) => r.id === parseInt(id, 10))
  								return <EventForm {...routerProps} foundEvent={foundEvent} />
  							  }}/>
                </Switch>
              :
                <Switch>
                  <Route exact path='/welcome' render={() => <Welcome />} />
                  <Route exact path='/login' render={() => <Welcome/>} />
                  <Route exact path='/signup' render={() => <Welcome />} />
                </Switch>
            }
          </Fragment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
