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

interface ActiveVoice {
  oscillators: OscillatorNode[];
  noteGain: GainNode;
  safetyTimer: number;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private volume: number = 0.85;
  private loopTimer: number | null = null;
  private scaleTimers: number[] = [];
  private activeVoices: Map<string, ActiveVoice> = new Map();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-20, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.004, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

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
   * Starts and sustains a piano note while the key is held down.
   * Call stopNote(noteWithOctave) when the user releases the key.
   */
  public startNote(noteWithOctave: string, velocity = 0.72) {
    this.initContext();
    if (!this.ctx || !this.compressor) return;

    // If this note is already ringing, release the old voice cleanly first
    if (this.activeVoices.has(noteWithOctave)) {
      this.stopNote(noteWithOctave, 0.04);
    }

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
    sawGain.gain.setValueAtTime(0.36, now);
    sawGain.gain.setTargetAtTime(0.14, now + 0.1, 1.8);

    // 3. Unison chorus string oscillator (slightly detuned triangle)
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(freq, now);
    osc3.detune.setValueAtTime(-3.5, now);

    // 4. Harmonic octave overtone (2x frequency sine)
    const osc4 = this.ctx.createOscillator();
    osc4.type = 'sine';
    osc4.frequency.setValueAtTime(freq * 2, now);

    const overtoneGain = this.ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.3, now);
    overtoneGain.gain.setTargetAtTime(0.08, now + 0.08, 1.4);

    // Warm resonant low-pass filter that stays open while the key is held
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(1.3, now);
    filter.frequency.setValueAtTime(Math.min(8200, freq * 11), now);
    filter.frequency.setTargetAtTime(Math.max(1500, freq * 4.5), now + 0.15, 2.2);

    // Hold-to-sustain envelope: crisp attack, then rings for as long as the key is held
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.008);
    // Settle onto a strong held-string sustain plateau; slowly fades over ~10s like a real held piano string
    noteGain.gain.setTargetAtTime(velocity * 0.78, now + 0.01, 0.18);
    noteGain.gain.setTargetAtTime(0.001, now + 0.35, 3.2);

    osc1.connect(filter);
    osc3.connect(filter);
    osc2.connect(sawGain);
    sawGain.connect(filter);
    osc4.connect(overtoneGain);
    overtoneGain.connect(filter);

    filter.connect(noteGain);
    noteGain.connect(this.compressor);

    const oscillators = [osc1, osc2, osc3, osc4];
    oscillators.forEach((osc) => osc.start(now));

    // Safety auto-cleanup after 12 seconds in case a keyup event is missed
    const safetyTimer = window.setTimeout(() => {
      this.stopNote(noteWithOctave);
    }, 12000);

    this.activeVoices.set(noteWithOctave, {
      oscillators,
      noteGain,
      safetyTimer,
    });
  }

  /**
   * Drops the piano damper when the key is released, silencing the note with a natural ~160ms damper tail.
   */
  public stopNote(noteWithOctave: string, releaseSec = 0.16) {
    const voice = this.activeVoices.get(noteWithOctave);
    if (!voice || !this.ctx) return;

    this.activeVoices.delete(noteWithOctave);
    clearTimeout(voice.safetyTimer);

    const now = this.ctx.currentTime;
    const gainParam = voice.noteGain.gain;

    gainParam.cancelScheduledValues(now);
    // Anchor current gain value and ramp smoothly to silence (damper drop)
    const currentVal = Math.max(0.0001, gainParam.value);
    gainParam.setValueAtTime(currentVal, now);
    gainParam.exponentialRampToValueAtTime(0.0001, now + releaseSec);

    const stopAt = now + releaseSec + 0.03;
    voice.oscillators.forEach((osc) => {
      try {
        osc.stop(stopAt);
      } catch {
        // ignore if already stopped
      }
    });
  }

  /**
   * Releases all currently held piano notes immediately
   */
  public stopAllNotes() {
    Array.from(this.activeVoices.keys()).forEach((note) => this.stopNote(note));
  }

  /**
   * Plays a one-shot note for a fixed duration (used by scale player and non-held triggers)
   */
  public playNote(noteWithOctave: string, duration = 0.55, velocity = 0.7) {
    this.startNote(noteWithOctave, velocity);
    window.setTimeout(() => {
      this.stopNote(noteWithOctave, 0.16);
    }, Math.max(120, duration * 1000));
  }

  /**
   * Plays a full chord voicing for a balanced duration
   */
  public playChord(notes: string[], duration = 1.1) {
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

    const tonicIdx = NOTE_OFFSETS[scaleNotes[0]];
    if (tonicIdx < prevIndex) {
      currentOctave = Math.min(4, currentOctave + 1);
    }
    fullSequence.push(`${scaleNotes[0]}${currentOctave}`);

    const stepMs = 260;
    fullSequence.forEach((noteStr, idx) => {
      const isLast = idx === fullSequence.length - 1;
      const t = window.setTimeout(() => {
        this.playNote(noteStr, isLast ? 0.95 : 0.24, isLast ? 0.75 : 0.62);
        onNoteActive?.(noteStr);
      }, idx * stepMs);
      this.scaleTimers.push(t);
    });

    const endTimer = window.setTimeout(() => {
      onNoteActive?.(null);
    }, fullSequence.length * stepMs + 450);
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

    const chordDurationMs = Math.max(1200, Math.min(2200, Math.round((60 / bpm) * 2 * 1000)));
    let currentIdx = 0;

    const triggerStep = () => {
      const chord = chords[currentIdx];
      onChordChange?.(currentIdx);
      this.playChord(chord.notes, (chordDurationMs / 1000) * 0.88);
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
