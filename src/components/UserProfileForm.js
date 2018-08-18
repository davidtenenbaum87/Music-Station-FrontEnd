import React, { Component } from 'react';
import { connect } from 'react-redux';
// import GoogleMaps from "simple-react-google-maps"

class UserProfileForm extends Component {
  state = {
    instrument: "",
    yearsPlaying : "",
    background: "",
    location: "",
    profilePicture: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('instrument', `${this.state.instrument}`)
    formData.append('years_playing', `${this.state.yearsPlaying}`)
    formData.append('background', `${this.state.background}`)
    formData.append('location', `${this.state.location}`)
    formData.append('profile_picture', event.target.profilePicture.files[0]);
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}`, {
      method: "PATCH",
      body: formData
    })
      .then(r => r.json())
      .then(console.log)
  }

  render() {
    return (
      <div className="user-profile">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="instrument">Instrument:</label>
          <select
            id="instrument"
            name="instrument"
            value={this.state.instrument}
            onChange={this.handleChange}>
            <option></option>
            <option>piano</option>
            <option>violin</option>
            <option>viola</option>
            <option>cello</option>
            <option>bass</option>
            <option>flute</option>
            <option>oboe</option>
            <option>bassoon</option>
            <option>clarinet</option>
            <option>french Horn</option>
            <option>trumpet</option>
            <option>trombone</option>
            <option>tuba</option>
            <option>percussion</option>
          </select><br/>
        <label htmlFor="yearsPlaying">Years playing: </label><br/>
          <input
            type="number"
            id="yearsPlaying"
            name="yearsPlaying"
            value={this.state.yearsPlaying}
            onChange={this.handleChange}
          /><br/>
          <label htmlFor="background">Background: </label>
          <textarea
            id="background"
            name="background"
            placeholder="tell us a little about you"
            value={this.state.background}
            onChange={this.handleChange}
          /><br/>
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="city / zipcode"
            value={this.state.location}
            onChange={this.handleChange}
          /><br/>
          <label htmlFor="profilePicture">Profile Picture: </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            value={this.state.profilePicture}
            onChange={this.handleChange}
            /><br/>
          <input type="submit" value="save"/>

        </form>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
  }
}

export default connect(mapStateToProps)(UserProfileForm);
