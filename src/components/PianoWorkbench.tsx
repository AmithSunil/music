import React, { useEffect, useState } from 'react';
import { Crown, Check, X, Volume2, RotateCcw, Play, Sparkles, Music2 } from 'lucide-react';
import { soundEngine } from '../services/audioEngine';
import { KeySignatureInfo, NoteTagStatus, PitchClass, TagToolMode } from '../types/music';

interface PianoKeyDef {
  noteWithOctave: string;
  pitch: PitchClass;
  label: string;
  altLabel?: string;
  octave: number;
  isBlack: boolean;
  shortcut: string;
  whiteIndex: number;
}

// 2 full octaves: C3 to B4 (14 white keys, 10 black keys)
export const PIANO_KEYS: PianoKeyDef[] = [
  // Octave 3
  { noteWithOctave: 'C3', pitch: 'C', label: 'C', octave: 3, isBlack: false, shortcut: 'Z', whiteIndex: 0 },
  { noteWithOctave: 'C#3', pitch: 'C#', label: 'C♯', altLabel: 'D♭', octave: 3, isBlack: true, shortcut: 'S', whiteIndex: 0.65 },
  { noteWithOctave: 'D3', pitch: 'D', label: 'D', octave: 3, isBlack: false, shortcut: 'X', whiteIndex: 1 },
  { noteWithOctave: 'Eb3', pitch: 'Eb', label: 'E♭', altLabel: 'D♯', octave: 3, isBlack: true, shortcut: 'D', whiteIndex: 1.72 },
  { noteWithOctave: 'E3', pitch: 'E', label: 'E', octave: 3, isBlack: false, shortcut: 'C', whiteIndex: 2 },
  { noteWithOctave: 'F3', pitch: 'F', label: 'F', octave: 3, isBlack: false, shortcut: 'V', whiteIndex: 3 },
  { noteWithOctave: 'F#3', pitch: 'F#', label: 'F♯', altLabel: 'G♭', octave: 3, isBlack: true, shortcut: 'G', whiteIndex: 3.63 },
  { noteWithOctave: 'G3', pitch: 'G', label: 'G', octave: 3, isBlack: false, shortcut: 'B', whiteIndex: 4 },
  { noteWithOctave: 'Ab3', pitch: 'Ab', label: 'A♭', altLabel: 'G♯', octave: 3, isBlack: true, shortcut: 'H', whiteIndex: 4.68 },
  { noteWithOctave: 'A3', pitch: 'A', label: 'A', octave: 3, isBlack: false, shortcut: 'N', whiteIndex: 5 },
  { noteWithOctave: 'Bb3', pitch: 'Bb', label: 'B♭', altLabel: 'A♯', octave: 3, isBlack: true, shortcut: 'J', whiteIndex: 5.74 },
  { noteWithOctave: 'B3', pitch: 'B', label: 'B', octave: 3, isBlack: false, shortcut: 'M', whiteIndex: 6 },

  // Octave 4
  { noteWithOctave: 'C4', pitch: 'C', label: 'C', octave: 4, isBlack: false, shortcut: 'Q', whiteIndex: 7 },
  { noteWithOctave: 'C#4', pitch: 'C#', label: 'C♯', altLabel: 'D♭', octave: 4, isBlack: true, shortcut: '2', whiteIndex: 7.65 },
  { noteWithOctave: 'D4', pitch: 'D', label: 'D', octave: 4, isBlack: false, shortcut: 'W', whiteIndex: 8 },
  { noteWithOctave: 'Eb4', pitch: 'Eb', label: 'E♭', altLabel: 'D♯', octave: 4, isBlack: true, shortcut: '3', whiteIndex: 8.72 },
  { noteWithOctave: 'E4', pitch: 'E', label: 'E', octave: 4, isBlack: false, shortcut: 'E', whiteIndex: 9 },
  { noteWithOctave: 'F4', pitch: 'F', label: 'F', octave: 4, isBlack: false, shortcut: 'R', whiteIndex: 10 },
  { noteWithOctave: 'F#4', pitch: 'F#', label: 'F♯', altLabel: 'G♭', octave: 4, isBlack: true, shortcut: '5', whiteIndex: 10.63 },
  { noteWithOctave: 'G4', pitch: 'G', label: 'G', octave: 4, isBlack: false, shortcut: 'T', whiteIndex: 11 },
  { noteWithOctave: 'Ab4', pitch: 'Ab', label: 'A♭', altLabel: 'G♯', octave: 4, isBlack: true, shortcut: '6', whiteIndex: 11.68 },
  { noteWithOctave: 'A4', pitch: 'A', label: 'A', octave: 4, isBlack: false, shortcut: 'Y', whiteIndex: 12 },
  { noteWithOctave: 'Bb4', pitch: 'Bb', label: 'B♭', altLabel: 'A♯', octave: 4, isBlack: true, shortcut: '7', whiteIndex: 12.74 },
  { noteWithOctave: 'B4', pitch: 'B', label: 'B', octave: 4, isBlack: false, shortcut: 'U', whiteIndex: 13 },
];

