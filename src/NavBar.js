import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutCurrentUser } from './actions.js';


class Navbar extends Component {
  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.logoutUser();
  }

  render(){
    return (
      <div className="navbar">
        {
          this.props.userId ?
          <Fragment>
            <h4>Welcome {this.props.username}</h4>
            <NavLink to="/login" onClick={this.handleLogout}>Logout</NavLink>
          </Fragment>

          :
          <Fragment>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
          </Fragment>
        }
        <NavLink to="/uploadmusic">Upload music</NavLink>
        <NavLink to="/mymusic">mymusic</NavLink>
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
