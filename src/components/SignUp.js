import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Adapter from '../apis/Adapter.js';
import { postSignUpUser } from '../actions.js';
import '../lib/welcome.css'

class SignUp extends Component {
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
    // Adapter.postSignUpUser(this.state.username, this.state.password)
    this.props.postSignUpUser(this.state)
    this.props.history.push('/welcome')
  }

  render() {
    console.log(this.props);
    return (
      <div className="signup-form-div">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <label htmlFor="username"></label>
          <input
            className="browser-default"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
        <label htmlFor="password"></label>
          <input
            className="browser-default"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            className="login-signup-button browser-default"
            type="submit"
            value="Sign-Up"
          />
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    videosDisplay: state.videosDisplay,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postSignUpUser: (username, password) => dispatch(postSignUpUser(username, password)),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
