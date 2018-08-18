import React, { Component } from 'react';
import { connect } from 'react-redux';
// import GoogleMaps from "simple-react-google-maps"
import UserProfileForm from './UserProfileForm.js';


class UserProfile extends Component {
  state = {
    displayUserProfileForm: false,
  }

  displayUserProfileForm = () => {
    this.setState({
      displayUserProfileForm: !this.state.displayUserProfileForm,
    })
  }


  handleClick = (event) => {
    event.preventDefault()
    this.setState({
      displayMusicians: !this.state.displayMusicians,
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div className="user-profile">
        <button onClick={this.displayUserProfileForm}>View profile</button>
        {
          this.state.displayUserProfileForm ?
            <UserProfileForm />
          :
            null
        }
      </div>

    )
  }
}

export default connect()(UserProfile);
