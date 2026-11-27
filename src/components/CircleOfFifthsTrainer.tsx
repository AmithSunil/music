import React, { useMemo, useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  Volume2,
  Play,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Trophy,
  Clock,
  Music,
  Layers,
  Brain,
  HelpCircle,
} from 'lucide-react';
import {
  FLAT_ORDER,
  getDiatonicChordPalette,
  getKeyById,
  getRelativeKey,
  KEY_SIGNATURES,
  SHARP_ORDER,
} from '../data/musicTheory';
import { soundEngine } from '../services/audioEngine';
import { KeySignatureInfo } from '../types/music';
import { KeySignatureStaff } from './KeySignatureStaff';

interface CircleOfFifthsTrainerProps {
  completedSteps: number[];
  onCompleteStep: (stepNumber: number, xpReward: number) => void;
  onHighlightPianoNotes: (notes: string[], label?: string) => void;
  onSelectRevealedKey: (key: KeySignatureInfo | null) => void;
}

interface CurriculumStep {
  number: number;
  shortTitle: string;
  title: string;
  subtitle: string;
  memoryRuleBadge: string;
  xpReward: number;
}

const CURRICULUM_STEPS: CurriculumStep[] = [
  {
    number: 1,
    shortTitle: '1. Sharp Clock',
    title: 'Step 1: The Clock Face & Sharp Keys (Clockwise)',
    subtitle:
      'Start at 12 o’clock (C Major = 0 sharps/flats). Every hour clockwise moves up a Perfect 5th and adds +1 Sharp (♯).',
    memoryRuleBadge: 'Cats Go Down Alleys Eating Birds (C–G–D–A–E–B–F♯)',
    xpReward: 50,
  },
  {
    number: 2,
    shortTitle: '2. Flat "BEAD" Trick',
    title: 'Step 2: Counter-Clockwise & The "F + BEAD" Flat Trick',
    subtitle:
      'Going counter-clockwise from C adds +1 Flat (♭) each hour. Start with F ("First Flat"), then literally spell the word B-E-A-D (+ G)!',
    memoryRuleBadge: 'F → B♭ – E♭ – A♭ – D♭ – G♭ ("F + BEAD + G")',
    xpReward: 50,
  },
  {
    number: 3,
    shortTitle: '3. Staff Shortcuts',
    title: 'Step 3: Order of Sharps & Flats + 2 Instant Staff Shortcuts',
    subtitle:
      'Never count every sharp or flat from scratch again—use the Mirror Sentence and the 2-second visual staff tricks.',
    memoryRuleBadge: 'Last Sharp + ½ Step = Key • 2nd-to-Last Flat = Key',
    xpReward: 50,
  },
  {
    number: 4,
    shortTitle: '4. Relative Minors',
    title: 'Step 4: The Inner Ring — Relative Minors ("3 Hours Clockwise")',
    subtitle:
      'Every Major key shares its exact key signature with an inner Relative Minor key. Learn the 90° Clock Rotation trick!',
    memoryRuleBadge: 'Look 3 Hours Clockwise (or Down 3 Half-Steps on Piano)',
    xpReward: 50,
  },
  {
    number: 5,
    shortTitle: '5. 6-Chord Wedge',
    title: 'Step 5: The Magic 6-Chord "Pizza Wedge" Neighborhood',
    subtitle:
      'In any key, the 6 main chords (I, IV, V, ii, iii, vi) always sit touching each other in a 3-hour slice of the Circle!',
    memoryRuleBadge: 'Left = IV • Center = I • Right = V • Inner 3 = ii, vi, iii',
    xpReward: 50,
  },
  {
    number: 6,
    shortTitle: '6. Memory Drills',
    title: 'Step 6: Fill-in-the-Clock Builder & Rapid Recall Quiz',
    subtitle:
      'Test your recall by building the Circle of Fifths from memory or answering rapid-fire mnemonic flashcards!',
    memoryRuleBadge: 'Active Recall Mastery',
    xpReward: 100,
  },
];

// Step 1 Mnemonic Words (Clockwise 0..6)
const SHARP_MNEMONIC_ITEMS = [
  { circleIndex: 0, keyId: 'C-major', letter: 'C', word: 'Cats', sharps: 0, clock: '12:00', rootNote: 'C4' },
  { circleIndex: 1, keyId: 'G-major', letter: 'G', word: 'Go', sharps: 1, clock: '1:00', rootNote: 'G3' },
  { circleIndex: 2, keyId: 'D-major', letter: 'D', word: 'Down', sharps: 2, clock: '2:00', rootNote: 'D4' },
  { circleIndex: 3, keyId: 'A-major', letter: 'A', word: 'Alleys', sharps: 3, clock: '3:00', rootNote: 'A3' },
  { circleIndex: 4, keyId: 'E-major', letter: 'E', word: 'Eating', sharps: 4, clock: '4:00', rootNote: 'E4' },
  { circleIndex: 5, keyId: 'B-major', letter: 'B', word: 'Birds', sharps: 5, clock: '5:00', rootNote: 'B3' },
  { circleIndex: 6, keyId: 'F#-major', letter: 'F♯', word: 'Fish', sharps: 6, clock: '6:00', rootNote: 'F#4' },
];

// Step 2 Mnemonic Items (Counter-clockwise 0, 11, 10, 9, 8, 7, 6)
const FLAT_MNEMONIC_ITEMS = [
  { circleIndex: 0, keyId: 'C-major', label: 'C', tag: '0♭ Start', flats: 0, clock: '12:00', rootNote: 'C4', isBead: false },
  { circleIndex: 11, keyId: 'F-major', label: 'F', tag: 'First Flat!', flats: 1, clock: '11:00', rootNote: 'F3', isBead: false },
  { circleIndex: 10, keyId: 'Bb-major', label: 'B♭', tag: 'B in BEAD', flats: 2, clock: '10:00', rootNote: 'Bb3', isBead: true },
  { circleIndex: 9, keyId: 'Eb-major', label: 'E♭', tag: 'E in BEAD', flats: 3, clock: '9:00', rootNote: 'Eb4', isBead: true },
  { circleIndex: 8, keyId: 'Ab-major', label: 'A♭', tag: 'A in BEAD', flats: 4, clock: '8:00', rootNote: 'Ab3', isBead: true },
  { circleIndex: 7, keyId: 'Db-major', label: 'D♭', tag: 'D in BEAD', flats: 5, clock: '7:00', rootNote: 'C#4', isBead: true },
  { circleIndex: 6, keyId: 'F#-major', label: 'G♭', tag: '+ G (6♭)', flats: 6, clock: '6:00', rootNote: 'F#3', isBead: false },
];

// Step 3 Mnemonic words for Order of Sharps / Flats
const ORDER_SHARP_WORDS = ['Father', 'Charles', 'Goes', 'Down', 'And', 'Ends', 'Battle'];
const ORDER_FLAT_WORDS = ['Battle', 'Ends', 'And', 'Down', 'Goes', 'Charles’', 'Father'];

interface FlashcardQuestion {
  id: string;
  question: string;
  mnemonicTip: string;
  options: string[];
  correctAnswer: string;
  highlightKeyId: string;
}

