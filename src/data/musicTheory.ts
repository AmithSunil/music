import { ChordItem, DiatonicChordOption, KeySignatureInfo, PitchClass } from '../types/music';

export const CHROMATIC_PITCHES: PitchClass[] = [
  'C',
  'C#',
  'D',
  'Eb',
  'E',
  'F',
  'F#',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

export const PITCH_DISPLAY_LABELS: Record<PitchClass, { primary: string; enharmonic?: string }> = {
  C: { primary: 'C' },
  'C#': { primary: 'C♯ / D♭', enharmonic: 'D♭' },
  D: { primary: 'D' },
  Eb: { primary: 'E♭ / D♯', enharmonic: 'D♯' },
  E: { primary: 'E' },
  F: { primary: 'F' },
  'F#': { primary: 'F♯ / G♭', enharmonic: 'G♭' },
  G: { primary: 'G' },
  Ab: { primary: 'A♭ / G♯', enharmonic: 'G♯' },
  A: { primary: 'A' },
  Bb: { primary: 'B♭ / A♯', enharmonic: 'A♯' },
  B: { primary: 'B' },
};

// Standard order of sharps and flats on a musical staff
export const SHARP_ORDER = ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯', 'B♯'];
export const FLAT_ORDER = ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'];

/**
 * All 24 canonical Major and Minor Key Signatures ordered around the Circle of Fifths (0 to 11)
 */
export const KEY_SIGNATURES: KeySignatureInfo[] = [
  // 0: C Major / A Minor (0 sharps/flats)
  {
    id: 'C-major',
    tonic: 'C',
    displayName: 'C Major',
    shortName: 'C',
    mode: 'major',
    relativeKeyId: 'A-minor',
    parallelKeyId: 'C-minor',
    accidentalType: 'none',
    accidentalCount: 0,
    accidentals: [],
    scaleNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    scaleNoteNames: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    circleIndex: 0,
    difficulty: 1,
    moodDescription: 'Pure, open, bright, and grounded (all white keys)',
  },
  {
    id: 'A-minor',
    tonic: 'A',
    displayName: 'A Minor',
    shortName: 'Am',
    mode: 'minor',
    relativeKeyId: 'C-major',
    parallelKeyId: 'A-major',
    accidentalType: 'none',
    accidentalCount: 0,
    accidentals: [],
    scaleNotes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    scaleNoteNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    circleIndex: 0,
    difficulty: 1,
    moodDescription: 'Melancholic, reflective, and direct (all white keys)',
  },

  // 1: G Major / E Minor (1 sharp: F#)
  {
    id: 'G-major',
    tonic: 'G',
    displayName: 'G Major',
    shortName: 'G',
    mode: 'major',
    relativeKeyId: 'E-minor',
    parallelKeyId: 'G-minor',
    accidentalType: 'sharp',
    accidentalCount: 1,
    accidentals: ['F♯'],
    scaleNotes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    scaleNoteNames: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'],
    circleIndex: 1,
    difficulty: 1,
    moodDescription: 'Warm, folk/rock anthem brightness, uplifting',
  },
  {
    id: 'E-minor',
    tonic: 'E',
    displayName: 'E Minor',
    shortName: 'Em',
    mode: 'minor',
    relativeKeyId: 'G-major',
    parallelKeyId: 'E-major',
    accidentalType: 'sharp',
    accidentalCount: 1,
    accidentals: ['F♯'],
    scaleNotes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    scaleNoteNames: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D'],
    circleIndex: 1,
    difficulty: 1,
    moodDescription: 'Brooding, acoustic/guitar-friendly, earnest',
  },

  // 2: D Major / B Minor (2 sharps: F#, C#)
  {
    id: 'D-major',
    tonic: 'D',
    displayName: 'D Major',
    shortName: 'D',
    mode: 'major',
    relativeKeyId: 'B-minor',
    parallelKeyId: 'D-minor',
    accidentalType: 'sharp',
    accidentalCount: 2,
    accidentals: ['F♯', 'C♯'],
    scaleNotes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    scaleNoteNames: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
    circleIndex: 2,
    difficulty: 2,
    moodDescription: 'Triumphant, radiant, and celebratory',
  },
  {
    id: 'B-minor',
    tonic: 'B',
    displayName: 'B Minor',
    shortName: 'Bm',
    mode: 'minor',
    relativeKeyId: 'D-major',
    parallelKeyId: 'B-major',
    accidentalType: 'sharp',
    accidentalCount: 2,
    accidentals: ['F♯', 'C♯'],
    scaleNotes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
    scaleNoteNames: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A'],
    circleIndex: 2,
    difficulty: 2,
    moodDescription: 'Dramatic, cinematic, nocturnal tension',
  },

  // 3: A Major / F# Minor (3 sharps: F#, C#, G#)
  {
    id: 'A-major',
    tonic: 'A',
    displayName: 'A Major',
    shortName: 'A',
    mode: 'major',
    relativeKeyId: 'F#-minor',
    parallelKeyId: 'A-minor',
    accidentalType: 'sharp',
    accidentalCount: 3,
    accidentals: ['F♯', 'C♯', 'G♯'],
    scaleNotes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'.replace('G#', 'Ab') as PitchClass],
    scaleNoteNames: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'],
    circleIndex: 3,
    difficulty: 2,
    moodDescription: 'Sparkling, confident, emotional pop ballad clarity',
  },
  {
    id: 'F#-minor',
    tonic: 'F#',
    displayName: 'F♯ Minor',
    shortName: 'F♯m',
    mode: 'minor',
    relativeKeyId: 'A-major',
    parallelKeyId: 'F#-major',
    accidentalType: 'sharp',
    accidentalCount: 3,
    accidentals: ['F♯', 'C♯', 'G♯'],
    scaleNotes: ['F#', 'Ab', 'A', 'B', 'C#', 'D', 'E'],
    scaleNoteNames: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E'],
    circleIndex: 3,
    difficulty: 2,
    moodDescription: 'Urgent, passionate, driving rhythmic energy',
  },

  // 4: E Major / C# Minor (4 sharps: F#, C#, G#, D#)
  {
    id: 'E-major',
    tonic: 'E',
    displayName: 'E Major',
    shortName: 'E',
    mode: 'major',
    relativeKeyId: 'C#-minor',
    parallelKeyId: 'E-minor',
    accidentalType: 'sharp',
    accidentalCount: 4,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯'],
    scaleNotes: ['E', 'F#', 'Ab', 'A', 'B', 'C#', 'Eb'],
    scaleNoteNames: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'],
    circleIndex: 4,
    difficulty: 3,
    moodDescription: 'Brilliant, soaring, electric guitar warmth',
  },
  {
    id: 'C#-minor',
    tonic: 'C#',
    displayName: 'C♯ Minor',
    shortName: 'C♯m',
    mode: 'minor',
    relativeKeyId: 'E-major',
    parallelKeyId: 'Db-major',
    accidentalType: 'sharp',
    accidentalCount: 4,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯'],
    scaleNotes: ['C#', 'Eb', 'E', 'F#', 'Ab', 'A', 'B'],
    scaleNoteNames: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B'],
    circleIndex: 4,
    difficulty: 3,
    moodDescription: 'Deep, modern pop groove, hypnotic and intense',
  },

  // 5: B Major / G# Minor (5 sharps: F#, C#, G#, D#, A#)
  {
    id: 'B-major',
    tonic: 'B',
    displayName: 'B Major',
    shortName: 'B',
    mode: 'major',
    relativeKeyId: 'Ab-minor',
    parallelKeyId: 'B-minor',
    accidentalType: 'sharp',
    accidentalCount: 5,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
    scaleNotes: ['B', 'C#', 'Eb', 'E', 'F#', 'Ab', 'Bb'],
    scaleNoteNames: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'],
    circleIndex: 5,
    difficulty: 3,
    moodDescription: 'Shimmering, bright, crystalline',
  },
  {
    id: 'Ab-minor',
    tonic: 'Ab',
    displayName: 'G♯ / A♭ Minor',
    shortName: 'G♯m',
    mode: 'minor',
    relativeKeyId: 'B-major',
    parallelKeyId: 'Ab-major',
    accidentalType: 'sharp',
    accidentalCount: 5,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
    scaleNotes: ['Ab', 'Bb', 'B', 'C#', 'Eb', 'E', 'F#'],
    scaleNoteNames: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯'],
    circleIndex: 5,
    difficulty: 3,
    moodDescription: 'Mysterious, moody R&B and synth-pop',
  },

  // 6: F# Major / Eb Minor (6 sharps / 6 flats)
  {
    id: 'F#-major',
    tonic: 'F#',
    displayName: 'F♯ / G♭ Major',
    shortName: 'F♯',
    mode: 'major',
    relativeKeyId: 'Eb-minor',
    parallelKeyId: 'F#-minor',
    accidentalType: 'sharp',
    accidentalCount: 6,
    accidentals: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'],
    scaleNotes: ['F#', 'Ab', 'Bb', 'B', 'C#', 'Eb', 'F'],
    scaleNoteNames: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
    circleIndex: 6,
    difficulty: 3,
    moodDescription: 'Lush, black-key rich, dreamy and expansive',
  },
  {
    id: 'Eb-minor',
    tonic: 'Eb',
    displayName: 'E♭ / D♯ Minor',
    shortName: 'E♭m',
    mode: 'minor',
    relativeKeyId: 'F#-major',
    parallelKeyId: 'Eb-major',
    accidentalType: 'flat',
    accidentalCount: 6,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'],
    scaleNotes: ['Eb', 'F', 'F#', 'Ab', 'Bb', 'B', 'C#'],
    scaleNoteNames: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭'],
    circleIndex: 6,
    difficulty: 3,
    moodDescription: 'Funky, soulful black-keyclavinet/piano groove',
  },

  // 7: Db Major / Bb Minor (5 flats: Bb, Eb, Ab, Db, Gb)
  {
    id: 'Db-major',
    tonic: 'C#',
    displayName: 'D♭ Major',
    shortName: 'D♭',
    mode: 'major',
    relativeKeyId: 'Bb-minor',
    parallelKeyId: 'C#-minor',
    accidentalType: 'flat',
    accidentalCount: 5,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'],
    scaleNotes: ['C#', 'Eb', 'F', 'F#', 'Ab', 'Bb', 'C'],
    scaleNoteNames: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'],
    circleIndex: 7,
    difficulty: 3,
    moodDescription: 'Velvety, romantic, nostalgic synth-rock warmth',
  },
  {
    id: 'Bb-minor',
    tonic: 'Bb',
    displayName: 'B♭ Minor',
    shortName: 'B♭m',
    mode: 'minor',
    relativeKeyId: 'Db-major',
    parallelKeyId: 'Bb-major',
    accidentalType: 'flat',
    accidentalCount: 5,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'],
    scaleNotes: ['Bb', 'C', 'C#', 'Eb', 'F', 'F#', 'Ab'],
    scaleNoteNames: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭'],
    circleIndex: 7,
    difficulty: 3,
    moodDescription: 'Dark, nocturnal, electronic & hip-hop swagger',
  },

  // 8: Ab Major / F Minor (4 flats: Bb, Eb, Ab, Db)
  {
    id: 'Ab-major',
    tonic: 'Ab',
    displayName: 'A♭ Major',
    shortName: 'A♭',
    mode: 'major',
    relativeKeyId: 'F-minor',
    parallelKeyId: 'Ab-minor',
    accidentalType: 'flat',
    accidentalCount: 4,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭'],
    scaleNotes: ['Ab', 'Bb', 'C', 'C#', 'Eb', 'F', 'G'],
    scaleNoteNames: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'],
    circleIndex: 8,
    difficulty: 3,
    moodDescription: 'Grand, orchestral pop, warm and regal',
  },
  {
    id: 'F-minor',
    tonic: 'F',
    displayName: 'F Minor',
    shortName: 'Fm',
    mode: 'minor',
    relativeKeyId: 'Ab-major',
    parallelKeyId: 'F-major',
    accidentalType: 'flat',
    accidentalCount: 4,
    accidentals: ['B♭', 'E♭', 'A♭', 'D♭'],
    scaleNotes: ['F', 'G', 'Ab', 'Bb', 'C', 'C#', 'Eb'],
    scaleNoteNames: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭'],
    circleIndex: 8,
    difficulty: 2,
    moodDescription: 'Sleek synthwave drive, emotional urgency',
  },

  // 9: Eb Major / C Minor (3 flats: Bb, Eb, Ab)
  {
    id: 'Eb-major',
    tonic: 'Eb',
    displayName: 'E♭ Major',
    shortName: 'E♭',
    mode: 'major',
    relativeKeyId: 'C-minor',
    parallelKeyId: 'Eb-minor',
    accidentalType: 'flat',
    accidentalCount: 3,
    accidentals: ['B♭', 'E♭', 'A♭'],
    scaleNotes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    scaleNoteNames: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
    circleIndex: 9,
    difficulty: 2,
    moodDescription: 'Heroic, rich piano ballad resonance',
  },
  {
    id: 'C-minor',
    tonic: 'C',
    displayName: 'C Minor',
    shortName: 'Cm',
    mode: 'minor',
    relativeKeyId: 'Eb-major',
    parallelKeyId: 'C-major',
    accidentalType: 'flat',
    accidentalCount: 3,
    accidentals: ['B♭', 'E♭', 'A♭'],
    scaleNotes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    scaleNoteNames: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭'],
    circleIndex: 9,
    difficulty: 2,
    moodDescription: 'Stormy, soulful powerhouse, dramatic resolve',
  },

  // 10: Bb Major / G Minor (2 flats: Bb, Eb)
  {
    id: 'Bb-major',
    tonic: 'Bb',
    displayName: 'B♭ Major',
    shortName: 'B♭',
    mode: 'major',
    relativeKeyId: 'G-minor',
    parallelKeyId: 'Bb-minor',
    accidentalType: 'flat',
    accidentalCount: 2,
    accidentals: ['B♭', 'E♭'],
    scaleNotes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    scaleNoteNames: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
    circleIndex: 10,
    difficulty: 2,
    moodDescription: 'Soulful, brassy, optimistic and smooth',
  },
  {
    id: 'G-minor',
    tonic: 'G',
    displayName: 'G Minor',
    shortName: 'Gm',
    mode: 'minor',
    relativeKeyId: 'Bb-major',
    parallelKeyId: 'G-major',
    accidentalType: 'flat',
    accidentalCount: 2,
    accidentals: ['B♭', 'E♭'],
    scaleNotes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
    scaleNoteNames: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F'],
    circleIndex: 10,
    difficulty: 1,
    moodDescription: 'Cool, bass-driven, playful yet dark',
  },

  // 11: F Major / D Minor (1 flat: Bb)
  {
    id: 'F-major',
    tonic: 'F',
    displayName: 'F Major',
    shortName: 'F',
    mode: 'major',
    relativeKeyId: 'D-minor',
    parallelKeyId: 'F-minor',
    accidentalType: 'flat',
    accidentalCount: 1,
    accidentals: ['B♭'],
    scaleNotes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    scaleNoteNames: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'],
    circleIndex: 11,
    difficulty: 1,
    moodDescription: 'Pastoral, comforting, warm and conversational',
  },
  {
    id: 'D-minor',
    tonic: 'D',
    displayName: 'D Minor',
    shortName: 'Dm',
    mode: 'minor',
    relativeKeyId: 'F-major',
    parallelKeyId: 'D-major',
    accidentalType: 'flat',
    accidentalCount: 1,
    accidentals: ['B♭'],
    scaleNotes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    scaleNoteNames: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C'],
    circleIndex: 11,
    difficulty: 1,
    moodDescription: 'Solemn, classical gravity, haunting and bold',
  },
];

export const KEY_MAP: Record<string, KeySignatureInfo> = Object.fromEntries(
  KEY_SIGNATURES.map((k) => [k.id, k])
);

export function getKeyById(id: string): KeySignatureInfo {
  return KEY_MAP[id] || KEY_SIGNATURES[0];
}

export function getRelativeKey(key: KeySignatureInfo): KeySignatureInfo {
  return getKeyById(key.relativeKeyId);
}

/**
 * Deduces the best matching keys based on the user's marked piano notes:
 * - 'fits' notes should belong to key.scaleNotes
 * - 'clashes' notes should NOT belong to key.scaleNotes
 * - 'home' note gives a strong boost to keys whose tonic matches that pitch
 */
export function deduceCandidateKeys(
  fitsPitches: PitchClass[],
  clashesPitches: PitchClass[],
  homePitch: PitchClass | null
): { key: KeySignatureInfo; matchScore: number; fitsMatched: number; clashesAvoided: number }[] {
  return KEY_SIGNATURES.map((key) => {
    const scaleSet = new Set<PitchClass>(key.scaleNotes);
    let fitsMatched = 0;
    for (const p of fitsPitches) {
      if (scaleSet.has(p)) fitsMatched++;
    }
    let clashesAvoided = 0;
    for (const p of clashesPitches) {
      if (!scaleSet.has(p)) clashesAvoided++;
    }

    const totalChecks = fitsPitches.length + clashesPitches.length;
    let score = totalChecks > 0 ? ((fitsMatched + clashesAvoided) / totalChecks) * 100 : 50;

    if (homePitch) {
      if (key.tonic === homePitch) {
        score = Math.min(100, score + 22);
      } else if (scaleSet.has(homePitch)) {
        score = Math.max(0, score - 10);
      } else {
        score = Math.max(0, score - 35);
      }
    }

    return {
      key,
      matchScore: Math.round(score),
      fitsMatched,
      clashesAvoided,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

const MAJOR_ROMANS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
const MAJOR_QUALITIES: DiatonicChordOption['quality'][] = [
  'major',
  'minor',
  'minor',
  'major',
  'major',
  'minor',
  'diminished',
];
const MAJOR_FUNCTIONS = [
  'Tonic (Home)',
  'Supertonic',
  'Mediant',
  'Subdominant',
  'Dominant',
  'Relative Minor (Submediant)',
  'Leading-Tone Diminished',
];

const MINOR_ROMANS = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];
const MINOR_QUALITIES: DiatonicChordOption['quality'][] = [
  'minor',
  'diminished',
  'major',
  'minor',
  'minor',
  'major',
  'major',
];
const MINOR_FUNCTIONS = [
  'Tonic (Home)',
  'Supertonic Diminished',
  'Relative Major (Mediant)',
  'Subdominant Minor',
  'Minor Dominant',
  'Submediant Major',
  'Subtonic Major',
];

/**
 * Generates the complete palette of 7 diatonic triads for a key signature,
 * plus merges any song-specific chord variations (e.g. V7 harmonic minor, 7th chords, or borrowed Dorian IV)
 * so learners can audition and identify every chord in the song.
 */
export function getDiatonicChordPalette(
  keyInfo: KeySignatureInfo,
  songChords: ChordItem[] = []
): DiatonicChordOption[] {
  const isMajor = keyInfo.mode === 'major';
  const romans = isMajor ? MAJOR_ROMANS : MINOR_ROMANS;
  const qualities = isMajor ? MAJOR_QUALITIES : MINOR_QUALITIES;
  const functions = isMajor ? MAJOR_FUNCTIONS : MINOR_FUNCTIONS;

  const pitchOrder: Record<PitchClass, number> = {
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

  const palette: DiatonicChordOption[] = keyInfo.scaleNotes.map((rootPitch, i) => {
    const rootDisplay = keyInfo.scaleNoteNames[i];
    const quality = qualities[i];
    const suffix = quality === 'minor' ? 'm' : quality === 'diminished' ? 'dim' : '';
    const symbol = `${rootDisplay.replace('♯', '#').replace('♭', 'b')}${suffix}`;

    const thirdPitch = keyInfo.scaleNotes[(i + 2) % 7];
    const fifthPitch = keyInfo.scaleNotes[(i + 4) % 7];

    // Assign realistic octaves ascending from root in octave 3
    const rootIdx = pitchOrder[rootPitch];
    const thirdOct = pitchOrder[thirdPitch] < rootIdx ? 4 : 3;
    const fifthOct = pitchOrder[fifthPitch] < pitchOrder[thirdPitch] ? thirdOct + 1 : thirdOct;

    const notes = [`${rootPitch}3`, `${thirdPitch}${thirdOct}`, `${fifthPitch}${fifthOct}`];

    return {
      symbol,
      roman: romans[i],
      functionLabel: functions[i],
      notes,
      degree: i + 1,
      quality,
      rootNoteName: rootDisplay,
    };
  });

  // Ensure every chord used in the current song is represented in the palette
  // (Either matching an existing diatonic triad by symbol, or added as a variation/borrowed chord)
  for (const sc of songChords) {
    const existingIdx = palette.findIndex(
      (p) => p.symbol.toLowerCase() === sc.symbol.toLowerCase()
    );
    if (existingIdx >= 0) {
      // Upgrade the voicing/function to match the song's exact voicing so ear-comparison is identical
      palette[existingIdx] = {
        ...palette[existingIdx],
        notes: sc.notes,
        roman: sc.roman,
        functionLabel: sc.functionLabel,
      };
    } else {
      // Check if it's a 7th or variation of a scale degree, or add as an extra card
      const rawRoot = sc.notes[0]?.replace(/\d$/, '') || sc.symbol.replace(/[^A-G#b]/g, '');
      palette.push({
        symbol: sc.symbol,
        roman: sc.roman,
        functionLabel: sc.functionLabel,
        notes: sc.notes,
        degree: 0,
        quality: sc.symbol.includes('7') ? 'dominant7' : 'borrowed',
        rootNoteName: rawRoot.replace('#', '♯').replace('b', '♭'),
        isBorrowedOrVariation: true,
      });
    }
  }

  return palette;
}
