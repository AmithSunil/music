import { ChordItem, PitchClass } from '../types/music';

const NOTE_OFFSETS: Record<PitchClass, number> = {
  C: 0,
  'C#': 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11,
};

// Also handle enharmonic strings like Db, D#, Gb, G#, A#
const ENHARMONIC_NORMALIZE: Record<string, PitchClass> = {
  C: 'C',
  'C#': 'C#',
  Db: 'C#',
  D: 'D',
  'D#': 'Eb',
  Eb: 'Eb',
  E: 'E',
  F: 'F',
  'F#': 'F#',
  Gb: 'F#',
  G: 'G',
  'G#': 'Ab',
  Ab: 'Ab',
  A: 'A',
  'A#': 'Bb',
  Bb: 'Bb',
  B: 'B',
};

export function normalizePitchClass(raw: string): PitchClass {
  const cleaned = raw.replace('♯', '#').replace('♭', 'b');
  return ENHARMONIC_NORMALIZE[cleaned] || 'C';
}

/**
 * Converts a note string like "C4", "F#3", "Eb4" to frequency in Hz
 */
export function noteToFrequency(noteStr: string): number {
  const match = noteStr.match(/^([A-G][#b♯♭]?)(\d)$/);
  if (!match) return 261.63; // Default Middle C
  const pitch = normalizePitchClass(match[1]);
  const octave = parseInt(match[2], 10);
  const midi = (octave + 1) * 12 + NOTE_OFFSETS[pitch];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private volume: number = 0.85;
  private loopTimer: number | null = null;
  private scaleTimers: number[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Studio compressor to give piano notes strong sustain body and presence over song previews
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-20, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.004, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.28, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume * 1.35;

      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume * 1.35, this.ctx.currentTime, 0.02);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Plays a rich, full-bodied sustaining stage grand piano note with multi-string unison harmonics
   */
  public playNote(noteWithOctave: string, duration = 2.6, velocity = 0.72) {
    this.initContext();
    if (!this.ctx || !this.compressor) return;

    const now = this.ctx.currentTime;
    const freq = noteToFrequency(noteWithOctave);

    // 1. Primary body oscillator (triangle fundamental)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // 2. Rich string harmonic oscillator (sawtooth blended for realistic piano string resonance)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq, now);
    osc2.detune.setValueAtTime(3.5, now);

    const sawGain = this.ctx.createGain();
    sawGain.gain.setValueAtTime(0.38, now);
    sawGain.gain.exponentialRampToValueAtTime(0.18, now + duration * 0.8);

    // 3. Unison chorus string oscillator (slightly detuned triangle for long singing sustain)
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(freq, now);
    osc3.detune.setValueAtTime(-3.5, now);

    // 4. Harmonic octave & hammer overtone (2x frequency sine that sustains gently)
    const osc4 = this.ctx.createOscillator();
    osc4.type = 'sine';
    osc4.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.32, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.11, now + duration * 0.75);

    // Warm resonant low-pass filter that stays open during sustain
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(1.4, now);
    filter.frequency.setValueAtTime(Math.min(8200, freq * 11), now);
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(1500, freq * 4.8),
      now + duration * 0.85
    );

    // Long, pedal-sustained piano amplitude envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    // Crisp hammer strike
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.009);
    // High sustain plateau so the note rings out clearly for seconds
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.82, now + 0.25);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.56, now + duration * 0.7);
    // Smooth damper release tail
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.55);

    osc1.connect(filter);
    osc3.connect(filter);
    osc2.connect(sawGain);
    sawGain.connect(filter);
    osc4.connect(overtoneGain);
    overtoneGain.connect(filter);

    filter.connect(noteGain);
    noteGain.connect(this.compressor);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc4.start(now);

    const stopTime = now + duration + 0.6;
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);
    osc4.stop(stopTime);
  }

  /**
   * Plays a full chord voicing with warm pedal sustain and subtle human strum (18ms arpeggiation)
   */
  public playChord(notes: string[], duration = 2.8) {
    this.initContext();
    notes.forEach((note, idx) => {
      window.setTimeout(() => {
        this.playNote(note, duration, 0.54);
      }, idx * 18);
    });
  }

  /**
   * Plays the 7-note scale plus the upper octave tonic so the learner hears the resolution
   */
  public playScale(
    scaleNotes: PitchClass[],
    onNoteActive?: (noteWithOctave: string | null) => void
  ) {
    this.clearScaleTimers();
    this.initContext();

    if (scaleNotes.length === 0) return;

    let currentOctave = 3;
    let prevIndex = NOTE_OFFSETS[scaleNotes[0]];
    const fullSequence: string[] = [];

    for (let i = 0; i < scaleNotes.length; i++) {
      const pitch = scaleNotes[i];
      const idx = NOTE_OFFSETS[pitch];
      if (i > 0 && idx < prevIndex) {
        currentOctave = Math.min(4, currentOctave + 1);
      }
      fullSequence.push(`${pitch}${currentOctave}`);
      prevIndex = idx;
    }

    // Add top tonic resolution note
    const tonicIdx = NOTE_OFFSETS[scaleNotes[0]];
    if (tonicIdx < prevIndex) {
      currentOctave = Math.min(4, currentOctave + 1);
    }
    fullSequence.push(`${scaleNotes[0]}${currentOctave}`);

    const stepMs = 280;
    fullSequence.forEach((noteStr, idx) => {
      const isLast = idx === fullSequence.length - 1;
      const t = window.setTimeout(() => {
        this.playNote(noteStr, isLast ? 2.6 : 1.15, isLast ? 0.78 : 0.62);
        onNoteActive?.(noteStr);
      }, idx * stepMs);
      this.scaleTimers.push(t);
    });

    const endTimer = window.setTimeout(() => {
      onNoteActive?.(null);
    }, fullSequence.length * stepMs + 600);
    this.scaleTimers.push(endTimer);
  }

  public clearScaleTimers() {
    this.scaleTimers.forEach((t) => clearTimeout(t));
    this.scaleTimers = [];
  }

  /**
   * Loops a song's chord progression via Web Audio API so learners can isolate the harmony
   */
  public startChordLoop(
    chords: ChordItem[],
    bpm: number = 100,
    onChordChange?: (index: number) => void
  ) {
    this.stopChordLoop();
    if (!chords.length) return;

    const chordDurationMs = Math.max(1400, Math.min(2400, Math.round((60 / bpm) * 2 * 1000)));
    let currentIdx = 0;

    const triggerStep = () => {
      const chord = chords[currentIdx];
      onChordChange?.(currentIdx);
      this.playChord(chord.notes, (chordDurationMs / 1000) * 1.35);
      currentIdx = (currentIdx + 1) % chords.length;
    };

    triggerStep();
    this.loopTimer = window.setInterval(triggerStep, chordDurationMs);
  }

  public stopChordLoop() {
    if (this.loopTimer !== null) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
  }
}

export const soundEngine = new SoundEngine();
