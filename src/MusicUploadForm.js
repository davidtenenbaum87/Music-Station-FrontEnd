import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleTitleChange, handleComposerChange } from './actions.js';


class MusicUploadForm extends Component {
  state = {
    // title: "",
    // composer: "",
    music_score: [],
  }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   }, () => console.log(this.state))
  // }

  handleSubmit = (event) => {
    event.preventDefault()
    let newMusicScore = event.target.music_score.files[0];
    this.setState({
      music_score: [...this.state.music_score, newMusicScore],
    }, () => console.log(this.state))

    let formData = new FormData();
    formData.append('title', `${this.props.title}`)
    formData.append('composer', `${this.props.composer}`)
    formData.append('user_id', 1)
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
            value={this.props.title}
            onChange={this.props.handleTitleChange}
          />
        <label htmlFor="composer">Composer:</label>
          <input
            type="text"
            name="composer"
            value={this.props.composer}
            onChange={this.props.handleComposerChange}
          />
        <input type="file" name="music_score" />
        <input type="submit" value="upload"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.title,
    composer: state.composer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleTitleChange: (event) => dispatch(handleTitleChange(event.target.value)),
    handleComposerChange: (event) => dispatch(handleComposerChange(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicUploadForm);
