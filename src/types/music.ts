export type PitchClass =
  | 'C'
  | 'C#'
  | 'D'
  | 'Eb'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'Ab'
  | 'A'
  | 'Bb'
  | 'B';

export type KeyMode = 'major' | 'minor';

export type AccidentalType = 'sharp' | 'flat' | 'none';

export interface KeySignatureInfo {
  id: string; // e.g., "C-major", "F-minor"
  tonic: PitchClass;
  displayName: string; // e.g., "C Major", "F# Minor", "Db Major"
  shortName: string; // e.g., "C", "Fm", "F#m", "Db"
  mode: KeyMode;
  relativeKeyId: string; // e.g., "A-minor" for "C-major"
  parallelKeyId: string; // e.g., "C-minor" for "C-major"
  accidentalType: AccidentalType;
  accidentalCount: number; // 0 to 6
  accidentals: string[]; // e.g., ['F#', 'C#'] or ['Bb', 'Eb', 'Ab', 'Db']
  scaleNotes: PitchClass[]; // 7 canonical pitch classes in ascending order from tonic
  scaleNoteNames: string[]; // Spelled correctly (e.g., ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'])
  circleIndex: number; // 0 to 11 clockwise around the Circle of Fifths (0 = C / Am)
  difficulty: 1 | 2 | 3; // 1 = Beginner (0-1), 2 = Intermediate (2-3), 3 = Advanced (4-6)
  moodDescription: string;
}

export interface ChordItem {
  symbol: string; // e.g., "Fm", "Db", "Ab", "Eb"
  roman: string; // e.g., "i", "VI", "III", "VII"
  functionLabel: string; // e.g., "Tonic (Home)", "Submediant", "Mediant", "Subtonic"
  notes: string[]; // e.g., ["F3", "Ab3", "C4"]
}

export interface DiatonicChordOption extends ChordItem {
  degree: number; // 1..7 (or 0 for borrowed/special chord)
  quality: 'major' | 'minor' | 'diminished' | 'dominant7' | 'borrowed';
  rootNoteName: string; // e.g., "F", "A♭"
  isBorrowedOrVariation?: boolean;
}

export interface SongChallenge {
  id: string;
  title: string;
  artist: string;
  year: number;
  itunesQuery: string;
  keyId: string; // references KeySignatureInfo.id
  bpm: number;
  difficulty: 1 | 2 | 3;
  chords: ChordItem[];
  earClue: string; // Specific listening tip for finding the tonic in this song
  theoryExplanation: {
    whyThisTonic: string;
    whyMajorOrMinor: string;
    keySignatureRule: string;
    cadenceInsight: string;
  };
}

export type NoteTagStatus = 'unmarked' | 'fits' | 'clashes' | 'home';

export type TagToolMode = 'play' | 'fits' | 'home' | 'clashes';

export interface ItunesTrackPreview {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  previewUrl: string;
  artworkUrl: string;
}

export interface KeyMasteryRecord {
  attempts: number;
  correct: number;
  lastPracticed?: number;
}

export interface UserProgress {
  xp: number;
  currentStreak: number;
  bestStreak: number;
  completedSongIds: string[];
  chordCompletedSongIds: string[];
  keyMastery: Record<string, KeyMasteryRecord>;
}
