import React, { useEffect, useMemo, useState } from 'react';
import {
  Flame,
  Trophy,
  Compass,
  Music,
  Sparkles,
  ChevronRight,
  Award,
  HelpCircle,
  CheckCircle2,
  Music2,
} from 'lucide-react';
import {
  CHROMATIC_PITCHES,
  deduceCandidateKeys,
  getKeyById,
  getRelativeKey,
} from './data/musicTheory';
import { SONG_CHALLENGES } from './data/songs';
import { soundEngine } from './services/audioEngine';
import { NoteTagStatus, PitchClass, UserProgress } from './types/music';
import { SongPlayerCard } from './components/SongPlayerCard';
import { PianoWorkbench } from './components/PianoWorkbench';
import { HintPanel } from './components/HintPanel';
import { KeySelector } from './components/KeySelector';
import { ExplanationCard } from './components/ExplanationCard';
import { ChordProgressionTrainer } from './components/ChordProgressionTrainer';
import { AnySongExplorer } from './components/AnySongExplorer';

const STORAGE_KEY = 'keysense_mvp_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  currentStreak: 0,
  bestStreak: 0,
  completedSongIds: [],
  chordCompletedSongIds: [],
  keyMastery: {},
};

const EMPTY_TAGS: Record<PitchClass, NoteTagStatus> = {
  C: 'unmarked',
  'C#': 'unmarked',
  D: 'unmarked',
  Eb: 'unmarked',
  E: 'unmarked',
  F: 'unmarked',
  'F#': 'unmarked',
  G: 'unmarked',
  Ab: 'unmarked',
  A: 'unmarked',
  Bb: 'unmarked',
  B: 'unmarked',
};

