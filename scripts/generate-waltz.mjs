// Generate a simple waltz piano WAV file
import { writeFileSync, mkdirSync } from 'fs';

// WAV parameters
const sampleRate = 44100;
const duration = 60; // 60 seconds
const numSamples = sampleRate * duration;
const numChannels = 1;
const bitsPerSample = 16;

// Note frequencies
const notes = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
};

// Piano-like envelope
function pianoEnvelope(t, noteDuration) {
  const attack = 0.01;
  const decay = 0.15;
  const sustain = 0.4;
  const release = 0.3;
  
  if (t < attack) return t / attack;
  if (t < attack + decay) return 1.0 - (1.0 - sustain) * ((t - attack) / decay);
  if (t < noteDuration - release) return sustain * Math.exp(-(t - attack - decay) * 2);
  return sustain * Math.exp(-(noteDuration - release - attack - decay) * 2) * ((noteDuration - t) / release);
}

// Piano tone with harmonics
function pianoTone(freq, t, noteDuration, volume = 0.3) {
  const env = pianoEnvelope(t, noteDuration);
  const fundamental = Math.sin(2 * Math.PI * freq * t);
  const h2 = 0.5 * Math.sin(2 * Math.PI * freq * 2 * t);
  const h3 = 0.25 * Math.sin(2 * Math.PI * freq * 3 * t);
  const h4 = 0.125 * Math.sin(2 * Math.PI * freq * 4 * t);
  const h5 = 0.0625 * Math.sin(2 * Math.PI * freq * 5 * t);
  return volume * env * (fundamental + h2 + h3 + h4 + h5) / 1.9375;
}

// Waltz pattern - 3/4 time, elegant and romantic
// BPM = 100, so one beat = 0.6s, one measure = 1.8s
const bpm = 100;
const beatDuration = 60 / bpm;
const measureDuration = beatDuration * 3;

// Melody and chords for a romantic waltz
// Each entry: [startBeat, noteNames, durationBeats, volume]
// Melody inspired by classical waltz style
const melody = [];
const bassChords = [];

// Pattern repeats every 8 measures
function addWaltzSection(startMeasure) {
  const s = startMeasure * 3; // start beat
  
  // Melody line (right hand) - flowing waltz melody
  const melodyPatterns = [
    // Measure 1: E5 half, D5 quarter
    [[0, ['E5'], 2, 0.35], [2, ['D5'], 1, 0.3]],
    // Measure 2: C5 dotted half
    [[3, ['C5'], 3, 0.35]],
    // Measure 3: D5 half, E5 quarter
    [[6, ['D5'], 2, 0.3], [8, ['E5'], 1, 0.3]],
    // Measure 4: G5 dotted half
    [[9, ['G5'], 3, 0.35]],
    // Measure 5: F5 half, E5 quarter
    [[12, ['F5'], 2, 0.3], [14, ['E5'], 1, 0.3]],
    // Measure 6: D5 half, C5 quarter
    [[15, ['D5'], 2, 0.3], [17, ['C5'], 1, 0.3]],
    // Measure 7: E5 half, D5 quarter
    [[18, ['E5'], 2, 0.35], [20, ['D5'], 1, 0.3]],
    // Measure 8: C5 dotted half
    [[21, ['C5'], 3, 0.35]],
  ];
  
  for (const measure of melodyPatterns) {
    for (const [beat, noteNames, dur, vol] of measure) {
      for (const n of noteNames) {
        melody.push([s + beat, n, dur, vol]);
      }
    }
  }
  
  // Bass (left hand) - classic waltz oom-pah-pah pattern
  const bassPatterns = [
    // Measure 1: C chord
    [0, 'C3', 1, 0.25], [1, 'E4', 0.8, 0.15], [2, 'G4', 0.8, 0.15],
    // Measure 2: A chord (Am)
    [3, 'A3', 1, 0.25], [4, 'C4', 0.8, 0.15], [5, 'E4', 0.8, 0.15],
    // Measure 3: F chord
    [6, 'F3', 1, 0.25], [7, 'A4', 0.8, 0.15], [8, 'C5', 0.8, 0.15],
    // Measure 4: G chord
    [9, 'G3', 1, 0.25], [10, 'B4', 0.8, 0.15], [11, 'D5', 0.8, 0.15],
    // Measure 5: F chord
    [12, 'F3', 1, 0.25], [13, 'A4', 0.8, 0.15], [14, 'C5', 0.8, 0.15],
    // Measure 6: G chord
    [15, 'G3', 1, 0.25], [16, 'B4', 0.8, 0.15], [17, 'D5', 0.8, 0.15],
    // Measure 7: A chord (Am)
    [18, 'A3', 1, 0.25], [19, 'C4', 0.8, 0.15], [20, 'E4', 0.8, 0.15],
    // Measure 8: G chord -> C
    [21, 'G3', 1, 0.25], [22, 'B4', 0.8, 0.15], [23, 'D4', 0.8, 0.15],
  ];
  
  for (const [beat, note, dur, vol] of bassPatterns) {
    bassChords.push([s + beat, note, dur, vol]);
  }
}

