import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {

  render() {
    return (
      <div className="user-profile">
        <form>
          <label htmlFor="instrument">Instrument:</label>
          <select>
            <option>choose your instrument</option>
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
          <input type="checkbox" id="interest" name="interest" value="interest" />
          <label htmlFor="interest">Looking to find local musicians? </label>
        </form>
      </div>

    )
  }
}

export default connect()(UserProfile);
