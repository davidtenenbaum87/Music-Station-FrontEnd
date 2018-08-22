import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleTitleChange, handleComposerChange, handleInstrumentationChange, handleMusicScoreUpload, fetchPostMusicScore } from '../actions.js';

import ReactModal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};


class MusicUploadForm extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }


  closeModal(event) {
    event.preventDefault()

    let formData = new FormData();
    formData.append('title', `${this.props.title}`)
    formData.append('composer', `${this.props.composer}`)
    formData.append('instrumentation', `${this.props.instrumentation}`)
    formData.append('user_id', `${this.props.userId}`)
    formData.append('music_score', this.props.music_score);

    this.props.fetchPostMusicScore(formData)

    this.setState({
      modalIsOpen: false,
    });
  }


  render () {
    return (
      <div className="add-music-button-div" id="add-music-button-div">
      <button id="add-music-button" onClick={this.openModal}><i class="material-icons">library_music</i>Add To Library</button>
      <ReactModal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
      <form className="music-upload-form">
        <label htmlFor="title">Name of Piece: </label>
        <input
          type="text"
          name="title"
          placeholder="..e.g. Sonata, Concerto"
          value={this.props.title}
          onChange={this.props.handleTitleChange}
          required
        /><br/>
      <label htmlFor="composer">Name of Composer: </label>
          <input
            type="text"
            name="composer"
            placeholder="..e.g. Mozart, Beethoven"
            value={this.props.composer}
            onChange={this.props.handleComposerChange}
            required
          /><br/>
        <label htmlFor="title">Instrumentation: </label>
          <input
            type="text"
            name="title"
            placeholder="..e.g. Violin & Piano"
            value={this.props.instrumentation}
            onChange={this.props.handleInstrumentationChange}
            required
          /><br/>
        <label htmlFor="file">Music Score: </label>
        <input
          type="file"
          name="music_score"
          id="choose-file"
          onChange={this.props.handleFileUpload}
          />
        <button id="upload-music-button" onClick={this.closeModal}><i class="material-icons">file_upload</i>Upload</button>
      </form>
    </ReactModal>
  </div>
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
