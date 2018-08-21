import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCurrentUser, fetchGetMusicScores, fetchGetEvents } from '../actions.js';
import Adapter from '../apis/Adapter.js';
import '../lib/welcome.css'

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
    this.props.setCurrentUser(json.id, json.username);
    this.props.fetchGetMusicScores(json.id);
    this.props.fetchGetEvents(json.id);
    this.props.history.push('/mymusic')
  }

  render() {
    return (
      <div className="login-form-div">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label htmlFor=" username"></label>
          <input
            className="browser-default"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
            required
          />
        <label htmlFor="password"></label>
          <input
            className="browser-default"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
            required
          />
          <input
            className="login-signup-button browser-default"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    username: state.username,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (userId, username) => dispatch(setCurrentUser(userId, username)),
    fetchGetMusicScores: (userId) => dispatch(fetchGetMusicScores(userId)),
    fetchGetEvents: (userId) => dispatch(fetchGetEvents(userId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