const FLASHCARD_QUESTIONS: FlashcardQuestion[] = [
  {
    id: 'q1',
    question: 'At 2 o’clock on the Circle of Fifths (2 sharps), which Major key do you land on?',
    mnemonicTip: 'Count from 12:00 (C): Cats (0) → Go (1♯) → Down (2♯)!',
    options: ['G Major', 'D Major', 'A Major', 'E Major'],
    correctAnswer: 'D Major',
    highlightKeyId: 'D-major',
  },
  {
    id: 'q2',
    question: 'Using the "F + BEAD" trick counter-clockwise, which Major key has 3 flats (9 o’clock)?',
    mnemonicTip: '1♭ = F, 2♭ = B♭ (B), 3♭ = E♭ (E in BEAD)!',
    options: ['B♭ Major', 'E♭ Major', 'A♭ Major', 'D♭ Major'],
    correctAnswer: 'E♭ Major',
    highlightKeyId: 'Eb-major',
  },
  {
    id: 'q3',
    question: 'A key signature has 4 sharps (F♯, C♯, G♯, D♯). Using the "Last Sharp + ½ Step" rule, what Major key is it?',
    mnemonicTip: 'The last sharp is D♯. One half-step above D♯ on the piano is E!',
    options: ['A Major', 'E Major', 'B Major', 'D Major'],
    correctAnswer: 'E Major',
    highlightKeyId: 'E-major',
  },
  {
    id: 'q4',
    question: 'A flat key signature has 4 flats: B♭, E♭, A♭, D♭. Using the "2nd-to-Last Flat" shortcut, what Major key is it?',
    mnemonicTip: 'Look at the second-to-last flat in the list (B♭, E♭, [A♭], D♭) → A♭ Major!',
    options: ['E♭ Major', 'A♭ Major', 'D♭ Major', 'F Major'],
    correctAnswer: 'A♭ Major',
    highlightKeyId: 'Ab-major',
  },
  {
    id: 'q5',
    question: 'What is the Relative Minor of G Major (at 1 o’clock)?',
    mnemonicTip: 'Look 3 hours clockwise from 1:00 on the outer ring (1 + 3 = 4:00, which is E) → E Minor!',
    options: ['A Minor', 'E Minor', 'B Minor', 'D Minor'],
    correctAnswer: 'E Minor',
    highlightKeyId: 'E-minor',
  },
  {
    id: 'q6',
    question: 'What is the Relative Minor of E♭ Major (at 9 o’clock, 3 flats)?',
    mnemonicTip: 'Look 3 hours clockwise from 9:00 on the outer ring (9 + 3 = 12:00, which is C) → C Minor!',
    options: ['G Minor', 'C Minor', 'F Minor', 'D Minor'],
    correctAnswer: 'C Minor',
    highlightKeyId: 'C-minor',
  },
  {
    id: 'q7',
    question: 'In the 6-Chord Neighborhood Wedge for C Major (12 o’clock), what are its IV (left) and V (right) chords?',
    mnemonicTip: '11:00 (counter-clockwise) = F Major (IV) and 1:00 (clockwise) = G Major (V)!',
    options: ['F Major & G Major', 'G Major & D Major', 'B♭ Major & F Major', 'D Major & A Major'],
    correctAnswer: 'F Major & G Major',
    highlightKeyId: 'C-major',
  },
  {
    id: 'q8',
    question: 'Using "Cats Go Down Alleys Eating Birds", which Major key sits at 4 o’clock with 4 sharps?',
    mnemonicTip: 'C (0) → G (1) → D (2) → A (3) → E ("Eating" = 4 sharps)!',
    options: ['A Major', 'E Major', 'B Major', 'F♯ Major'],
    correctAnswer: 'E Major',
    highlightKeyId: 'E-major',
  },
];

type DrillTrack = 'sharps' | 'flats' | 'minors';

interface BuilderPrompt {
  keyId: string;
  label: string;
  clockLabel: string;
  hint: string;
}

const BUILDER_TRACKS: Record<DrillTrack, { title: string; subtitle: string; prompts: BuilderPrompt[] }> = {
  sharps: {
    title: 'Track A: Build the Sharp Clock (12:00 → 6:00)',
    subtitle: 'Tap each Major key in clockwise order using "Cats Go Down Alleys Eating Birds (Fish)"',
    prompts: [
      { keyId: 'C-major', label: 'C', clockLabel: '12:00 (0♯)', hint: '"Cats" — All white keys at the top of the clock' },
      { keyId: 'G-major', label: 'G', clockLabel: '1:00 (1♯)', hint: '"Go" — Up a 5th from C (adds F♯)' },
      { keyId: 'D-major', label: 'D', clockLabel: '2:00 (2♯)', hint: '"Down" — Up a 5th from G (adds C♯)' },
      { keyId: 'A-major', label: 'A', clockLabel: '3:00 (3♯)', hint: '"Alleys" — Quarter turn right at 3 o’clock' },
      { keyId: 'E-major', label: 'E', clockLabel: '4:00 (4♯)', hint: '"Eating" — 4 o’clock = 4 sharps' },
      { keyId: 'B-major', label: 'B', clockLabel: '5:00 (5♯)', hint: '"Birds" — 5 o’clock = 5 sharps' },
      { keyId: 'F#-major', label: 'F♯', clockLabel: '6:00 (6♯)', hint: '"Fish" — Bottom of the clock (6 sharps / 6 flats)' },
    ],
  },
  flats: {
    title: 'Track B: Build the Flat Side (11:00 → 7:00)',
    subtitle: 'Tap each Flat Major key counter-clockwise using "F + B-E-A-D"',
    prompts: [
      { keyId: 'F-major', label: 'F', clockLabel: '11:00 (1♭)', hint: '"F for First Flat!" (1 flat: B♭)' },
      { keyId: 'Bb-major', label: 'B♭', clockLabel: '10:00 (2♭)', hint: 'First letter of B-E-A-D with a flat!' },
      { keyId: 'Eb-major', label: 'E♭', clockLabel: '9:00 (3♭)', hint: 'Second letter of B-E-A-D with a flat!' },
      { keyId: 'Ab-major', label: 'A♭', clockLabel: '8:00 (4♭)', hint: 'Third letter of B-E-A-D with a flat!' },
      { keyId: 'Db-major', label: 'D♭', clockLabel: '7:00 (5♭)', hint: 'Fourth letter of B-E-A-D with a flat!' },
    ],
  },
  minors: {
    title: 'Track C: Match the Inner Relative Minors',
    subtitle: 'Use the "Look 3 Hours Clockwise" or "Down 3 Semitones" trick!',
    prompts: [
      { keyId: 'A-minor', label: 'Am', clockLabel: 'Inside C (12:00)', hint: 'Look at 3:00 on the Major ring (A) → Am!' },
      { keyId: 'E-minor', label: 'Em', clockLabel: 'Inside G (1:00)', hint: 'Look at 4:00 on the Major ring (E) → Em!' },
      { keyId: 'B-minor', label: 'Bm', clockLabel: 'Inside D (2:00)', hint: 'Look at 5:00 on the Major ring (B) → Bm!' },
      { keyId: 'F#-minor', label: 'F♯m', clockLabel: 'Inside A (3:00)', hint: 'Look at 6:00 on the Major ring (F♯) → F♯m!' },
      { keyId: 'D-minor', label: 'Dm', clockLabel: 'Inside F (11:00)', hint: 'Look at 2:00 on the Major ring (D) → Dm!' },
      { keyId: 'G-minor', label: 'Gm', clockLabel: 'Inside B♭ (10:00)', hint: 'Look at 1:00 on the Major ring (G) → Gm!' },
      { keyId: 'C-minor', label: 'Cm', clockLabel: 'Inside E♭ (9:00)', hint: 'Look at 12:00 on the Major ring (C) → Cm!' },
    ],
  },
};