interface PianoWorkbenchProps {
  noteTags: Record<PitchClass, NoteTagStatus>;
  onToggleNoteTag: (pitch: PitchClass, requestedStatus?: NoteTagStatus) => void;
  onClearTags: () => void;
  revealedKey?: KeySignatureInfo | null;
  hintScalePitches?: PitchClass[];
  highlightedChordNotes?: string[];
  highlightedChordLabel?: string;
  pianoVolume: number;
  onPianoVolumeChange: (vol: number) => void;
}

export const PianoWorkbench: React.FC<PianoWorkbenchProps> = ({
  noteTags,
  onToggleNoteTag,
  onClearTags,
  revealedKey,
  hintScalePitches = [],
  highlightedChordNotes = [],
  highlightedChordLabel,
  pianoVolume,
  onPianoVolumeChange,
}) => {
  const [activeNotes, setActiveNotes] = useState<Record<string, boolean>>({});
  const [toolMode, setToolMode] = useState<TagToolMode>('play');
  const [scaleHighlightNote, setScaleHighlightNote] = useState<string | null>(null);

  const triggerNote = (keyDef: PianoKeyDef, applyTagTool = true) => {
    soundEngine.playNote(keyDef.noteWithOctave, 2.6);
    setActiveNotes((prev) => ({ ...prev, [keyDef.noteWithOctave]: true }));
    window.setTimeout(() => {
      setActiveNotes((prev) => {
        const copy = { ...prev };
        delete copy[keyDef.noteWithOctave];
        return copy;
      });
    }, 380);

    if (applyTagTool && toolMode !== 'play') {
      const current = noteTags[keyDef.pitch] || 'unmarked';
      const targetStatus: NoteTagStatus =
        current === toolMode ? 'unmarked' : (toolMode as NoteTagStatus);
      onToggleNoteTag(keyDef.pitch, targetStatus);
    }
  };

  const handleRightClick = (e: React.MouseEvent, keyDef: PianoKeyDef) => {
    e.preventDefault();
    const order: NoteTagStatus[] = ['unmarked', 'fits', 'home', 'clashes'];
    const current = noteTags[keyDef.pitch] || 'unmarked';
    const next = order[(order.indexOf(current) + 1) % order.length];
    onToggleNoteTag(keyDef.pitch, next);
    soundEngine.playNote(keyDef.noteWithOctave, 1.8, 0.58);
  };

  // Computer keyboard bindings
  useEffect(() => {
    const shortcutMap = new Map<string, PianoKeyDef>();
    PIANO_KEYS.forEach((k) => shortcutMap.set(k.shortcut.toLowerCase(), k));

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.repeat ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }
      const match = shortcutMap.get(e.key.toLowerCase());
      if (match) {
        e.preventDefault();
        triggerNote(match, false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toolMode, noteTags]);

  const whiteKeys = PIANO_KEYS.filter((k) => !k.isBlack);
  const blackKeys = PIANO_KEYS.filter((k) => k.isBlack);

  const getScaleDegree = (pitch: PitchClass): number | null => {
    if (!revealedKey) return null;
    const idx = revealedKey.scaleNotes.indexOf(pitch);
    return idx >= 0 ? idx + 1 : null;
  };

  const isHintHighlighted = (pitch: PitchClass): boolean => {
    return !revealedKey && hintScalePitches.includes(pitch);
  };

  const getChordToneRole = (noteWithOctave: string): 'root' | 'tone' | null => {
    if (!highlightedChordNotes.length) return null;
    if (highlightedChordNotes[0] === noteWithOctave) return 'root';
    if (highlightedChordNotes.includes(noteWithOctave)) return 'tone';
    return null;
  };

  const taggedCount = Object.values(noteTags).filter((v) => v !== 'unmarked').length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
      {/* Top Bar: Title + Scratchpad Tagging Tools + Piano Volume */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              Interactive Ear-Training Piano Workbench
            </h2>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full">
              Keys Z–M & Q–U
            </span>
            {highlightedChordLabel && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold bg-purple-500/20 text-purple-200 border border-purple-400/50 rounded-full">
                <Music2 className="w-3 h-3 text-purple-300" />
                {highlightedChordLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Play along while the song loops. Tag notes that sound in-key, clash, or feel like the{' '}
            <strong className="text-amber-300">Home Note (Tonic)</strong>. Right-click any key to quick-tag.
          </p>
        </div>

        {/* Piano Volume & Play Scale */}
        <div className="flex items-center gap-3">
          {revealedKey && (
            <button
              onClick={() =>
                soundEngine.playScale(revealedKey.scaleNotes, (note) => setScaleHighlightNote(note))
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Play {revealedKey.displayName} Scale
            </button>
          )}

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Volume2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-[11px] text-slate-400 font-medium">Piano</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={pianoVolume}
              onChange={(e) => onPianoVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-indigo-500 cursor-pointer"
              aria-label="Piano Volume"
            />
          </div>
        </div>
      </div>

      {/* Ear-Training Scratchpad Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 mr-1">Click Action:</span>
          <button
            type="button"
            onClick={() => setToolMode('play')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              toolMode === 'play'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            🎹 Play Only
          </button>
          <button
            type="button"
            onClick={() => setToolMode('home')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              toolMode === 'home'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm shadow-amber-500/30'
                : 'bg-slate-800/80 text-amber-300 hover:bg-slate-800 border border-amber-500/30'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            Tag Home / Tonic
          </button>
          <button
            type="button"
            onClick={() => setToolMode('fits')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              toolMode === 'fits'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm shadow-emerald-500/30'
                : 'bg-slate-800/80 text-emerald-300 hover:bg-slate-800 border border-emerald-500/30'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            Tag Fits in Key
          </button>
          <button
            type="button"
            onClick={() => setToolMode('clashes')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              toolMode === 'clashes'
                ? 'bg-rose-500 text-white font-semibold shadow-sm shadow-rose-500/30'
                : 'bg-slate-800/80 text-rose-300 hover:bg-slate-800 border border-rose-500/30'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            Tag Clashes
          </button>
        </div>

        {taggedCount > 0 && (
          <button
            type="button"
            onClick={onClearTags}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear {taggedCount} Tagged {taggedCount === 1 ? 'Note' : 'Notes'}
          </button>
        )}
      </div>

      {/* 2-Octave Piano Keyboard Container */}
      <div className="relative select-none w-full overflow-x-auto pb-2">
        <div className="relative min-w-[640px] h-48 sm:h-52 bg-slate-950 p-2 rounded-xl border border-slate-800">
          {/* White Keys Layer */}
          <div className="grid grid-cols-14 gap-1 h-full">
            {whiteKeys.map((k) => {
              const isPressed =
                Boolean(activeNotes[k.noteWithOctave]) || scaleHighlightNote === k.noteWithOctave;
              const tag = noteTags[k.pitch] || 'unmarked';
              const degree = getScaleDegree(k.pitch);
              const isTonicDegree = degree === 1;
              const isHint = isHintHighlighted(k.pitch);
              const chordRole = getChordToneRole(k.noteWithOctave);

              let bgClass =
                'bg-gradient-to-b from-slate-100 to-white text-slate-900 hover:from-indigo-50 hover:to-white';
              if (isPressed) {
                bgClass =
                  'bg-gradient-to-b from-indigo-300 to-indigo-200 text-slate-950 translate-y-0.5 shadow-inner';
              } else if (chordRole === 'root') {
                bgClass =
                  'bg-gradient-to-b from-purple-200 to-purple-300 text-slate-950 ring-2 ring-purple-500';
              } else if (chordRole === 'tone') {
                bgClass =
                  'bg-gradient-to-b from-indigo-100 to-indigo-200 text-slate-950 ring-2 ring-indigo-400';
              } else if (isTonicDegree) {
                bgClass =
                  'bg-gradient-to-b from-amber-100 to-amber-200 text-slate-950 ring-2 ring-amber-400';
              } else if (degree !== null) {
                bgClass =
                  'bg-gradient-to-b from-emerald-50 to-emerald-100 text-slate-900 ring-1 ring-emerald-400/70';
              } else if (isHint) {
                bgClass =
                  'bg-gradient-to-b from-cyan-50 to-cyan-100 text-slate-900 ring-2 ring-cyan-400';
              }

              return (
                <button
                  key={k.noteWithOctave}
                  type="button"
                  onMouseDown={() => triggerNote(k)}
                  onContextMenu={(e) => handleRightClick(e, k)}
                  className={`relative flex flex-col items-center justify-end pb-2.5 rounded-b-lg border border-slate-300 transition-all duration-75 cursor-pointer shadow-md ${bgClass}`}
                >
                  {/* Top keyboard shortcut */}
                  <span className="absolute top-2 text-[10px] font-mono font-semibold text-slate-400">
                    {k.shortcut}
                  </span>

                  {/* Active Chord Tone Badge */}
                  {chordRole && (
                    <span
                      className={`mb-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold shadow ${
                        chordRole === 'root'
                          ? 'bg-purple-600 text-white'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {chordRole === 'root' ? 'Root' : 'Chord'}
                    </span>
                  )}

                  {/* Hint sparkle badge */}
                  {isHint && !chordRole && (
                    <span className="mb-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950 shadow">
                      <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                      Scale
                    </span>
                  )}

                  {/* Revealed Scale Degree Badge */}
                  {degree !== null && !chordRole && (
                    <span
                      className={`mb-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
                        isTonicDegree
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {isTonicDegree ? '1 ★' : degree}
                    </span>
                  )}

                  {/* User Ear-Training Tag Badge */}
                  {tag !== 'unmarked' && (
                    <span
                      className={`mb-1.5 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shadow ${
                        tag === 'home'
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                          : tag === 'fits'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                      }`}
                      title={`Tagged as: ${tag}`}
                    >
                      {tag === 'home' && <Crown className="w-3.5 h-3.5" />}
                      {tag === 'fits' && <Check className="w-3.5 h-3.5" />}
                      {tag === 'clashes' && <X className="w-3.5 h-3.5" />}
                    </span>
                  )}

                  {/* Note Label */}
                  <span className="text-xs font-bold tracking-tight">
                    {k.label}
                    <sub className="text-[9px] font-normal opacity-70">{k.octave}</sub>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Black Keys Overlay Layer */}
          {blackKeys.map((k) => {
            const isPressed =
              Boolean(activeNotes[k.noteWithOctave]) || scaleHighlightNote === k.noteWithOctave;
            const tag = noteTags[k.pitch] || 'unmarked';
            const degree = getScaleDegree(k.pitch);
            const isTonicDegree = degree === 1;
            const isHint = isHintHighlighted(k.pitch);
            const chordRole = getChordToneRole(k.noteWithOctave);

            const leftPercent = ((k.whiteIndex + 0.14) / 14) * 100;
            const widthPercent = (0.72 / 14) * 100;

            let blackBg =
              'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-slate-100 border-slate-700 hover:from-slate-700';
            if (isPressed) {
              blackBg =
                'bg-gradient-to-b from-indigo-500 to-indigo-700 text-white border-indigo-300 translate-y-0.5';
            } else if (chordRole === 'root') {
              blackBg =
                'bg-gradient-to-b from-purple-500 to-purple-800 text-white border-purple-300 ring-2 ring-purple-400';
            } else if (chordRole === 'tone') {
              blackBg =
                'bg-gradient-to-b from-indigo-500 to-indigo-800 text-white border-indigo-300 ring-2 ring-indigo-400';
            } else if (isTonicDegree) {
              blackBg =
                'bg-gradient-to-b from-amber-500 to-amber-700 text-slate-950 border-amber-300 ring-2 ring-amber-400';
            } else if (degree !== null) {
              blackBg =
                'bg-gradient-to-b from-emerald-700 to-emerald-900 text-white border-emerald-400';
            } else if (isHint) {
              blackBg =
                'bg-gradient-to-b from-cyan-600 to-cyan-800 text-white border-cyan-300 ring-2 ring-cyan-400';
            }

            return (
              <button
                key={k.noteWithOctave}
                type="button"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  triggerNote(k);
                }}
                onContextMenu={(e) => {
                  e.stopPropagation();
                  handleRightClick(e, k);
                }}
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                }}
                className={`absolute top-2 h-[60%] z-10 flex flex-col items-center justify-end pb-2 rounded-b-lg border shadow-lg transition-all duration-75 cursor-pointer ${blackBg}`}
              >
                <span className="absolute top-1.5 text-[9px] font-mono text-slate-400">
                  {k.shortcut}
                </span>

                {chordRole && (
                  <span
                    className={`mb-1 px-1 py-0.2 rounded-full text-[8px] font-extrabold ${
                      chordRole === 'root'
                        ? 'bg-purple-300 text-slate-950'
                        : 'bg-indigo-300 text-slate-950'
                    }`}
                  >
                    {chordRole === 'root' ? 'Root' : 'Chord'}
                  </span>
                )}

                {degree !== null && !chordRole && (
                  <span
                    className={`mb-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                      isTonicDegree ? 'bg-amber-300 text-slate-950' : 'bg-emerald-400 text-slate-950'
                    }`}
                  >
                    {isTonicDegree ? '1 ★' : degree}
                  </span>
                )}

                {tag !== 'unmarked' && (
                  <span
                    className={`mb-1 flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shadow ${
                      tag === 'home'
                        ? 'bg-amber-400 text-slate-950'
                        : tag === 'fits'
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {tag === 'home' && <Crown className="w-3 h-3" />}
                    {tag === 'fits' && <Check className="w-3 h-3" />}
                    {tag === 'clashes' && <X className="w-3 h-3" />}
                  </span>
                )}

                <span className="text-[10px] font-bold leading-tight text-center">
                  {k.label}
                  <span className="block text-[9px] font-normal opacity-75">{k.altLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