export function App() {
  const [activeTab, setActiveTab] = useState<'trainer' | 'explorer'>('trainer');
  const [challengeStage, setChallengeStage] = useState<'key' | 'chords'>('key');
  const [difficultyFilter, setDifficultyFilter] = useState<0 | 1 | 2 | 3>(0); // 0 = All
  const [currentSongId, setCurrentSongId] = useState<string>(SONG_CHALLENGES[0].id);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [lastXpEarned, setLastXpEarned] = useState<number>(0);
  const [noteTags, setNoteTags] = useState<Record<PitchClass, NoteTagStatus>>(EMPTY_TAGS);
  const [highlightedChordNotes, setHighlightedChordNotes] = useState<string[]>([]);
  const [highlightedChordLabel, setHighlightedChordLabel] = useState<string | undefined>(undefined);
  const [pianoVolume, setPianoVolume] = useState<number>(0.7);
  const [showHowItWorks, setShowHowItWorks] = useState<boolean>(false);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return INITIAL_PROGRESS;
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_PROGRESS,
        ...parsed,
        chordCompletedSongIds: parsed.chordCompletedSongIds || [],
      };
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const filteredSongs = useMemo(() => {
    if (difficultyFilter === 0) return SONG_CHALLENGES;
    return SONG_CHALLENGES.filter((s) => s.difficulty === difficultyFilter);
  }, [difficultyFilter]);

  const currentSong = useMemo(() => {
    return (
      filteredSongs.find((s) => s.id === currentSongId) ||
      filteredSongs[0] ||
      SONG_CHALLENGES[0]
    );
  }, [filteredSongs, currentSongId]);

  const targetKey = useMemo(() => getKeyById(currentSong.keyId), [currentSong]);

  // Reset challenge state when switching songs
  const loadSongChallenge = (songId: string) => {
    soundEngine.stopChordLoop();
    setCurrentSongId(songId);
    setChallengeStage('key');
    setSelectedKeyId(null);
    setIsSubmitted(false);
    setHintsUsed(0);
    setLastXpEarned(0);
    setNoteTags(EMPTY_TAGS);
    setHighlightedChordNotes([]);
    setHighlightedChordLabel(undefined);
  };

  const handlePianoVolumeChange = (vol: number) => {
    setPianoVolume(vol);
    soundEngine.setVolume(vol);
  };

  const handleToggleNoteTag = (pitch: PitchClass, requestedStatus?: NoteTagStatus) => {
    setNoteTags((prev) => {
      const next = { ...prev };
      const status = requestedStatus ?? (prev[pitch] === 'fits' ? 'unmarked' : 'fits');

      if (status === 'home') {
        for (const p of CHROMATIC_PITCHES) {
          if (next[p] === 'home') next[p] = 'fits';
        }
      }
      next[pitch] = status;
      return next;
    });
  };

  // Deduce matching keys from user's tagged piano notes
  const deducedCandidates = useMemo(() => {
    const fits: PitchClass[] = [];
    const clashes: PitchClass[] = [];
    let home: PitchClass | null = null;

    for (const p of CHROMATIC_PITCHES) {
      const status = noteTags[p];
      if (status === 'fits') fits.push(p);
      if (status === 'home') {
        home = p;
        fits.push(p);
      }
      if (status === 'clashes') clashes.push(p);
    }

    return deduceCandidateKeys(fits, clashes, home);
  }, [noteTags]);

  const taggedNotesCount = useMemo(
    () => Object.values(noteTags).filter((v) => v !== 'unmarked').length,
    [noteTags]
  );

  // If Hint 1 is active, highlight 3 non-tonic scale pitches on the piano
  const hintScalePitches = useMemo<PitchClass[]>(() => {
    if (hintsUsed < 1) return [];
    return [targetKey.scaleNotes[2], targetKey.scaleNotes[4], targetKey.scaleNotes[6]];
  }, [hintsUsed, targetKey]);

  // If Hint 3 is active, narrow Circle of Fifths down to targetKey + its relative key
  const narrowedKeyIds = useMemo<string[]>(() => {
    if (hintsUsed < 3) return [];
    const rel = getRelativeKey(targetKey);
    return [targetKey.id, rel.id];
  }, [hintsUsed, targetKey]);

  const handleSubmitAnswer = () => {
    if (!selectedKeyId || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedKeyId === targetKey.id;
    const earned = isCorrect ? Math.max(25, 100 - hintsUsed * 15) : 15;
    setLastXpEarned(earned);

    if (isCorrect) {
      soundEngine.playChord(currentSong.chords[0].notes, 1.3);
    }

    setProgress((prev) => {
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const existingMastery = prev.keyMastery[targetKey.id] || { attempts: 0, correct: 0 };
      const completed =
        isCorrect && !prev.completedSongIds.includes(currentSong.id)
          ? [...prev.completedSongIds, currentSong.id]
          : prev.completedSongIds;

      return {
        ...prev,
        xp: prev.xp + earned,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        completedSongIds: completed,
        keyMastery: {
          ...prev.keyMastery,
          [targetKey.id]: {
            attempts: existingMastery.attempts + 1,
            correct: existingMastery.correct + (isCorrect ? 1 : 0),
            lastPracticed: Date.now(),
          },
        },
      };
    });
  };

  const handleCompleteStage2 = (xpEarned: number) => {
    setProgress((prev) => {
      const alreadyDone = prev.chordCompletedSongIds.includes(currentSong.id);
      return {
        ...prev,
        xp: prev.xp + xpEarned,
        chordCompletedSongIds: alreadyDone
          ? prev.chordCompletedSongIds
          : [...prev.chordCompletedSongIds, currentSong.id],
      };
    });
  };

  const handleNextSong = () => {
    const idx = filteredSongs.findIndex((s) => s.id === currentSong.id);
    const nextSong = filteredSongs[(idx + 1) % filteredSongs.length];
    loadSongChallenge(nextSong.id);
  };

  const masteredKeyIds = useMemo(() => {
    return Object.entries(progress.keyMastery)
      .filter(([, rec]) => rec.correct >= 1)
      .map(([kId]) => kId);
  }, [progress.keyMastery]);

  const isKeySolvedForCurrent =
    isSubmitted || progress.completedSongIds.includes(currentSong.id);
  const isChordsSolvedForCurrent = progress.chordCompletedSongIds.includes(currentSong.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Studio Navigation Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">
                  KeySense
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full">
                  Key & Chords Trainer
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Stage 1: Find the Key Signature • Stage 2: Identify the Chord Progression
              </p>
            </div>
          </div>

          {/* Center Mode Switcher */}
          <div className="inline-flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('trainer')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'trainer'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              Guided Song Challenges ({SONG_CHALLENGES.length})
            </button>
            <button
              type="button"
              onClick={() => {
                soundEngine.stopChordLoop();
                setActiveTab('explorer');
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'explorer'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore Any Song
            </button>
          </div>

          {/* Right Stats: Streak, XP, Keys Mastered & How It Works */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold"
              title="Current Streak"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white">{progress.currentStreak}</span>
              <span className="text-slate-400 font-normal hidden md:inline">Streak</span>
            </div>

            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold"
              title="Total Experience Points"
            >
              <Trophy className="w-4 h-4 text-indigo-400" />
              <span className="text-white">{progress.xp}</span>
              <span className="text-slate-400 font-normal">XP</span>
            </div>

            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold"
              title="Keys Mastered across the Circle of Fifths"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">{masteredKeyIds.length}/24</span>
              <span className="text-slate-400 font-normal hidden lg:inline">Keys</span>
            </div>

            <button
              type="button"
              onClick={() => setShowHowItWorks((v) => !v)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
              title="How to find a song's key and chords"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 space-y-5 flex-1">
        {/* Collapsible 4-Step Method Guide */}
        {showHowItWorks && (
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-indigo-200">
                How to Find a Song’s Key Signature & Chords
              </h3>
              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="text-xs text-indigo-300 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <strong className="text-amber-300 block mb-1">
                  1. Find the Tonic ("Home Note")
                </strong>
                Play single notes on the piano while the song loops. Tag the note that feels completely
                resolved at the end of a phrase with <strong className="text-amber-200">Tag Home</strong>.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <strong className="text-emerald-300 block mb-1">
                  2. Lock in the Key Signature
                </strong>
                Test whether the 3rd above your tonic is Major (bright) or Minor (dark) and match the
                fitting black/white keys on the Circle of Fifths.
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <strong className="text-indigo-300 block mb-1">
                  3. Use the Key’s 7 Diatonic Chords
                </strong>
                Once you know the key, 95% of the song’s chords come from the 7 diatonic triads of that
                scale (I, ii, iii, IV, V, vi, vii°).
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <strong className="text-purple-300 block mb-1">
                  4. Match Each Slot by Bass & Quality
                </strong>
                In Stage 2, click "Hear Target" on each of the 4 slots, find the bass root note on the
                piano, and drop in the matching Major or Minor chord!
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trainer' ? (
          <>
            {/* Top Bar: Difficulty Filter, Song Picker, and 2-Stage Stepper */}
            <div className="bg-slate-900/75 border border-slate-800/90 rounded-2xl p-3.5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1 px-1">Difficulty:</span>
                  {(
                    [
                      { level: 0, label: 'All Levels' },
                      { level: 1, label: 'Level 1 (0–2 ♯/♭)' },
                      { level: 2, label: 'Level 2 (2–4 ♯/♭)' },
                      { level: 3, label: 'Level 3 (4–6 ♯/♭)' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.level}
                      type="button"
                      onClick={() => {
                        setDifficultyFilter(item.level);
                        const list =
                          item.level === 0
                            ? SONG_CHALLENGES
                            : SONG_CHALLENGES.filter((s) => s.difficulty === item.level);
                        if (list.length > 0) loadSongChallenge(list[0].id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        difficultyFilter === item.level
                          ? 'bg-indigo-600 text-white shadow'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Song Picker Dropdown + Skip Button */}
                <div className="flex items-center gap-2">
                  <select
                    value={currentSong.id}
                    onChange={(e) => loadSongChallenge(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    aria-label="Choose song challenge"
                  >
                    {filteredSongs.map((s, idx) => {
                      const keyDone = progress.completedSongIds.includes(s.id);
                      const chordsDone = progress.chordCompletedSongIds.includes(s.id);
                      const statusIcon =
                        keyDone && chordsDone ? '★ ' : keyDone ? '✓ ' : `${idx + 1}. `;
                      return (
                        <option key={s.id} value={s.id}>
                          {statusIcon}
                          {s.title} — {s.artist} (Lvl {s.difficulty})
                        </option>
                      );
                    })}
                  </select>

                  <button
                    type="button"
                    onClick={handleNextSong}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer"
                  >
                    Next Song
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2-Stage Workflow Stepper Bar (Stage 1: Find the Key -> Stage 2: Identify the Chords) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => {
                    setChallengeStage('key');
                    setHighlightedChordNotes([]);
                    setHighlightedChordLabel(undefined);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition cursor-pointer ${
                    challengeStage === 'key'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                        isKeySolvedForCurrent
                          ? 'bg-emerald-500 text-slate-950'
                          : challengeStage === 'key'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isKeySolvedForCurrent ? '✓' : '1'}
                    </span>
                    <div>
                      <span className="text-xs font-extrabold block">
                        Stage 1: Find the Song’s Key Signature
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {isSubmitted || challengeStage === 'chords'
                          ? `Confirmed Key: ${targetKey.displayName}`
                          : 'Find the tonic & sharps/flats by ear'}
                      </span>
                    </div>
                  </div>
                  {isKeySolvedForCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {targetKey.shortName}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setChallengeStage('chords')}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition cursor-pointer ${
                    challengeStage === 'chords'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : isSubmitted
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 hover:bg-emerald-950/60'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                        isChordsSolvedForCurrent
                          ? 'bg-emerald-500 text-slate-950'
                          : challengeStage === 'chords'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isChordsSolvedForCurrent ? '✓' : '2'}
                    </span>
                    <div>
                      <span className="text-xs font-extrabold flex items-center gap-1.5">
                        Stage 2: Identify the Chords After the Key
                        {isSubmitted && challengeStage === 'key' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500 text-slate-950 font-extrabold">
                            Unlocked!
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {challengeStage === 'chords' || isSubmitted
                          ? `Match the 4-chord progression in ${targetKey.displayName}`
                          : 'Deduce the 4-chord progression using the key’s diatonic chords'}
                      </span>
                    </div>
                  </div>
                  <Music2 className="w-4 h-4 text-indigo-400 shrink-0" />
                </button>
              </div>
            </div>

            {/* 1. Song Player Card (Always visible in both Stage 1 & Stage 2) */}
            <SongPlayerCard
              song={currentSong}
              isSubmitted={isSubmitted && challengeStage === 'chords' && isChordsSolvedForCurrent}
              hintsUsed={hintsUsed}
            />

            {challengeStage === 'key' ? (
              /* =======================================
                 STAGE 1 VIEW: FIND THE KEY SIGNATURE
                 ======================================= */
              <>
                {isSubmitted && selectedKeyId && (
                  <ExplanationCard
                    song={currentSong}
                    selectedKeyId={selectedKeyId}
                    targetKey={targetKey}
                    xpEarned={lastXpEarned}
                    onContinueToChords={() => setChallengeStage('chords')}
                    onNextSong={handleNextSong}
                  />
                )}

                <PianoWorkbench
                  noteTags={noteTags}
                  onToggleNoteTag={handleToggleNoteTag}
                  onClearTags={() => setNoteTags(EMPTY_TAGS)}
                  revealedKey={isSubmitted ? targetKey : null}
                  hintScalePitches={hintScalePitches}
                  pianoVolume={pianoVolume}
                  onPianoVolumeChange={handlePianoVolumeChange}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7">
                    <HintPanel
                      song={currentSong}
                      targetKey={targetKey}
                      hintsUsed={hintsUsed}
                      onUnlockHint={() => setHintsUsed((h) => Math.min(3, h + 1))}
                      isSubmitted={isSubmitted}
                      deducedCandidates={deducedCandidates}
                      taggedNotesCount={taggedNotesCount}
                      onSelectDeducedKey={(kId) => setSelectedKeyId(kId)}
                    />
                  </div>

                  <div className="lg:col-span-5">
                    <KeySelector
                      selectedKeyId={selectedKeyId}
                      onSelectKey={(kId) => setSelectedKeyId(kId)}
                      onSubmitAnswer={handleSubmitAnswer}
                      isSubmitted={isSubmitted}
                      correctKeyId={targetKey.id}
                      narrowedKeyIds={narrowedKeyIds}
                      deducedTopKeyIds={
                        taggedNotesCount > 0
                          ? deducedCandidates.slice(0, 2).map((d) => d.key.id)
                          : []
                      }
                      masteredKeyIds={masteredKeyIds}
                    />
                  </div>
                </div>
              </>
            ) : (
              /* =======================================
                 STAGE 2 VIEW: IDENTIFY THE CHORDS
                 ======================================= */
              <>
                <ChordProgressionTrainer
                  song={currentSong}
                  targetKey={targetKey}
                  onHighlightPianoNotes={(notes, label) => {
                    setHighlightedChordNotes(notes);
                    setHighlightedChordLabel(label);
                  }}
                  onCompleteStage2={handleCompleteStage2}
                  onNextSong={handleNextSong}
                  isStage2Completed={isChordsSolvedForCurrent}
                />

                <PianoWorkbench
                  noteTags={noteTags}
                  onToggleNoteTag={handleToggleNoteTag}
                  onClearTags={() => setNoteTags(EMPTY_TAGS)}
                  revealedKey={targetKey}
                  highlightedChordNotes={highlightedChordNotes}
                  highlightedChordLabel={highlightedChordLabel}
                  pianoVolume={pianoVolume}
                  onPianoVolumeChange={handlePianoVolumeChange}
                />
              </>
            )}
          </>
        ) : (
          /* TAB 2: Explore Any Song on iTunes + Piano Workbench */
          <div className="space-y-5">
            <AnySongExplorer
              deducedCandidates={deducedCandidates}
              taggedNotesCount={taggedNotesCount}
            />
            <PianoWorkbench
              noteTags={noteTags}
              onToggleNoteTag={handleToggleNoteTag}
              onClearTags={() => setNoteTags(EMPTY_TAGS)}
              revealedKey={null}
              pianoVolume={pianoVolume}
              onPianoVolumeChange={handlePianoVolumeChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
