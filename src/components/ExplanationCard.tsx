import React from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Volume2,
  BookOpen,
  Compass,
  Music2,
  Sparkles,
} from 'lucide-react';
import { getKeyById, getRelativeKey } from '../data/musicTheory';
import { soundEngine } from '../services/audioEngine';
import { KeySignatureInfo, SongChallenge } from '../types/music';
import { KeySignatureStaff } from './KeySignatureStaff';

interface ExplanationCardProps {
  song: SongChallenge;
  selectedKeyId: string;
  targetKey: KeySignatureInfo;
  xpEarned: number;
  onContinueToChords: () => void;
  onNextSong: () => void;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  song,
  selectedKeyId,
  targetKey,
  xpEarned,
  onContinueToChords,
  onNextSong,
}) => {
  const guessedKey = getKeyById(selectedKeyId);
  const relativeKey = getRelativeKey(targetKey);
  const isCorrect = selectedKeyId === targetKey.id;
  const pickedRelativeKey = selectedKeyId === relativeKey.id;
  const pickedParallelKey = selectedKeyId === targetKey.parallelKeyId;

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border shadow-2xl transition-all ${
        isCorrect
          ? 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-emerald-500/50'
          : 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-900 border-rose-500/50'
      }`}
    >
      {/* Top Result Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-8 h-8 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {isCorrect
                  ? `Stage 1 Complete! "${song.title}" is in ${targetKey.displayName}`
                  : pickedRelativeKey
                  ? `So Close! You found the right key signature (${relativeKey.displayName}), but the tonic is ${targetKey.displayName}`
                  : pickedParallelKey
                  ? `Close! You found the right tonic note (${targetKey.tonic}), but the mode is ${targetKey.displayName}`
                  : `Not quite — "${song.title}" is in ${targetKey.displayName}`}
              </h2>
              {xpEarned > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  +{xpEarned} XP
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {!isCorrect && (
                <span>
                  You guessed <strong className="text-white">{guessedKey.displayName}</strong> (
                  {guessedKey.accidentalCount === 0
                    ? '0 sharps/flats'
                    : `${guessedKey.accidentalCount} ${guessedKey.accidentalType}s`}
                  ).{' '}
                </span>
              )}
              Review why <strong className="text-emerald-300">{targetKey.displayName}</strong> is the
              key below, then continue to{' '}
              <strong className="text-indigo-300">
                Stage 2: Identify the Song’s Chords in {targetKey.shortName}
              </strong>
              !
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onContinueToChords}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition cursor-pointer"
          >
            <Music2 className="w-4 h-4" />
            Stage 2: Identify the Chords in {targetKey.shortName}
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onNextSong}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer"
          >
            Next Song
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {/* Column 1: Staff Notation + Scale Degrees */}
        <div className="space-y-3">
          <KeySignatureStaff keyInfo={targetKey} />

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Diatonic Scale Degrees
              </span>
              <button
                type="button"
                onClick={() => soundEngine.playScale(targetKey.scaleNotes)}
                className="text-[11px] font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3 h-3" />
                Play Scale
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {targetKey.scaleNoteNames.map((noteName, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => soundEngine.playNote(`${targetKey.scaleNotes[i]}4`, 2.2)}
                  className={`flex flex-col items-center py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    i === 0
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <span>{noteName}</span>
                  <span className="text-[9px] font-mono opacity-75">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Stage 2 Chord Challenge Teaser & Harmonic Context */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
              <Music2 className="w-4 h-4 text-indigo-400" />
              Next Step: Decode the Chords in {targetKey.shortName}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Knowing a song is in <strong className="text-white">{targetKey.displayName}</strong>{' '}
              immediately unlocks its 7 diatonic chords built from{' '}
              <span className="font-mono text-indigo-300">
                {targetKey.scaleNoteNames.join(' – ')}
              </span>
              .
            </p>

            <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-500/30 space-y-2">
              <span className="text-xs font-bold text-indigo-200 block">
                Ready to find the 4 chords of “{song.title}”?
              </span>
              <p className="text-[11px] text-slate-300">
                In Stage 2, you’ll listen to each of the 4 chord slots, test bass notes on the
                piano, and match them from the {targetKey.displayName} chord palette.
              </p>
              <button
                type="button"
                onClick={onContinueToChords}
                className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                Launch Stage 2: Chord Identifier
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
            <strong className="text-indigo-300">Harmonic Clue:</strong>{' '}
            {song.theoryExplanation.cadenceInsight}
          </div>
        </div>

        {/* Column 3: Step-by-Step Theory Explanation */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Step-by-Step Key Deduction
          </h3>

          <div className="space-y-2.5 text-xs leading-relaxed">
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="font-bold text-amber-300 block mb-0.5">
                1. Finding the Tonic (Home Note: {targetKey.scaleNoteNames[0]})
              </span>
              <p className="text-slate-300">{song.theoryExplanation.whyThisTonic}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-0.5">
                2. Why {targetKey.displayName} instead of {relativeKey.displayName}?
              </span>
              <p className="text-slate-300">{song.theoryExplanation.whyMajorOrMinor}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="font-bold text-indigo-300 block mb-0.5 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                3. Circle of Fifths Rule
              </span>
              <p className="text-slate-300">{song.theoryExplanation.keySignatureRule}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
