import React from 'react';
import { Lightbulb, Lock, Unlock, Volume2, Sparkles, Compass } from 'lucide-react';
import { getRelativeKey } from '../data/musicTheory';
import { soundEngine } from '../services/audioEngine';
import { KeySignatureInfo, PitchClass, SongChallenge } from '../types/music';

interface HintPanelProps {
  song: SongChallenge;
  targetKey: KeySignatureInfo;
  hintsUsed: number;
  onUnlockHint: () => void;
  isSubmitted: boolean;
  deducedCandidates: {
    key: KeySignatureInfo;
    matchScore: number;
    fitsMatched: number;
    clashesAvoided: number;
  }[];
  taggedNotesCount: number;
  onSelectDeducedKey: (keyId: string) => void;
}

export const HintPanel: React.FC<HintPanelProps> = ({
  song,
  targetKey,
  hintsUsed,
  onUnlockHint,
  isSubmitted,
  deducedCandidates,
  taggedNotesCount,
  onSelectDeducedKey,
}) => {
  const relativeKey = getRelativeKey(targetKey);

  // Sort pair alphabetically so Hint 3 doesn't give away which one is the answer by order
  const relativePair = [targetKey, relativeKey].sort((a, b) =>
    a.displayName.localeCompare(b.displayName)
  );

  const buildTriadForKey = (k: KeySignatureInfo): string[] => {
    const root = `${k.scaleNotes[0]}3`;
    const third = `${k.scaleNotes[2]}3`;
    const fifth = `${k.scaleNotes[4]}4`;
    return [root, third, fifth];
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header & Unlock Next Hint Button */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Guided Clues & Ear-Training Deduction
          </h2>
          <p className="text-xs text-slate-400">
            Unlock progressive music theory clues if you get stuck ({3 - hintsUsed} left)
          </p>
        </div>

        {!isSubmitted && hintsUsed < 3 && (
          <button
            type="button"
            onClick={onUnlockHint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition cursor-pointer shrink-0"
          >
            <Unlock className="w-3.5 h-3.5" />
            Unlock Hint {hintsUsed + 1} (-15 XP)
          </button>
        )}
      </div>

      {/* Live Note-to-Key Deduction Helper from Tagged Piano Notes */}
      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live Ear-Training Note Deductor
          </span>
          <span className="text-[11px] text-slate-400">
            {taggedNotesCount} note{taggedNotesCount === 1 ? '' : 's'} tagged on piano
          </span>
        </div>

        {taggedNotesCount === 0 ? (
          <p className="text-xs text-slate-400 leading-relaxed">
            Switch the piano tool to <strong className="text-emerald-300">Tag Fits</strong> or{' '}
            <strong className="text-amber-300">Tag Home</strong> (or right-click keys) as you test
            notes against the song. We’ll calculate which key signatures match your ear!
          </p>
        ) : (
          <div className="space-y-1.5">
            <p className="text-[11px] text-slate-400 mb-1">
              Top key signatures matching your tagged piano notes:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {deducedCandidates.slice(0, 4).map((item) => (
                <button
                  key={item.key.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => onSelectDeducedKey(item.key.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-teal-950/50 hover:bg-teal-900/60 border border-teal-500/30 text-left transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.key.shortName}</span>
                    <span className="text-[10px] font-mono font-bold text-teal-300">
                      {item.matchScore}%
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {item.key.accidentalCount === 0
                      ? '0 ♯/♭'
                      : `${item.key.accidentalCount} ${
                          item.key.accidentalType === 'sharp' ? '♯' : '♭'
                        }`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3 Progressive Hints Stack */}
      <div className="space-y-2.5">
        {/* HINT 1: Ear Clue & Accidental Count */}
        <div
          className={`p-3 rounded-xl border transition ${
            hintsUsed >= 1 || isSubmitted
              ? 'bg-slate-950/80 border-cyan-500/40 text-slate-200'
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className="flex items-center gap-1.5">
              {hintsUsed >= 1 || isSubmitted ? (
                <Unlock className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              Hint 1: Listening Clue & Accidental Count
            </span>
            {(hintsUsed >= 1 || isSubmitted) && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {targetKey.accidentalCount === 0
                  ? '0 Sharps / 0 Flats'
                  : `${targetKey.accidentalCount} ${
                      targetKey.accidentalType === 'sharp' ? 'Sharp' : 'Flat'
                    }${targetKey.accidentalCount > 1 ? 's' : ''}`}
              </span>
            )}
          </div>
          {hintsUsed >= 1 || isSubmitted ? (
            <p className="text-xs text-slate-300 leading-relaxed">
              {song.earClue} Also look for the{' '}
              <strong className="text-cyan-300">cyan scale badges</strong> now lit up on the piano!
            </p>
          ) : (
            <p className="text-xs">
              Reveals a specific ear-training tip for this song, how many sharps/flats it uses, and
              highlights 3 scale notes on the piano.
            </p>
          )}
        </div>

        {/* HINT 2: Song Chord Progression */}
        <div
          className={`p-3 rounded-xl border transition ${
            hintsUsed >= 2 || isSubmitted
              ? 'bg-slate-950/80 border-indigo-500/40 text-slate-200'
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5">
              {hintsUsed >= 2 || isSubmitted ? (
                <Unlock className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              Hint 2: Song Chord Progression (Click to Audition)
            </span>
          </div>
          {hintsUsed >= 2 || isSubmitted ? (
            <div>
              <p className="text-xs text-slate-300 mb-2">
                These 4 chords form the song’s harmonic loop. Click each chord to hear it and deduce
                which one is the <strong className="text-white">Tonic (Home)</strong> chord:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {song.chords.map((chord, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => soundEngine.playChord(chord.notes, 1.3)}
                    className="flex flex-col items-center justify-center p-2 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/70 border border-indigo-500/40 text-white transition cursor-pointer group"
                  >
                    <span className="text-sm font-extrabold flex items-center gap-1">
                      {chord.symbol}
                      <Volume2 className="w-3 h-3 text-indigo-400 opacity-75 group-hover:opacity-100" />
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {chord.notes.map((n) => n.replace(/\d/, '')).join('–')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs">
              Reveals the exact chords played in the excerpt so you can analyze the diatonic harmony
              and play each chord on demand.
            </p>
          )}
        </div>

        {/* HINT 3: Relative Major vs Minor 50/50 Narrow-Down */}
        <div
          className={`p-3 rounded-xl border transition ${
            hintsUsed >= 3 || isSubmitted
              ? 'bg-slate-950/80 border-amber-500/40 text-slate-200'
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5">
              {hintsUsed >= 3 || isSubmitted ? (
                <Compass className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              Hint 3: Narrow Down to Relative Major & Minor Pair (50/50)
            </span>
          </div>
          {hintsUsed >= 3 || isSubmitted ? (
            <div>
              <p className="text-xs text-slate-300 mb-2">
                The Circle of Fifths is now narrowed down to the 2 relative keys sharing{' '}
                <strong className="text-amber-300">
                  {targetKey.accidentalCount === 0
                    ? '0 sharps/flats'
                    : `${targetKey.accidentalCount} ${
                        targetKey.accidentalType === 'sharp' ? 'sharp(s)' : 'flat(s)'
                      }`}
                </strong>
                . Audition both home chords and decide which one feels like the true resting point:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {relativePair.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => soundEngine.playChord(buildTriadForKey(k), 1.4)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-200 transition cursor-pointer"
                  >
                    <span>Hear {k.displayName} Triad</span>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs">
              Highlights the exact Major/Relative Minor pair on the Circle of Fifths and lets you
              audition both candidate tonic chords side-by-side.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
