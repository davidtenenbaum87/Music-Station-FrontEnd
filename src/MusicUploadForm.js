import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleTitleChange, handleComposerChange, handleMusicScoreUpload } from './actions.js';


class MusicUploadForm extends Component {

  handleSubmit = (event) => {
    // event.preventDefault()

    let formData = new FormData();
    formData.append('title', `${this.props.title}`)
    formData.append('composer', `${this.props.composer}`)
    formData.append('user_id', 1)
    formData.append('music_score', this.props.music_score);

    fetch("http://localhost:3000/api/v1/scores", {
      method: 'POST',
      body: formData
    })

  }

  render () {
    return (

        <form className="music-upload-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={this.props.title}
            onChange={this.props.handleTitleChange}
          /><br/>
          <label htmlFor="composer">Composer:</label>
            <input
              type="text"
              name="composer"
              value={this.props.composer}
              onChange={this.props.handleComposerChange}
            /><br/>
          <label htmlFor="file">File:</label>
          <input type="file" name="music_score" onChange={this.props.handleFileUpload}/><br/>
          <input type="submit" value="upload"/>
        </form>

    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.title,
    composer: state.composer,
    music_score: state.music_score,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleTitleChange: (event) => dispatch(handleTitleChange(event.target.value)),
    handleComposerChange: (event) => dispatch(handleComposerChange(event.target.value)),
    handleFileUpload: (event) => dispatch(handleMusicScoreUpload( event.target.files[0]))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicUploadForm);
