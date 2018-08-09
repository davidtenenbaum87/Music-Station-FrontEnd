import React, { Component } from 'react';

class MusicUploadForm extends Component {
  state = {
    title: "",
    composer: "",
    music_score: [],
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => console.log(this.state))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let newMusicScore = event.target.music_score.files[0];
    this.setState({
      music_score: newMusicScore,
    }, () => console.log(this.state))
    debugger;
    // let formData = new FormData()
    // formData.append('title': `${this.state.title}`)
    // formData.append('composer': this.state.composer)
    // formData.append('title': this.state.title)

    let formData = new FormData();
    formData.append('title', `${this.state.title}`)
    formData.append('composer', `${this.state.composer}`)
    formData.append('user_id', "1")
    formData.append('music_score', newMusicScore);

    fetch("http://localhost:3000/api/v1/scores", {
      method: 'POST',
      body: formData
    })
  }

  render () {
    return (
      <div className="music-upload-form-div">
        <form className="music-upload-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        <label htmlFor="composer">Composer:</label>
          <input
            type="text"
            name="composer"
            value={this.state.composer}
            onChange={this.handleChange}
          />
        <input type="file" name="music_score" />
        <input type="submit" value="upload"/>

        </form>
      </div>
    )
  }
}

export default MusicUploadForm;
