import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Adapter from '../apis/Adapter.js';

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
  }

  render() {
    console.log(this.props);
    return (
      <div className="signup-form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            className="browser-default"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          /><br/>
        <label htmlFor="password">Password: </label>
          <input
            className="browser-default"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          /><br/>
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
