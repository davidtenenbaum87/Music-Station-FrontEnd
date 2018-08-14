import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentUser, updateCurrentUserScores, getCurrentUserEvents } from './actions.js';
import { BadTokenError } from './error.js';
import Adapter from './apis/Adapter.js';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Adapter.postLoginUser(this.state.username, this.state.password)
      .then(json => this.handleLoginState(json))
      .catch(error => console.log("Error at login attempt", error))
  }

  handleLoginState = (json) => {
    localStorage.setItem('token', json.token);
    this.props.setUserIdandName(json.id, json.username);
    this.props.setUserScores(json.scores);
    this.props.getCurrentUserEvents(json.events);
    this.props.history.push('/mymusic')
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    username: state.username,
    current_user_scores: state.current_user_scores,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserIdandName: (userId, username) => dispatch(setCurrentUser(userId, username)),
    setUserScores: (scores) => dispatch(updateCurrentUserScores(scores)),
    getCurrentUserEvents: (events) => dispatch(getCurrentUserEvents(events)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
