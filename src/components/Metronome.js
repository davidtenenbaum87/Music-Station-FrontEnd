import React, { Component } from 'react';
import metro1 from './metro1.wav';
import metro2 from './metro2.wav';
import '../lib/metronome.css';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      count: 0,
      bpm: 60,
      beatsPerMeasure: 0,

    };
    this.click1 = new Audio(metro1);
    this.click2 = new Audio(metro2);
  }


  handleBpmChange = (event) => {
    const bpm = event.target.value;
    this.setState({ bpm });
  }

  handleBPMeasureChange = (event) => {
    const beatsPerMeasure = event.target.value;
    this.setState({ beatsPerMeasure })
  }

  startStop = () => {
    if(this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true,
        // Play a click "immediately" (after setState finishes)
      }, this.playClick);
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if(count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
  }

  // Keep track of which beat we're on
  this.setState(state => ({
    count: (state.count + 1) % state.beatsPerMeasure
  }));
  }


  render() {
    const { playing, bpm, beatsPerMeasure } = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <label htmlFor="beats-per-measure">Beats Per Measure: </label>
          <input
            type="number"
            min="0"
            max="8"
            name="beats-per-measure"
            value={beatsPerMeasure}
            onChange={this.handleBPMeasureChange}
          />
        <label htmlFor="beats-per-minute">{bpm} BPM</label>
          <input
            type="range"
            min="40"
            max="218"
            name="beats-per-minute"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>

        {/* Add the onClick handler: */}
        <button onClick={this.startStop}>
        { playing ? 'Off' : 'On' }
        </button>
      </div>
    );
  }
}

export default Metronome;
