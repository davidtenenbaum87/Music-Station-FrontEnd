import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {

  render() {
    return (
      <div className="event-item">
        userProfile
      </div>
    )
  }
}

export default connect()(UserProfile);
