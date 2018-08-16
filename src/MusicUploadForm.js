import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleTitleChange, handleComposerChange, handleInstrumentationChange, handleMusicScoreUpload, displayEventForm, fetchGetMusicScores, fetchPostMusicScore } from './actions.js';

class MusicUploadForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('title', `${this.props.title}`)
    formData.append('composer', `${this.props.composer}`)
    formData.append('instrumentation', `${this.props.instrumentation}`)
    formData.append('user_id', `${this.props.userId}`)
    formData.append('music_score', this.props.music_score);

    this.props.fetchPostMusicScore(formData)
    // fetch("http://localhost:3000/api/v1/scores", {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(res => {if (res.ok) { return res.json()}})
    // .then(res => this.handlePush())
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
        <label htmlFor="title">instrumentation:</label>
          <input
            type="text"
            name="title"
            value={this.props.instrumentation}
            onChange={this.props.handleInstrumentationChange}
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
    userId: state.userId,
    username: state.username,
    title: state.title,
    composer: state.composer,
    instrumentation: state.instrumentation,
    music_score: state.music_score,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleTitleChange: (event) => dispatch(handleTitleChange(event.target.value)),
    handleComposerChange: (event) => dispatch(handleComposerChange(event.target.value)),
    handleInstrumentationChange: (event) => dispatch(handleInstrumentationChange(event.target.value)),
    handleFileUpload: (event) => dispatch(handleMusicScoreUpload(event.target.files[0])),
    fetchPostMusicScore: (score) => dispatch(fetchPostMusicScore(score))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicUploadForm));