export const CircleOfFifthsTrainer: React.FC<CircleOfFifthsTrainerProps> = ({
  completedSteps,
  onCompleteStep,
  onHighlightPianoNotes,
  onSelectRevealedKey,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [focusedKeyId, setFocusedKeyId] = useState<string>('C-major');

  // Step 3 interactive staff explorer state
  const [staffExplorerKeyId, setStaffExplorerKeyId] = useState<string>('A-major');

  // Step 6 Drill state
  const [drillMode, setDrillMode] = useState<'builder' | 'quiz'>('builder');
  const [builderTrack, setBuilderTrack] = useState<DrillTrack>('sharps');
  const [builderStepIdx, setBuilderStepIdx] = useState<number>(0);
  const [unlockedKeyIds, setUnlockedKeyIds] = useState<string[]>([]);
  const [wrongGuessKeyId, setWrongGuessKeyId] = useState<string | null>(null);
  const [showBuilderHint, setShowBuilderHint] = useState<boolean>(false);

  // Step 6 Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const majorKeys = useMemo(
    () =>
      KEY_SIGNATURES.filter((k) => k.mode === 'major').sort(
        (a, b) => a.circleIndex - b.circleIndex
      ),
    []
  );
  const minorKeys = useMemo(
    () =>
      KEY_SIGNATURES.filter((k) => k.mode === 'minor').sort(
        (a, b) => a.circleIndex - b.circleIndex
      ),
    []
  );

  const focusedKey = useMemo(() => getKeyById(focusedKeyId), [focusedKeyId]);
  const focusedMajorKey = useMemo(
    () => (focusedKey.mode === 'major' ? focusedKey : getRelativeKey(focusedKey)),
    [focusedKey]
  );
  const focusedMinorKey = useMemo(
    () => (focusedKey.mode === 'minor' ? focusedKey : getRelativeKey(focusedKey)),
    [focusedKey]
  );

  // Audition any key on the wheel & highlight its triad + scale on the piano below
  const handleAuditionKey = (keyId: string) => {
    const key = getKeyById(keyId);
    setFocusedKeyId(keyId);
    onSelectRevealedKey(key);
    const palette = getDiatonicChordPalette(key);
    const tonicChord = palette[0];
    if (tonicChord) {
      soundEngine.playChord(tonicChord.notes, 1.1);
      onHighlightPianoNotes(
        tonicChord.notes,
        `${key.displayName} Tonic Triad: ${tonicChord.symbol} (${tonicChord.notes
          .map((n) => n.replace(/\d$/, ''))
          .join('–')})`
      );
    }
  };

  // Switch curriculum step
  const handleSelectStep = (stepNum: number) => {
    setActiveStep(stepNum);
    if (stepNum === 1) {
      handleAuditionKey('G-major');
    } else if (stepNum === 2) {
      handleAuditionKey('Bb-major');
    } else if (stepNum === 3) {
      handleAuditionKey(staffExplorerKeyId);
    } else if (stepNum === 4) {
      handleAuditionKey('C-major');
    } else if (stepNum === 5) {
      handleAuditionKey('C-major');
    }
  };

  // Play animated walk around the Sharp Side (Step 1) or Flat Side (Step 2)
  const playCircleWalk = (direction: 'sharps' | 'flats') => {
    const sequence =
      direction === 'sharps'
        ? SHARP_MNEMONIC_ITEMS.map((item) => item.keyId)
        : FLAT_MNEMONIC_ITEMS.map((item) => item.keyId);

    sequence.forEach((kId, idx) => {
      window.setTimeout(() => {
        handleAuditionKey(kId);
      }, idx * 750);
    });
  };

  // Step 5: Compute the 6-chord neighborhood for `focusedMajorKey`
  const neighborhoodChords = useMemo(() => {
    const centerIdx = focusedMajorKey.circleIndex;
    const leftIdx = (centerIdx + 11) % 12; // Counter-clockwise = IV
    const rightIdx = (centerIdx + 1) % 12; // Clockwise = V

    const ivMajor = majorKeys.find((k) => k.circleIndex === leftIdx)!;
    const iMajor = focusedMajorKey;
    const vMajor = majorKeys.find((k) => k.circleIndex === rightIdx)!;

    const iiMinor = minorKeys.find((k) => k.circleIndex === leftIdx)!;
    const viMinor = minorKeys.find((k) => k.circleIndex === centerIdx)!;
    const iiiMinor = minorKeys.find((k) => k.circleIndex === rightIdx)!;

    const palette = getDiatonicChordPalette(focusedMajorKey);

    return {
      leftIdx,
      centerIdx,
      rightIdx,
      cards: [
        {
          roman: 'IV',
          role: 'Subdominant (1 Step Left ↺)',
          keyInfo: ivMajor,
          chord: palette[3],
          ring: 'Outer Ring',
          colorClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        },
        {
          roman: 'I',
          role: 'Tonic Home (Center ★)',
          keyInfo: iMajor,
          chord: palette[0],
          ring: 'Outer Ring',
          colorClass: 'bg-indigo-500/25 text-indigo-200 border-indigo-400',
        },
        {
          roman: 'V',
          role: 'Dominant (1 Step Right ↻)',
          keyInfo: vMajor,
          chord: palette[4],
          ring: 'Outer Ring',
          colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        },
        {
          roman: 'ii',
          role: 'Supertonic Minor (Inner Left)',
          keyInfo: iiMinor,
          chord: palette[1],
          ring: 'Inner Ring',
          colorClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
        },
        {
          roman: 'vi',
          role: 'Relative Minor (Inner Center)',
          keyInfo: viMinor,
          chord: palette[5],
          ring: 'Inner Ring',
          colorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        },
        {
          roman: 'iii',
          role: 'Mediant Minor (Inner Right)',
          keyInfo: iiiMinor,
          chord: palette[2],
          ring: 'Inner Ring',
          colorClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        },
      ],
    };
  }, [focusedMajorKey, majorKeys, minorKeys]);

  // Play I - V - vi - IV pop progression in the currently selected key (Step 5)
  const playPopProgressionInFocusedKey = () => {
    const palette = getDiatonicChordPalette(focusedMajorKey);
    const loop = [palette[0], palette[4], palette[5], palette[3]]; // I - V - vi - IV
    loop.forEach((ch, idx) => {
      window.setTimeout(() => {
        soundEngine.playChord(ch.notes, 1.05);
        onHighlightPianoNotes(
          ch.notes,
          `${focusedMajorKey.shortName} Pop Loop (${idx + 1}/4): ${ch.symbol} (${ch.roman})`
        );
      }, idx * 1050);
    });
  };

  // Step 6 Builder handlers
  const currentTrackData = BUILDER_TRACKS[builderTrack];
  const currentBuilderPrompt = currentTrackData.prompts[builderStepIdx];
  const isBuilderTrackComplete = builderStepIdx >= currentTrackData.prompts.length;

  const handleResetBuilderTrack = (track: DrillTrack) => {
    setBuilderTrack(track);
    setBuilderStepIdx(0);
    setUnlockedKeyIds([]);
    setWrongGuessKeyId(null);
    setShowBuilderHint(false);
  };

  const handleBuilderChoice = (chosenKeyId: string) => {
    if (!currentBuilderPrompt) return;
    if (chosenKeyId === currentBuilderPrompt.keyId) {
      setWrongGuessKeyId(null);
      setShowBuilderHint(false);
      setUnlockedKeyIds((prev) => [...prev, chosenKeyId]);
      handleAuditionKey(chosenKeyId);
      const nextIdx = builderStepIdx + 1;
      setBuilderStepIdx(nextIdx);
      if (nextIdx >= currentTrackData.prompts.length) {
        onCompleteStep(6, 100);
      }
    } else {
      setWrongGuessKeyId(chosenKeyId);
      const wrongKey = getKeyById(chosenKeyId);
      soundEngine.playNote(`${wrongKey.tonic}3`, 0.25, 0.45);
    }
  };

  // Step 6 Flashcard handlers
  const currentQuiz = FLASHCARD_QUESTIONS[quizIdx];

  const handleSelectQuizOption = (option: string) => {
    if (selectedQuizOption) return;
    setSelectedQuizOption(option);
    const isRight = option === currentQuiz.correctAnswer;
    if (isRight) {
      setQuizScore((s) => s + 1);
      handleAuditionKey(currentQuiz.highlightKeyId);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIdx + 1 < FLASHCARD_QUESTIONS.length) {
      setQuizIdx((i) => i + 1);
      setSelectedQuizOption(null);
    } else {
      setQuizFinished(true);
      onCompleteStep(6, 100);
    }
  };

  // Helper to compute SVG polar coordinates
  const polarToCartesian = (cx: number, cy: number, r: number, index12: number) => {
    const angleDeg = index12 * 30 - 90; // 0 index at 12 o'clock (-90 deg)
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  // Determine how each node on the SVG Circle of Fifths is styled based on the current Step
  const getWheelNodeStyle = (key: KeySignatureInfo) => {
    const isFocused = focusedKey.id === key.id;
    const isStep1SharpSide =
      activeStep === 1 && key.mode === 'major' && key.circleIndex >= 0 && key.circleIndex <= 6;
    const isStep2FlatSide =
      activeStep === 2 &&
      key.mode === 'major' &&
      (key.circleIndex === 0 || key.circleIndex >= 6);
    const isStep2BeadNode =
      activeStep === 2 &&
      key.mode === 'major' &&
      [10, 9, 8, 7].includes(key.circleIndex);
    const isStep4Pair =
      activeStep === 4 &&
      (key.id === focusedMajorKey.id || key.id === focusedMinorKey.id);
    // The 3-hours-clockwise outer ring reference key in Step 4!
    const threeHoursClockwiseIdx = (focusedMajorKey.circleIndex + 3) % 12;
    const isStep4ClockwiseRef =
      activeStep === 4 &&
      key.mode === 'major' &&
      key.circleIndex === threeHoursClockwiseIdx;

    const isStep5Wedge =
      activeStep === 5 &&
      [
        neighborhoodChords.leftIdx,
        neighborhoodChords.centerIdx,
        neighborhoodChords.rightIdx,
      ].includes(key.circleIndex);

    // In Step 6 builder mode, check if this node is hidden, target, or unlocked
    if (activeStep === 6 && drillMode === 'builder') {
      const isUnlocked = unlockedKeyIds.includes(key.id);
      const isCurrentTarget = currentBuilderPrompt?.keyId === key.id;
      if (isUnlocked) {
        return {
          fill: '#10b981',
          stroke: '#6ee7b7',
          textFill: '#022c22',
          displayText: key.shortName,
          opacity: 1,
        };
      }
      if (isCurrentTarget) {
        return {
          fill: '#4f46e5',
          stroke: '#a5b4fc',
          textFill: '#ffffff',
          displayText: '?',
          opacity: 1,
        };
      }
      const isInTrack = currentTrackData.prompts.some((p) => p.keyId === key.id);
      return {
        fill: isInTrack ? '#1e293b' : '#0f172a',
        stroke: isInTrack ? '#475569' : '#1e293b',
        textFill: isInTrack ? '#94a3b8' : '#475569',
        displayText: isInTrack ? '?' : key.shortName,
        opacity: isInTrack ? 0.9 : 0.4,
      };
    }

    if (isFocused) {
      return {
        fill: '#6366f1',
        stroke: '#c7d2fe',
        textFill: '#ffffff',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    if (isStep4Pair) {
      return {
        fill: key.mode === 'major' ? '#4f46e5' : '#10b981',
        stroke: key.mode === 'major' ? '#a5b4fc' : '#6ee7b7',
        textFill: key.mode === 'major' ? '#ffffff' : '#022c22',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    if (isStep4ClockwiseRef) {
      return {
        fill: '#f59e0b',
        stroke: '#fde68a',
        textFill: '#0f172a',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    if (isStep5Wedge) {
      const isCenterTonic = key.id === focusedMajorKey.id;
      return {
        fill: isCenterTonic ? '#4f46e5' : key.mode === 'major' ? '#0284c7' : '#0d9488',
        stroke: isCenterTonic ? '#c7d2fe' : key.mode === 'major' ? '#7dd3fc' : '#5eead4',
        textFill: '#ffffff',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    if (isStep2BeadNode) {
      return {
        fill: '#0284c7',
        stroke: '#7dd3fc',
        textFill: '#ffffff',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    if (isStep1SharpSide) {
      return {
        fill: '#d97706',
        stroke: '#fde68a',
        textFill: '#0f172a',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    if (isStep2FlatSide) {
      return {
        fill: '#0369a1',
        stroke: '#38bdf8',
        textFill: '#f0f9ff',
        displayText: key.shortName,
        opacity: 1,
      };
    }

    const isDimmedByStep =
      (activeStep === 1 && (!isStep1SharpSide || key.mode === 'minor')) ||
      (activeStep === 2 && (!isStep2FlatSide || key.mode === 'minor')) ||
      (activeStep === 5 && !isStep5Wedge);

    return {
      fill: key.mode === 'major' ? '#1e293b' : '#0f172a',
      stroke: '#334155',
      textFill: key.mode === 'major' ? '#f8fafc' : '#cbd5e1',
      displayText: key.shortName,
      opacity: isDimmedByStep ? 0.35 : 0.9,
    };
  };

  const currentStepMeta = CURRICULUM_STEPS[activeStep - 1];
  const isCurrentStepDone = completedSteps.includes(activeStep);
  const staffExplorerKey = getKeyById(staffExplorerKeyId);

  return (
    <div className="space-y-5">
      {/* Top Banner & 6-Step Progress Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Step-by-Step Memory System
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {completedSteps.length} / 6 Steps Mastered
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1.5">
              Learn & Memorize the Circle of Fifths in 6 Easy Steps
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Instead of memorizing 24 random keys, learn the <strong className="text-slate-200">Clock Face</strong>, the{' '}
              <strong className="text-amber-300">Cats Go Down Alleys</strong> sentence, the{' '}
              <strong className="text-sky-300">F + BEAD</strong> word trick, and the{' '}
              <strong className="text-emerald-300">3-Hours-Clockwise</strong> minor shortcut.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeStep <= 1}
              onClick={() => handleSelectStep(Math.max(1, activeStep - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-xs font-bold text-slate-300 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Prev Step
            </button>
            <button
              type="button"
              disabled={activeStep >= 6}
              onClick={() => {
                if (!completedSteps.includes(activeStep)) {
                  onCompleteStep(activeStep, currentStepMeta.xpReward);
                }
                handleSelectStep(Math.min(6, activeStep + 1));
              }}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-bold text-white shadow-md shadow-indigo-600/25 transition cursor-pointer"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6-Step Clickable Stepper Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CURRICULUM_STEPS.map((step) => {
            const isSelected = activeStep === step.number;
            const isDone = completedSteps.includes(step.number);
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => handleSelectStep(step.number)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/25 border-indigo-400 text-white shadow-sm ring-1 ring-indigo-400/50'
                    : isDone
                    ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200 hover:bg-emerald-950/50'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="min-w-0">
                  <span className="text-[11px] font-extrabold block truncate">
                    {step.shortTitle}
                  </span>
                  <span className="text-[10px] opacity-75 block">
                    {isDone ? '✓ Mastered' : `+${step.xpReward} XP`}
                  </span>
                </div>
                {isDone && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split View: Interactive Learning Wheel (Left 5 cols) + Step-by-Step Lesson & Interactive Lab (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: Annotated Interactive SVG Circle of Fifths Clock */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  Interactive Circle of Fifths Clock
                </h2>
                <p className="text-xs text-slate-400">
                  Click any key to hear its tonic chord & see it on the piano below
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950 text-indigo-300 border border-slate-800">
                12:00 = C (0♯/0♭)
              </span>
            </div>

            {/* SVG Clock Wheel */}
            <div className="flex flex-col items-center my-2">
              <svg
                viewBox="0 0 380 380"
                className="w-full max-w-[350px] h-auto select-none"
                aria-label="Step-by-step interactive Circle of Fifths"
              >
                {/* Step 5: Highlighted 3-Slice Pizza Wedge for I - IV - V - ii - vi - iii */}
                {activeStep === 5 &&
                  [
                    neighborhoodChords.leftIdx,
                    neighborhoodChords.centerIdx,
                    neighborhoodChords.rightIdx,
                  ].map((idx) => {
                    const pos = polarToCartesian(190, 190, 148, idx);
                    return (
                      <line
                        key={`wedge-ray-${idx}`}
                        x1="190"
                        y1="190"
                        x2={pos.x}
                        y2={pos.y}
                        stroke="#38bdf8"
                        strokeWidth="36"
                        strokeLinecap="round"
                        opacity="0.14"
                      />
                    );
                  })}

                {/* Decorative Ring Tracks */}
                <circle
                  cx="190"
                  cy="190"
                  r="148"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="102"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />
                <circle
                  cx="190"
                  cy="190"
                  r="58"
                  fill="#020617"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />

                {/* Step 4: Visual 90-degree (3-Hour Clockwise) Curve connecting Major Key to 3 hours clockwise */}
                {activeStep === 4 && (() => {
                  const startPos = polarToCartesian(190, 190, 148, focusedMajorKey.circleIndex);
                  const threeHoursIdx = (focusedMajorKey.circleIndex + 3) % 12;
                  const refPos = polarToCartesian(190, 190, 148, threeHoursIdx);
                  const minorPos = polarToCartesian(190, 190, 102, focusedMajorKey.circleIndex);
                  return (
                    <g>
                      <line
                        x1={startPos.x}
                        y1={startPos.y}
                        x2={minorPos.x}
                        y2={minorPos.y}
                        stroke="#10b981"
                        strokeWidth="3.5"
                      />
                      <line
                        x1={refPos.x}
                        y1={refPos.y}
                        x2={minorPos.x}
                        y2={minorPos.y}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                    </g>
                  );
                })()}

                {/* Spokes connecting Relative Major & Minor pairs */}
                {majorKeys.map((maj) => {
                  const p1 = polarToCartesian(190, 190, 102, maj.circleIndex);
                  const p2 = polarToCartesian(190, 190, 148, maj.circleIndex);
                  return (
                    <line
                      key={`spoke-${maj.id}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Outer Ring: 12 Major Keys + Clock / Accidental Badges */}
                {majorKeys.map((key) => {
                  const pos = polarToCartesian(190, 190, 148, key.circleIndex);
                  const badgePos = polarToCartesian(190, 190, 176, key.circleIndex);
                  const style = getWheelNodeStyle(key);

                  const clockHour = key.circleIndex === 0 ? '12h' : `${key.circleIndex}h`;
                  const accLabel =
                    key.accidentalCount === 0
                      ? '0'
                      : `${key.accidentalCount}${key.accidentalType === 'sharp' ? '♯' : '♭'}`;

                  return (
                    <g
                      key={key.id}
                      style={{ opacity: style.opacity }}
                      onClick={() => {
                        if (activeStep === 6 && drillMode === 'builder') {
                          handleBuilderChoice(key.id);
                        } else {
                          handleAuditionKey(key.id);
                        }
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Outer Clock Hour / Accidental Label */}
                      <text
                        x={badgePos.x}
                        y={badgePos.y + 3}
                        textAnchor="middle"
                        fill={
                          key.accidentalType === 'sharp'
                            ? '#fbbf24'
                            : key.accidentalType === 'flat'
                            ? '#38bdf8'
                            : '#94a3b8'
                        }
                        fontSize="9"
                        fontWeight="700"
                      >
                        {activeStep === 1 || activeStep === 4 ? `${clockHour} (${accLabel})` : accLabel}
                      </text>

                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="21"
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth="2.2"
                        className="transition-all duration-150 group-hover:brightness-110"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill={style.textFill}
                        fontSize="12.5"
                        fontWeight="800"
                      >
                        {style.displayText}
                      </text>
                    </g>
                  );
                })}

                {/* Inner Ring: 12 Relative Minor Keys */}
                {minorKeys.map((key) => {
                  const pos = polarToCartesian(190, 190, 102, key.circleIndex);
                  const style = getWheelNodeStyle(key);

                  return (
                    <g
                      key={key.id}
                      style={{ opacity: style.opacity }}
                      onClick={() => {
                        if (activeStep === 6 && drillMode === 'builder') {
                          handleBuilderChoice(key.id);
                        } else {
                          handleAuditionKey(key.id);
                        }
                      }}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="17"
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth="2"
                        className="transition-all duration-150 group-hover:brightness-110"
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 3.5}
                        textAnchor="middle"
                        fill={style.textFill}
                        fontSize="10.5"
                        fontWeight="700"
                      >
                        {style.displayText}
                      </text>
                    </g>
                  );
                })}

                {/* Center Hub Info */}
                <text
                  x="190"
                  y="184"
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="13"
                  fontWeight="800"
                >
                  {focusedKey.shortName}
                </text>
                <text
                  x="190"
                  y="201"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="9.5"
                  fontWeight="600"
                >
                  {focusedKey.accidentalCount === 0
                    ? '0 ♯ / 0 ♭'
                    : `${focusedKey.accidentalCount} ${
                        focusedKey.accidentalType === 'sharp' ? '♯' : '♭'
                      }`}
                </text>
              </svg>
            </div>
          </div>

          {/* Focused Key Staff & Quick Audition Footer */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
            <KeySignatureStaff keyInfo={focusedKey} compact />
            <div className="flex items-center justify-between gap-2 text-xs bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2">
              <div>
                <span className="text-slate-400">Relative Pair: </span>
                <strong className="text-white">{focusedMajorKey.displayName}</strong>
                <span className="text-slate-500"> ↔ </span>
                <strong className="text-emerald-300">{focusedMinorKey.displayName}</strong>
              </div>
              <button
                type="button"
                onClick={() => handleAuditionKey(focusedKey.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/25 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 font-bold transition cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Hear {focusedKey.shortName}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Step-by-Step Interactive Lesson & Mnemonic Lab */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5">
          {/* Lesson Step Header */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Memory Hook: {currentStepMeta.memoryRuleBadge}
              </span>

              {isCurrentStepDone ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Step {activeStep} Completed
                </span>
              ) : (
                <span className="text-xs font-bold text-indigo-400">
                  Reward: +{currentStepMeta.xpReward} XP
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {currentStepMeta.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {currentStepMeta.subtitle}
            </p>
          </div>

          {/* ==========================================================
              STEP 1 CONTENT: THE CLOCK FACE & SHARP KEYS (CLOCKWISE)
             ========================================================== */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                      The Clockwise Sharp Sentence (12:00 → 6:00)
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Click each word in order to hear the <strong className="text-white">Perfect 5th</strong> jump and light up the clock:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => playCircleWalk('sharps')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play Clockwise Walk
                  </button>
                </div>

                {/* 7 Interactive Mnemonic Word Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                  {SHARP_MNEMONIC_ITEMS.map((item) => {
                    const isSelected = focusedKeyId === item.keyId;
                    return (
                      <button
                        key={item.keyId}
                        type="button"
                        onClick={() => handleAuditionKey(item.keyId)}
                        className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-300 font-extrabold shadow-lg scale-[1.03]'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                        }`}
                      >
                        <span className="text-[10px] font-mono opacity-75">{item.clock}</span>
                        <span className="text-lg font-extrabold my-0.5">{item.letter}</span>
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? 'text-slate-950' : 'text-amber-300'
                          }`}
                        >
                          “{item.word}”
                        </span>
                        <span
                          className={`mt-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            isSelected
                              ? 'bg-slate-950/20 text-slate-950'
                              : 'bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          {item.sharps}♯
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2 Extra Unforgettable Anchors for Step 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/75 border border-slate-800">
                  <strong className="text-indigo-300 flex items-center gap-1.5 mb-1">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    1. The Clock Hour = The Number of Sharps!
                  </strong>
                  <p className="text-slate-300 leading-relaxed">
                    At <strong>12:00 (C)</strong> there are <strong>0 sharps</strong>. At{' '}
                    <strong>1:00 (G)</strong> there is <strong>1 sharp</strong>. At{' '}
                    <strong>2:00 (D)</strong> there are <strong>2 sharps</strong>… all the way to{' '}
                    <strong>6:00 (F♯ = 6 sharps)</strong>!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/75 border border-slate-800">
                  <strong className="text-emerald-300 flex items-center gap-1.5 mb-1">
                    <Music className="w-4 h-4 text-emerald-400" />
                    2. Why is it called a "Fifth"?
                  </strong>
                  <p className="text-slate-300 leading-relaxed">
                    Count 5 white keys up from <strong>C</strong>: <em>C – D – E – F – G</em>! Count 5
                    scale notes up from <strong>G</strong>: <em>G – A – B – C – D</em>! Every step is
                    7 semitones (a Perfect 5th).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              STEP 2 CONTENT: COUNTER-CLOCKWISE & THE "F + BEAD" TRICK
             ========================================================== */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-sky-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 block">
                      The Counter-Clockwise Flat Word Trick (12:00 → 6:00)
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Start with <strong className="text-white">F ("First Flat")</strong> at 11:00, then spell the word{' '}
                      <strong className="text-sky-300">B – E – A – D</strong> + <strong className="text-sky-300">G</strong> with flats!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => playCircleWalk('flats')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold shadow transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play Flat Side Walk
                  </button>
                </div>

                {/* 7 Interactive Flat Cards highlighting B-E-A-D */}
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                  {FLAT_MNEMONIC_ITEMS.map((item) => {
                    const isSelected = focusedKeyId === item.keyId && item.flats > 0;
                    return (
                      <button
                        key={`${item.keyId}-${item.flats}`}
                        type="button"
                        onClick={() => handleAuditionKey(item.keyId)}
                        className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center cursor-pointer ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950 border-sky-300 font-extrabold shadow-lg scale-[1.03]'
                            : item.isBead
                            ? 'bg-sky-950/50 hover:bg-sky-900/50 text-sky-100 border-sky-500/50'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800'
                        }`}
                      >
                        <span className="text-[10px] font-mono opacity-75">{item.clock}</span>
                        <span className="text-lg font-extrabold my-0.5">{item.label}</span>
                        <span
                          className={`text-[11px] font-bold ${
                            isSelected
                              ? 'text-slate-950'
                              : item.isBead
                              ? 'text-sky-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {item.tag}
                        </span>
                        <span
                          className={`mt-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            isSelected
                              ? 'bg-slate-950/20 text-slate-950'
                              : 'bg-sky-500/15 text-sky-300'
                          }`}
                        >
                          {item.flats}♭
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/75 border border-slate-800">
                  <strong className="text-sky-300 block mb-1">
                    1. Why "F" is Super Easy to Remember
                  </strong>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>F Major (11 o’clock, 1♭)</strong> is the <em>only</em> flat Major key that
                    doesn’t have the symbol <strong>♭</strong> in its name. Just remember:{' '}
                    <strong className="text-white">“F = First Flat (1♭)”</strong>!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/75 border border-slate-800">
                  <strong className="text-amber-300 block mb-1">
                    2. Why Every Other Flat Key Has ♭ in Its Name
                  </strong>
                  <p className="text-slate-300 leading-relaxed">
                    After <strong>F</strong> (1♭), the next four hours counter-clockwise spell{' '}
                    <strong className="text-sky-300">B♭ (2♭) – E♭ (3♭) – A♭ (4♭) – D♭ (5♭)</strong>,
                    and finally <strong className="text-sky-300">G♭ (6♭)</strong> at 6 o’clock!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              STEP 3 CONTENT: ORDER OF SHARPS/FLATS & 2 STAFF SHORTCUTS
             ========================================================== */}
          {activeStep === 3 && (
            <div className="space-y-4">
              {/* Reversible Mirror Sentence Showcase */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                    The Reversible Mirror Sentence (Sharps Forward ↔ Flats Backward)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Notice flats start with <strong className="text-sky-300">B-E-A-D + G-C-F</strong>!
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {SHARP_ORDER.map((sharpNote, idx) => (
                    <div
                      key={sharpNote}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center"
                    >
                      <span className="text-xs font-extrabold text-amber-400">{sharpNote}</span>
                      <span className="text-[10px] font-semibold text-slate-300">
                        {ORDER_SHARP_WORDS[idx]}
                      </span>
                      <div className="w-full border-t border-slate-800 my-1" />
                      <span className="text-xs font-extrabold text-sky-400">
                        {FLAT_ORDER[idx]}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {ORDER_FLAT_WORDS[idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Staff Shortcut Tester */}
              <div className="p-4 rounded-2xl bg-slate-950/85 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                    Try the 2-Second Staff Shortcuts Live:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {['G-major', 'D-major', 'A-major', 'E-major', 'F-major', 'Bb-major', 'Eb-major', 'Ab-major'].map(
                      (kId) => {
                        const k = getKeyById(kId);
                        const isSel = staffExplorerKeyId === kId;
                        return (
                          <button
                            key={kId}
                            type="button"
                            onClick={() => {
                              setStaffExplorerKeyId(kId);
                              handleAuditionKey(kId);
                            }}
                            className={`px-2 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                              isSel
                                ? 'bg-indigo-600 text-white border-indigo-400'
                                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {k.shortName} ({k.accidentalCount}
                            {k.accidentalType === 'sharp' ? '♯' : '♭'})
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      staffExplorerKey.accidentalType === 'sharp'
                        ? 'bg-amber-950/30 border-amber-500/50'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <strong className="text-amber-300 block mb-1">
                      ♯ Sharp Key Trick: "Last Sharp + ½ Step Up"
                    </strong>
                    {staffExplorerKey.accidentalType === 'sharp' ? (
                      <p className="text-slate-200 leading-relaxed">
                        In <strong>{staffExplorerKey.displayName}</strong>, the sharps are{' '}
                        <span className="text-amber-300 font-bold">
                          {staffExplorerKey.accidentals.join(', ')}
                        </span>
                        . The <strong>last sharp</strong> is{' '}
                        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-extrabold">
                          {staffExplorerKey.accidentals[staffExplorerKey.accidentals.length - 1]}
                        </span>
                        . Go up <strong>1 half-step</strong> on the piano →{' '}
                        <strong className="text-emerald-300">{staffExplorerKey.displayName}</strong>!
                      </p>
                    ) : (
                      <p className="text-slate-400 leading-relaxed">
                        Look at the rightmost sharp on the staff and move up 1 semitone (half-step).
                        Click G, D, A, or E above to see it in action!
                      </p>
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      staffExplorerKey.accidentalType === 'flat'
                        ? 'bg-sky-950/30 border-sky-500/50'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <strong className="text-sky-300 block mb-1">
                      ♭ Flat Key Trick: "Second-to-Last Flat = The Key!"
                    </strong>
                    {staffExplorerKey.accidentalType === 'flat' ? (
                      staffExplorerKey.accidentalCount === 1 ? (
                        <p className="text-slate-200 leading-relaxed">
                          <strong>1 Flat (B♭)</strong> is always{' '}
                          <strong className="text-sky-300">F Major ("First Flat")</strong>!
                        </p>
                      ) : (
                        <p className="text-slate-200 leading-relaxed">
                          In <strong>{staffExplorerKey.displayName}</strong>, the flats are{' '}
                          <span className="text-sky-300 font-bold">
                            {staffExplorerKey.accidentals.join(', ')}
                          </span>
                          . The <strong>second-to-last flat</strong> is{' '}
                          <span className="px-1.5 py-0.5 rounded bg-sky-400 text-slate-950 font-extrabold">
                            {staffExplorerKey.accidentals[staffExplorerKey.accidentals.length - 2]}
                          </span>{' '}
                          → which IS{' '}
                          <strong className="text-emerald-300">{staffExplorerKey.displayName}</strong>!
                        </p>
                      )
                    ) : (
                      <p className="text-slate-400 leading-relaxed">
                        For 2 or more flats, the second-to-last flat on the staff literally names the
                        Major key. Click B♭, E♭, or A♭ above to test it!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              STEP 4 CONTENT: INNER RING RELATIVE MINORS (3 HOURS CLOCKWISE)
             ========================================================== */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                      The "Look 3 Hours Clockwise (90°)" Secret
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      You already know the outer Major ring! To find any key’s Relative Minor, just look{' '}
                      <strong className="text-amber-300">3 hours clockwise</strong> on the outer ring:
                    </p>
                  </div>
                </div>

                {/* Interactive Relative Pair Demonstrator */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                  <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-500/40 text-center">
                    <span className="text-[10px] font-bold uppercase text-indigo-300 block">
                      1. Pick Any Major Key
                    </span>
                    <span className="text-xl font-extrabold text-white block mt-0.5">
                      {focusedMajorKey.displayName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Clock: {focusedMajorKey.circleIndex === 0 ? '12:00' : `${focusedMajorKey.circleIndex}:00`}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center">
                    <span className="text-[10px] font-bold uppercase text-amber-300 block">
                      2. Look +3 Hours Clockwise
                    </span>
                    <span className="text-xl font-extrabold text-amber-300 block mt-0.5">
                      {
                        majorKeys.find(
                          (k) => k.circleIndex === (focusedMajorKey.circleIndex + 3) % 12
                        )?.tonic
                      }{' '}
                      at {((focusedMajorKey.circleIndex + 3) % 12) || 12}:00
                    </span>
                    <span className="text-[11px] text-slate-400">
                      (Or go down 3 half-steps on piano)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-center">
                    <span className="text-[10px] font-bold uppercase text-emerald-300 block">
                      3. That’s the Relative Minor!
                    </span>
                    <span className="text-xl font-extrabold text-emerald-300 block mt-0.5">
                      {focusedMinorKey.displayName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Same {focusedMajorKey.accidentalCount}{' '}
                      {focusedMajorKey.accidentalType === 'none'
                        ? 'sharps/flats'
                        : focusedMajorKey.accidentalType === 'sharp'
                        ? '♯'
                        : '♭'}
                    </span>
                  </div>
                </div>

                {/* Quick Pair Switcher Pills */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                    Click any pair to verify the 3-Hour Clockwise rule on the wheel:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {majorKeys.slice(0, 8).map((maj) => {
                      const min = getRelativeKey(maj);
                      const isSel = focusedMajorKey.id === maj.id;
                      return (
                        <button
                          key={maj.id}
                          type="button"
                          onClick={() => handleAuditionKey(min.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            isSel
                              ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          }`}
                        >
                          {maj.shortName} ↔ {min.shortName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              STEP 5 CONTENT: THE 6-CHORD "PIZZA WEDGE" NEIGHBORHOOD
             ========================================================== */}
          {activeStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-sky-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 block">
                      6-Chord Neighborhood Spotlight for {focusedMajorKey.displayName}
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Click any key on the wheel to rotate the <strong className="text-sky-300">3-hour glowing wedge</strong>. All 6 main chords in{' '}
                      <strong className="text-white">{focusedMajorKey.displayName}</strong> are touching right here:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={playPopProgressionInFocusedKey}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Play I–V–vi–IV in {focusedMajorKey.shortName}
                  </button>
                </div>

                {/* 3x2 Grid matching Outer Ring (IV - I - V) and Inner Ring (ii - vi - iii) */}
                <div className="grid grid-cols-3 gap-2.5">
                  {neighborhoodChords.cards.map((item) => (
                    <button
                      key={item.roman}
                      type="button"
                      onClick={() => {
                        soundEngine.playChord(item.chord.notes, 1.1);
                        onHighlightPianoNotes(
                          item.chord.notes,
                          `${item.chord.symbol} (${item.roman} in ${focusedMajorKey.displayName})`
                        );
                      }}
                      className={`p-3 rounded-xl border text-left transition hover:scale-[1.02] cursor-pointer ${item.colorClass}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-extrabold px-1.5 py-0.5 rounded bg-slate-950/50">
                          {item.roman}
                        </span>
                        <span className="text-[10px] opacity-80">{item.ring}</span>
                      </div>
                      <span className="text-lg font-extrabold text-white block mt-1">
                        {item.chord.symbol}
                      </span>
                      <span className="text-[10px] block opacity-90 truncate">{item.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              STEP 6 CONTENT: INTERACTIVE BUILDER & FLASHCARD QUIZ
             ========================================================== */}
          {activeStep === 6 && (
            <div className="space-y-4">
              {/* Switch between Fill-in-the-Clock Builder and Flashcard Quiz */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDrillMode('builder')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      drillMode === 'builder'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    1. Fill-in-the-Clock Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrillMode('quiz')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      drillMode === 'quiz'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    2. Mnemonic Flashcard Quiz ({FLASHCARD_QUESTIONS.length})
                  </button>
                </div>

                {drillMode === 'builder' && (
                  <div className="flex flex-wrap gap-1.5">
                    {(
                      [
                        { id: 'sharps', label: 'A: Sharp Clock' },
                        { id: 'flats', label: 'B: Flat BEAD' },
                        { id: 'minors', label: 'C: Inner Minors' },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleResetBuilderTrack(t.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                          builderTrack === t.id
                            ? 'bg-amber-500 text-slate-950 border-amber-300'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {drillMode === 'builder' ? (
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/40 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-extrabold text-white">
                        {currentTrackData.title}
                      </h3>
                      <p className="text-xs text-slate-400">{currentTrackData.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleResetBuilderTrack(builderTrack)}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Track
                    </button>
                  </div>

                  {!isBuilderTrackComplete && currentBuilderPrompt ? (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 block">
                            Step {builderStepIdx + 1} of {currentTrackData.prompts.length} • Target Position:{' '}
                            <strong className="text-white">{currentBuilderPrompt.clockLabel}</strong>
                          </span>
                          <span className="text-sm font-extrabold text-white">
                            Which key belongs at {currentBuilderPrompt.clockLabel} (marked with “?” on the wheel)?
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowBuilderHint((v) => !v)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          {showBuilderHint ? 'Hide Memory Hint' : 'Show Memory Hint'}
                        </button>
                      </div>

                      {showBuilderHint && (
                        <div className="px-3.5 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
                          💡 <strong>Mnemonic Clue:</strong> {currentBuilderPrompt.hint}
                        </div>
                      )}

                      {/* Answer Choice Buttons */}
                      <div>
                        <span className="text-xs text-slate-400 block mb-2">
                          Tap the key below (or click the “?” slot directly on the Circle of Fifths wheel):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {currentTrackData.prompts.map((p) => {
                            const isAlreadyUnlocked = unlockedKeyIds.includes(p.keyId);
                            const isWrong = wrongGuessKeyId === p.keyId;
                            return (
                              <button
                                key={p.keyId}
                                type="button"
                                disabled={isAlreadyUnlocked}
                                onClick={() => handleBuilderChoice(p.keyId)}
                                className={`px-3.5 py-2 rounded-xl text-sm font-extrabold border transition cursor-pointer ${
                                  isAlreadyUnlocked
                                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40 opacity-50 cursor-default'
                                    : isWrong
                                    ? 'bg-rose-600 text-white border-rose-400'
                                    : 'bg-slate-900 hover:bg-indigo-600 text-white border-slate-700 hover:border-indigo-400'
                                }`}
                              >
                                {isAlreadyUnlocked ? `✓ ${p.label}` : p.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3">
                      <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
                      <h4 className="text-base font-extrabold text-white">
                        Track Complete! You Built {currentTrackData.title} from Memory!
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {builderTrack === 'sharps' && (
                          <button
                            type="button"
                            onClick={() => handleResetBuilderTrack('flats')}
                            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold cursor-pointer"
                          >
                            Next: Build Track B (Flat Side "F + BEAD") →
                          </button>
                        )}
                        {builderTrack === 'flats' && (
                          <button
                            type="button"
                            onClick={() => handleResetBuilderTrack('minors')}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold cursor-pointer"
                          >
                            Next: Build Track C (Inner Relative Minors) →
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDrillMode('quiz')}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer"
                        >
                          Take the 8-Question Flashcard Quiz →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* MODE B: Mnemonic Flashcard Quiz */
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/40 space-y-4">
                  {!quizFinished ? (
                    <>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-indigo-300">
                          Flashcard {quizIdx + 1} of {FLASHCARD_QUESTIONS.length}
                        </span>
                        <span>Score: {quizScore}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-white">
                        {currentQuiz.question}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentQuiz.options.map((option) => {
                          const isChosen = selectedQuizOption === option;
                          const isCorrectAnswer = option === currentQuiz.correctAnswer;

                          let btnClass =
                            'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800';
                          if (selectedQuizOption) {
                            if (isCorrectAnswer) {
                              btnClass =
                                'bg-emerald-500/25 text-emerald-200 border-emerald-400 font-extrabold';
                            } else if (isChosen) {
                              btnClass = 'bg-rose-500/25 text-rose-200 border-rose-400';
                            }
                          }

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleSelectQuizOption(option)}
                              className={`p-3 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${btnClass}`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {selectedQuizOption && (
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs">
                            <strong
                              className={
                                selectedQuizOption === currentQuiz.correctAnswer
                                  ? 'text-emerald-400 block'
                                  : 'text-rose-400 block'
                              }
                            >
                              {selectedQuizOption === currentQuiz.correctAnswer
                                ? '✓ Spot On!'
                                : `Not quite — Answer: ${currentQuiz.correctAnswer}`}
                            </strong>
                            <span className="text-slate-300">{currentQuiz.mnemonicTip}</span>
                          </div>

                          <button
                            type="button"
                            onClick={handleNextQuizQuestion}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer"
                          >
                            {quizIdx + 1 < FLASHCARD_QUESTIONS.length ? 'Next Card' : 'Finish Quiz'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4 space-y-3">
                      <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
                      <h3 className="text-lg font-extrabold text-white">
                        Circle of Fifths Flashcards Complete! ({quizScore} /{' '}
                        {FLASHCARD_QUESTIONS.length})
                      </h3>
                      <p className="text-xs text-slate-300">
                        You’ve unlocked all the mental shortcuts for navigating the 24 Major & Minor
                        keys!
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setQuizIdx(0);
                          setSelectedQuizOption(null);
                          setQuizScore(0);
                          setQuizFinished(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Play Flashcards Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step Completion & Next Step Footer Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              {isCurrentStepDone ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Step {activeStep} Mastered! Move to the next step whenever you’re ready.
                </span>
              ) : (
                <span>
                  Click the cards above to hear how this rule works, then mark Step {activeStep}{' '}
                  complete!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {!isCurrentStepDone && (
                <button
                  type="button"
                  onClick={() => onCompleteStep(activeStep, currentStepMeta.xpReward)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Step {activeStep} Understood (+{currentStepMeta.xpReward} XP)
                </button>
              )}

              {activeStep < 6 && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isCurrentStepDone) {
                      onCompleteStep(activeStep, currentStepMeta.xpReward);
                    }
                    handleSelectStep(activeStep + 1);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/25 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Continue to Step {activeStep + 1}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
