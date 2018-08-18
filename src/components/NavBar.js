import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from '../actions.js';
import Adapter from '../apis/Adapter.js';
import '../lib/navbar.css';

class Navbar extends Component {
  handleLogout = () => {
    Adapter.deleteToken();
    this.props.logoutUser();
  }

  capitalizeUsername = () => {
    return (this.props.username.charAt(0).toUpperCase() + this.props.username.slice(1))
  }

  render(){
    return (
      <div className="navbar">
        {
          this.props.userId ?
          <Fragment>
            <h4 className="navbar-header-welcome-name">Welcome, {this.capitalizeUsername()}</h4>
            <div className="navbar-links">
              <NavLink to="/mymusic">MyMusic</NavLink>
              <NavLink to="/myschedule">Schedule</NavLink>
              <NavLink to="/welcome" onClick={this.handleLogout}>Logout</NavLink>
            </div>
          </Fragment>
          :
          <Fragment>
            <h3 className="navbar-header">Music Station</h3>
          </Fragment>
        }
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
    logoutUser: () => dispatch(logoutCurrentUser()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