// Generate 8 sections to fill ~60s
const totalMeasuresNeeded = Math.ceil(duration / measureDuration);
const sectionsNeeded = Math.ceil(totalMeasuresNeeded / 8);
for (let i = 0; i < sectionsNeeded; i++) {
  addWaltzSection(i * 8);
}

// Render audio
const buffer = new Float64Array(numSamples);

function renderNote(startBeat, noteName, durationBeats, volume) {
  const freq = notes[noteName];
  if (!freq) return;
  const startSample = Math.floor(startBeat * beatDuration * sampleRate);
  const noteDur = durationBeats * beatDuration;
  const endSample = Math.min(startSample + Math.floor(noteDur * sampleRate), numSamples);
  
  for (let i = startSample; i < endSample; i++) {
    const t = (i - startSample) / sampleRate;
    buffer[i] += pianoTone(freq, t, noteDur, volume);
  }
}

// Render melody
for (const [beat, note, dur, vol] of melody) {
  renderNote(beat, note, dur, vol);
}

// Render bass/chords
for (const [beat, note, dur, vol] of bassChords) {
  renderNote(beat, note, dur, vol);
}

// Add gentle reverb (simple delay-based)
const reverbDelay = Math.floor(0.08 * sampleRate);
const reverbAmount = 0.15;
for (let i = reverbDelay; i < numSamples; i++) {
  buffer[i] += buffer[i - reverbDelay] * reverbAmount;
}

// Normalize and add fade in/out
let maxVal = 0;
for (let i = 0; i < numSamples; i++) {
  if (Math.abs(buffer[i]) > maxVal) maxVal = Math.abs(buffer[i]);
}

const fadeInSamples = sampleRate * 2;
const fadeOutSamples = sampleRate * 3;

// Convert to 16-bit PCM
const pcmData = new Int16Array(numSamples);
for (let i = 0; i < numSamples; i++) {
  let sample = buffer[i] / (maxVal || 1) * 0.8;
  
  // Fade in
  if (i < fadeInSamples) sample *= i / fadeInSamples;
  // Fade out
  if (i > numSamples - fadeOutSamples) sample *= (numSamples - i) / fadeOutSamples;
  
  pcmData[i] = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
}

// Build WAV file
const dataSize = numSamples * numChannels * (bitsPerSample / 8);
const headerSize = 44;
const wavBuffer = Buffer.alloc(headerSize + dataSize);

// RIFF header
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + dataSize, 4);
wavBuffer.write('WAVE', 8);

// fmt chunk
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16);
wavBuffer.writeUInt16LE(1, 20); // PCM
wavBuffer.writeUInt16LE(numChannels, 22);
wavBuffer.writeUInt32LE(sampleRate, 24);
wavBuffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
wavBuffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
wavBuffer.writeUInt16LE(bitsPerSample, 34);

// data chunk
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(dataSize, 40);

for (let i = 0; i < numSamples; i++) {
  wavBuffer.writeInt16LE(pcmData[i], headerSize + i * 2);
}

mkdirSync('/vercel/share/v0-project/public/audio', { recursive: true });
writeFileSync('/vercel/share/v0-project/public/audio/waltz.wav', wavBuffer);
console.log('Waltz WAV file generated successfully!');
console.log(`Duration: ${duration}s, Size: ${wavBuffer.length} bytes`);
