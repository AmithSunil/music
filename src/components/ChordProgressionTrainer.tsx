import React, { useMemo, useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Unlock,
  Lock,
  Play,
  RotateCcw,
  ArrowRight,
  Music2,
  Sparkles,
  Ear,
  Eye,
} from 'lucide-react';
import { getDiatonicChordPalette } from '../data/musicTheory';
import { soundEngine } from '../services/audioEngine';
import { ChordItem, DiatonicChordOption, KeySignatureInfo, SongChallenge } from '../types/music';

interface ChordProgressionTrainerProps {
  song: SongChallenge;
  targetKey: KeySignatureInfo;
  onHighlightPianoNotes: (notes: string[], label?: string) => void;
  onCompleteStage2: (xpEarned: number) => void;
  onNextSong: () => void;
  isStage2Completed: boolean;
}

export const ChordProgressionTrainer: React.FC<ChordProgressionTrainerProps> = ({
  song,
  targetKey,
  onHighlightPianoNotes,
  onCompleteStage2,
  onNextSong,
  isStage2Completed,
}) => {
  const palette = useMemo(
    () => getDiatonicChordPalette(targetKey, song.chords),
    [targetKey, song.chords]
  );

  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [guessedChords, setGuessedChords] = useState<(DiatonicChordOption | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [slotResults, setSlotResults] = useState<('untested' | 'correct' | 'wrong')[]>([
    'untested',
    'untested',
    'untested',
    'untested',
  ]);
  const [chordHintsUsed, setChordHintsUsed] = useState<number>(0);
  const [isFullySolved, setIsFullySolved] = useState<boolean>(false);
  const [playingSlotIdx, setPlayingSlotIdx] = useState<number | null>(null);
  const [xpAwarded, setXpAwarded] = useState<number>(0);

  // Reset state if song changes
  React.useEffect(() => {
    setActiveSlot(0);
    setGuessedChords([null, null, null, null]);
    setSlotResults(['untested', 'untested', 'untested', 'untested']);
    setChordHintsUsed(0);
    setIsFullySolved(false);
    setPlayingSlotIdx(null);
    setXpAwarded(0);
  }, [song.id]);

  const playTargetSlot = (slotIdx: number) => {
    const targetChord = song.chords[slotIdx];
    if (!targetChord) return;
    setActiveSlot(slotIdx);
    setPlayingSlotIdx(slotIdx);
    soundEngine.playChord(targetChord.notes, 1.15);

    if (isFullySolved) {
      onHighlightPianoNotes(
        targetChord.notes,
        `Slot ${slotIdx + 1}: ${targetChord.symbol} (${targetChord.roman})`
      );
    } else if (chordHintsUsed >= 1) {
      // Hint 1 highlights the bass/root note on the piano!
      onHighlightPianoNotes(
        [targetChord.notes[0]],
        `Slot ${slotIdx + 1} Bass Root: ${targetChord.notes[0].replace(/\d$/, '')}`
      );
    } else {
      onHighlightPianoNotes([], undefined);
    }

    window.setTimeout(() => {
      setPlayingSlotIdx((curr) => (curr === slotIdx ? null : curr));
    }, 900);
  };

  const playFullTargetProgression = () => {
    song.chords.forEach((ch, idx) => {
      window.setTimeout(() => {
        setPlayingSlotIdx(idx);
        soundEngine.playChord(ch.notes, 1.1);
        if (isFullySolved) {
          onHighlightPianoNotes(ch.notes, `Slot ${idx + 1}: ${ch.symbol} (${ch.roman})`);
        }
      }, idx * 1150);
    });
    window.setTimeout(() => {
      setPlayingSlotIdx(null);
    }, song.chords.length * 1150);
  };

  const playGuessedProgression = () => {
    guessedChords.forEach((ch, idx) => {
      if (!ch) return;
      window.setTimeout(() => {
        setPlayingSlotIdx(idx);
        soundEngine.playChord(ch.notes, 1.1);
        onHighlightPianoNotes(ch.notes, `Your Slot ${idx + 1}: ${ch.symbol} (${ch.roman})`);
      }, idx * 1150);
    });
    window.setTimeout(() => {
      setPlayingSlotIdx(null);
    }, 4 * 1150);
  };

  const auditionPaletteChord = (option: DiatonicChordOption) => {
    soundEngine.playChord(option.notes, 1.15);
    onHighlightPianoNotes(
      option.notes,
      `${option.symbol} (${option.roman} — ${option.functionLabel})`
    );
  };

  const placeChordInActiveSlot = (option: DiatonicChordOption) => {
    if (isFullySolved) {
      auditionPaletteChord(option);
      return;
    }

    auditionPaletteChord(option);

    const nextGuesses = [...guessedChords];
    nextGuesses[activeSlot] = option;
    setGuessedChords(nextGuesses);

    // Clear previous test status on that slot
    const nextResults = [...slotResults];
    nextResults[activeSlot] = 'untested';
    setSlotResults(nextResults);

    // Advance to the next empty or incorrect slot
    const nextEmpty = nextGuesses.findIndex(
      (g, idx) => idx > activeSlot && (g === null || nextResults[idx] !== 'correct')
    );
    if (nextEmpty !== -1) {
      setActiveSlot(nextEmpty);
    } else {
      const firstEmpty = nextGuesses.findIndex(
        (g, idx) => g === null || nextResults[idx] !== 'correct'
      );
      if (firstEmpty !== -1) setActiveSlot(firstEmpty);
    }
  };

  const handleCheckProgression = () => {
    const newResults: ('untested' | 'correct' | 'wrong')[] = song.chords.map((target, idx) => {
      const guess = guessedChords[idx];
      if (!guess) return 'wrong';
      return guess.symbol.toLowerCase() === target.symbol.toLowerCase() ? 'correct' : 'wrong';
    });

    setSlotResults(newResults);

    const allCorrect = newResults.every((r) => r === 'correct');
    if (allCorrect) {
      setIsFullySolved(true);
      const earned = Math.max(30, 120 - chordHintsUsed * 20);
      setXpAwarded(earned);
      onCompleteStage2(earned);
      playFullTargetProgression();
    } else {
      // Focus the first wrong slot so user can immediately fix it
      const firstWrong = newResults.findIndex((r) => r !== 'correct');
      if (firstWrong !== -1) setActiveSlot(firstWrong);
    }
  };

  const handleRevealAll = () => {
    const revealedGuesses = song.chords.map((target) => {
      return (
        palette.find((p) => p.symbol.toLowerCase() === target.symbol.toLowerCase()) || {
          ...target,
          degree: 0,
          quality: 'borrowed' as const,
          rootNoteName: target.notes[0]?.replace(/\d$/, '') || target.symbol,
        }
      );
    });
    setGuessedChords(revealedGuesses);
    setSlotResults(['correct', 'correct', 'correct', 'correct']);
    setIsFullySolved(true);
    setXpAwarded(20);
    onCompleteStage2(20);
    playFullTargetProgression();
  };

  const getChordQualityFromTarget = (target: ChordItem): string => {
    if (target.symbol.includes('dim') || target.roman.includes('°')) return 'Diminished';
    if (target.symbol.includes('m') && !target.symbol.includes('maj')) return 'Minor';
    if (target.symbol.includes('7')) return 'Dominant 7th';
    return 'Major';
  };

  const getSlotDiagnostic = (slotIdx: number): string | null => {
    if (slotResults[slotIdx] !== 'wrong') return null;
    const guess = guessedChords[slotIdx];
    const target = song.chords[slotIdx];
    if (!guess) return 'Empty slot — select a chord below';

    const targetRoot = target.notes[0]?.replace(/\d$/, '');
    const guessRoot = guess.notes[0]?.replace(/\d$/, '');
    if (targetRoot === guessRoot) {
      return `Right root (${targetRoot}), check the chord quality/variation!`;
    }
    const targetQuality = getChordQualityFromTarget(target);
    const guessQuality = getChordQualityFromTarget(guess);
    if (targetQuality !== guessQuality) {
      return `Try a ${targetQuality} chord here instead of ${guessQuality}.`;
    }
    return `Listen closely to the bass movement into Slot ${slotIdx + 1}.`;
  };

  const allSlotsFilled = guessedChords.every((g) => g !== null);
  const correctCount = slotResults.filter((r) => r === 'correct').length;

  return (
    <div className="bg-slate-900/95 border border-indigo-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Top Header: Stage 2 Context & Why Knowing the Key Helps */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Stage 2 • Identify the Chords
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Key Locked: {targetKey.displayName} (
              {targetKey.accidentalCount === 0
                ? '0 ♯/♭'
                : `${targetKey.accidentalCount} ${
                    targetKey.accidentalType === 'sharp' ? '♯' : '♭'
                  }`}
              )
            </span>
            {(isFullySolved || isStage2Completed) && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                ✓ Progression Solved {xpAwarded > 0 ? `(+${xpAwarded} XP)` : ''}
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white mt-2">
            Find the 4-Chord Loop of “{song.title}” in {targetKey.displayName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Because you know the key is <strong className="text-white">{targetKey.displayName}</strong>,
            you don’t have to guess from all 12 notes—the chords come from the{' '}
            <strong className="text-indigo-300">
              7 Diatonic Chords of {targetKey.shortName}
            </strong>{' '}
            ({targetKey.scaleNoteNames.join(' – ')}). Click each slot to hear its target chord, then
            match it from the palette below!
          </p>
        </div>

        {/* Full Progression A/B Audition Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={playFullTargetProgression}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Hear Full Target Loop
          </button>

          {guessedChords.some((g) => g !== null) && (
            <button
              type="button"
              onClick={playGuessedProgression}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              Hear Your 4 Slots
            </button>
          )}
        </div>
      </div>

      {/* 1. Interactive 4-Slot Chord Timeline */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            1. Click a Slot to Listen, Then Pick Its Matching Chord Below
          </span>
          {!isFullySolved && guessedChords.some((g) => g !== null) && (
            <button
              type="button"
              onClick={() => {
                setGuessedChords([null, null, null, null]);
                setSlotResults(['untested', 'untested', 'untested', 'untested']);
                setActiveSlot(0);
              }}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All 4 Slots
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {song.chords.map((targetChord, idx) => {
            const isSelectedSlot = activeSlot === idx;
            const guess = guessedChords[idx];
            const status = slotResults[idx];
            const isCurrentlyPlaying = playingSlotIdx === idx;
            const diagnostic = getSlotDiagnostic(idx);
            const bassRoot = targetChord.notes[0]
              ?.replace(/\d$/, '')
              .replace('#', '♯')
              .replace('b', '♭');
            const targetQuality = getChordQualityFromTarget(targetChord);

            let borderClass = 'border-slate-800 bg-slate-950/85 hover:border-slate-700';
            if (status === 'correct') {
              borderClass = 'border-emerald-500/70 bg-emerald-950/35 ring-1 ring-emerald-500/40';
            } else if (status === 'wrong') {
              borderClass = 'border-rose-500/70 bg-rose-950/35 ring-1 ring-rose-500/40';
            } else if (isSelectedSlot) {
              borderClass = 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/40';
            }

            return (
              <div
                key={idx}
                onClick={() => setActiveSlot(idx)}
                className={`relative rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${borderClass} ${
                  isCurrentlyPlaying ? 'scale-[1.02] shadow-lg shadow-indigo-500/20' : ''
                }`}
              >
                {/* Slot Top Bar */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isSelectedSlot
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Chord {idx + 1}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playTargetSlot(idx);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition cursor-pointer"
                    >
                      <Ear className="w-3.5 h-3.5" />
                      Hear Target
                    </button>
                  </div>

                  {/* Active Hint Badges for this Slot */}
                  {(chordHintsUsed >= 1 || isFullySolved) && (
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {chordHintsUsed >= 1 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          Bass Note: {bassRoot}
                        </span>
                      )}
                      {chordHintsUsed >= 2 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {targetQuality} • {targetChord.functionLabel}
                        </span>
                      )}
                    </div>
                  )}

                  {/* User's Placed Guess Display */}
                  {guess ? (
                    <div className="my-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-extrabold text-white">{guess.symbol}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {guess.roman}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          Notes: {guess.notes.map((n) => n.replace(/\d$/, '')).join(' – ')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          auditionPaletteChord(guess);
                        }}
                        title="Hear your placed chord"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="my-2 h-16 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center text-center px-2">
                      <span className="text-xs font-semibold text-slate-400">
                        {isSelectedSlot ? 'Choose a chord below ↓' : 'Click to select slot'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Slot Bottom Status / Diagnostic */}
                <div className="mt-1 pt-2 border-t border-slate-800/70 min-h-[26px] flex items-center justify-between text-xs">
                  {status === 'correct' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Correct! ({targetChord.functionLabel})
                    </span>
                  ) : status === 'wrong' ? (
                    <span className="text-rose-300 font-medium flex items-center gap-1 text-[11px]">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      {diagnostic}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      {isSelectedSlot ? 'Active slot ready for input' : 'Click slot to edit'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Diatonic Chord Palette for the Confirmed Key */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Music2 className="w-4 h-4 text-indigo-400" />
              2. Diatonic Chord Palette in {targetKey.displayName}
            </h3>
            <p className="text-xs text-slate-400">
              Click any chord card to <strong className="text-white">hear it</strong>, highlight its
              notes on the piano below, and place it into{' '}
              <strong className="text-indigo-300">Chord Slot {activeSlot + 1}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              Uppercase (I, IV, V) = Major
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Lowercase (ii, iii, vi) = Minor
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {palette.map((option) => {
            const isMajor = option.quality === 'major' || option.quality === 'dominant7';
            const isMinor = option.quality === 'minor';
            const isDim = option.quality === 'diminished';

            return (
              <div
                key={option.symbol}
                className="flex flex-col justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/60 transition group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-mono font-extrabold border ${
                        isMajor
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : isMinor
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : isDim
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      }`}
                    >
                      {option.roman}
                    </span>

                    <button
                      type="button"
                      onClick={() => auditionPaletteChord(option)}
                      title={`Audition ${option.symbol} without placing`}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-indigo-600 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-1">
                    <span className="text-lg font-extrabold text-white block leading-tight">
                      {option.symbol}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                      {option.functionLabel}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                      {option.notes.map((n) => n.replace(/\d$/, '')).join('–')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => placeChordInActiveSlot(option)}
                  className="mt-3 w-full py-1.5 px-2 rounded-lg bg-indigo-600/25 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-xs font-bold transition cursor-pointer"
                >
                  {isFullySolved ? '🔊 Play Chord' : `+ Put in Slot ${activeSlot + 1}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Progressive Chord Hints & Check / Submit Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-2">
        {/* Left: 2-Stage Chord Ear-Training Hints */}
        <div className="lg:col-span-7 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            disabled={chordHintsUsed >= 1 || isFullySolved}
            onClick={() => setChordHintsUsed((h) => Math.max(h, 1))}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              chordHintsUsed >= 1 || isFullySolved
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            {chordHintsUsed >= 1 || isFullySolved ? (
              <Unlock className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            )}
            {chordHintsUsed >= 1 || isFullySolved
              ? 'Hint 1 Active: Bass Root Notes Shown'
              : 'Hint 1: Reveal Bass Root Notes (-20 XP)'}
          </button>

          <button
            type="button"
            disabled={chordHintsUsed >= 2 || isFullySolved}
            onClick={() => setChordHintsUsed(2)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              chordHintsUsed >= 2 || isFullySolved
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            {chordHintsUsed >= 2 || isFullySolved ? (
              <Unlock className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
            {chordHintsUsed >= 2 || isFullySolved
              ? 'Hint 2 Active: Quality & Function Shown'
              : 'Hint 2: Reveal Major/Minor Quality (-20 XP)'}
          </button>
        </div>

        {/* Right: Check Chords / Reveal / Next Song */}
        <div className="lg:col-span-5 flex flex-wrap items-center justify-end gap-2.5">
          {!isFullySolved ? (
            <>
              <button
                type="button"
                onClick={handleRevealAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Reveal Chords
              </button>

              <button
                type="button"
                disabled={!allSlotsFilled}
                onClick={handleCheckProgression}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold shadow-lg transition ${
                  allSlotsFilled
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {correctCount > 0 && correctCount < 4
                  ? `Check Again (${correctCount}/4 Correct)`
                  : 'Check 4-Chord Progression'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onNextSong}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Next Song Challenge
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
