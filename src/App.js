import React from "react";
import { BasicPiano } from "./BasicPiano";
import "./styles.css";

export default function App() {
  const [tone, setTone] = React.useState(0.5);
  const [duration, setDuration] = React.useState(0.5);
  const [volume, setVolume] = React.useState(0.2);

  const context = new AudioContext();

  let arr = [];

  const playNote = (soundData) => {
    const buf = new Float32Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      buf[i] = arr[i];
    }

    const buffer = context.createBuffer(1, buf.length, context.sampleRate);
    buffer.copyToChannel(buf, 0);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  };

  /**
   * Generates a sine waveform.
   *
   * @param {*} sampleNumber
   * @param {*} tone
   */
  const sineWave = (sampleNumber, tone) => {
    const sampleFreq = context.sampleRate / tone;
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)));
  };

  const triangleWave = (sampleNumber, tone) => {
    const sampleFreq = context.sampleRate / tone;
    const sample = sampleNumber % (sampleFreq / (Math.PI * 2));
    return sample - Math.abs((i % (2 * sample)) - sample);
  };

  const squareWaveAt = (sampleNumber, tone) => {
    const sampleFreq = context.sampleRate / tone;
    const sample = sampleNumber / (sampleFreq / (Math.PI * 2));
    return Math.sin(sample);
  };

  /**
   * Parses a specified midi number to a corresponing frequency.
   *
   * @param midiNumber the midi number to parse
   */
  const parseMidiToFrequency = (midiNumber) => {
    let a = 440;
    return (a / 32) * 2 ** ((midiNumber - 9) / 12);
  };

  const onPlayNote = (midiNumber) => {
    const tone = parseMidiToFrequency(midiNumber);
    arr = [];

    for (var i = 0; i < context.sampleRate * duration; i++) {
      arr[i] = squareWaveAt(i, tone) * volume;
    }

    playNote(arr);
  };

  const onStopNote = (midiNumber) => {};

  return (
    <div className="App">
      <BasicPiano playNote={onPlayNote} stopNote={onStopNote} />
    </div>
  );
}
