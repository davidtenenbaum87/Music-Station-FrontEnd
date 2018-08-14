import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Adapter from './apis/Adapter.js';

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
      .then(this.props.history.push('/login'))
  }

  render() {
    return (
      <div className="registration">
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
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default withRouter(SignUp);
