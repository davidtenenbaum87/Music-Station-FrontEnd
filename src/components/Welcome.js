import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import '../lib/welcome.css';

class Welcome extends Component {
  state = {
    displayLogin: true,
    displaySignUp: false,
  }

  displayLogin = () => {
    this.setState({
      displayLogin: !this.state.displayLogin,
      displaySignUp: !this.state.displaySignUp,
    })
  }

  displaySignUp = () => {
    this.setState({
      displaySignUp: !this.state.displaySignUp,
      displayLogin: !this.state.displayLogin,
    })
  }

  render() {
    return (
      <div className="welcome-container">
        <div className="welcome-login-signup-buttons">
          <Link to='/login' id="login" onClick={this.displayLogin}>Login</Link>
          <Link to='/signup' id="signup" onClick={this.displaySignUp}>SignUp</Link>
        </div>
        <div className="login-signup">
        {
          this.state.displayLogin ?
          <Login />
          :
          null
        }
        {
          this.state.displaySignUp ?
          <SignUp />
          :
          null
        }
        </div>
      </div>
    )
  }
}


export default withRouter(connect()(Welcome));
