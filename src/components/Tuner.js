import React, { Component, Fragment } from "react";
import Tone from "react-tone";
import '../lib/metronome-tuner.css';

class Tuner extends Component {
  constructor(props) {
      super(props);

      this.state = {
        isTonePlaying: false,
        frequency: 391,
      };

      this.audioContext = undefined;
      this.iosAudioContextUnlocked = false;
    }

    componentDidMount() {
      this.audioContext = new AudioContext();
    }

    handleClick = () => {
      this.setState({ isTonePlaying: !this.state.isTonePlaying});
    }



    handleFrequencyChange = (event) => {
      this.setState({
        frequency: parseFloat(event.target.value)
      }, () => console.log(this.state))
    }

    render() {
      // Pass the same instance of AudioContext that played an empty buffer to <Tone />
      return (
        <div className="tuner">
          <select onChange={this.handleFrequencyChange}>
            <option>pitch</option>
            <option value="440">A 440</option>
            <option value="441">A 441</option>
            <option value="442">A 442</option>
            <option value="468.28">A#/Bb</option>
            <option value="496.13">B</option>
            <option value="525.63">C</option>
            <option value="556.88">C#/Db</option>
            <option value="590.00">D</option>
            <option value="625.08">D#/Eb</option>
            <option value="662.25">E</option>
            <option value="701.63">F</option>
            <option value="743.35">F#/Gb</option>
            <option value="787.55">G</option>
            <option value="834.38">G#/Ab</option>
          </select>
          {
            this.state.isTonePlaying ?
            <Fragment>
            <button className="tuner-play-pause-buttons" onClick={this.handleClick}><img src="../mute-img.svg" height="50px"/></button>
            <Tone
              audioContext={this.audioContext}
              play={true}
              frequency={this.state.frequency}
              volume={0.9}
              length={50}
              onStop={this.handleToneStop}
              />
            </Fragment>
            :
            <button className="tuner-play-pause-buttons" onClick={this.handleClick}><img src="../music-note.png" height="50px"/></button>


          }
        </div>
      );
    }
}


export default Tuner;
