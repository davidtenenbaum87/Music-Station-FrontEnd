import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Adapter from '../apis/Adapter.js';
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
    Adapter.postSignUpUser(this.state.username, this.state.password)
      .then(this.props.history.push('/welcome'))
    this.setState({
      username: "",
      password: "",
    })
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

export default withRouter(SignUp);
