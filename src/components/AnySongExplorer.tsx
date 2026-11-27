import React, { useRef, useState } from 'react';
import {
  Search,
  Play,
  Pause,
  Loader2,
  Sparkles,
  Volume2,
  Music,
  CheckCircle2,
} from 'lucide-react';
import { searchItunesSongs } from '../services/itunesApi';
import { soundEngine } from '../services/audioEngine';
import { ItunesTrackPreview, KeySignatureInfo } from '../types/music';
import { KeySignatureStaff } from './KeySignatureStaff';

interface AnySongExplorerProps {
  deducedCandidates: {
    key: KeySignatureInfo;
    matchScore: number;
    fitsMatched: number;
    clashesAvoided: number;
  }[];
  taggedNotesCount: number;
}

export const AnySongExplorer: React.FC<AnySongExplorerProps> = ({
  deducedCandidates,
  taggedNotesCount,
}) => {
  const [query, setQuery] = useState('Viva La Vida Coldplay');
  const [results, setResults] = useState<ItunesTrackPreview[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<ItunesTrackPreview | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inspectedKey, setInspectedKey] = useState<KeySignatureInfo>(deducedCandidates[0].key);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    const tracks = await searchItunesSongs(query);
    setResults(tracks);
    if (tracks.length > 0 && !selectedTrack) {
      setSelectedTrack(tracks[0]);
    }
    setSearching(false);
  };

  const selectTrack = (track: ItunesTrackPreview) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedTrack(track);
    setIsPlaying(false);
    window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 80);
  };

  const togglePlay = () => {
    if (!audioRef.current || !selectedTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const activeKey = taggedNotesCount > 0 ? deducedCandidates[0].key : inspectedKey;

  return (
    <div className="space-y-5">
      {selectedTrack?.previewUrl && (
        <audio
          ref={audioRef}
          src={selectedTrack.previewUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Search Bar & Track Results */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-lg font-extrabold text-white">
              Any-Song Key Finder Workbench
            </h1>
            <p className="text-xs text-slate-400">
              Search any song on iTunes, play its 30s preview, tag fitting notes on the piano below,
              and deduce its exact key signature.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-96">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any song or artist..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition cursor-pointer shrink-0"
            >
              {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>

        {/* Search Results Pill Strip */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
            {results.slice(0, 4).map((track) => {
              const isCurrent = selectedTrack?.trackId === track.trackId;
              return (
                <button
                  key={track.trackId}
                  type="button"
                  onClick={() => selectTrack(track)}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-950/70 border-indigo-500 text-white'
                      : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={track.artworkUrl}
                    alt={track.trackName}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{track.trackName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{track.artistName}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Selected Song Player Bar */}
        {selectedTrack ? (
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={selectedTrack.artworkUrl}
                alt={selectedTrack.trackName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{selectedTrack.trackName}</h3>
                <p className="text-xs text-slate-400">{selectedTrack.artistName}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={togglePlay}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  Pause 30s Loop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Play 30s Preview
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-dashed border-slate-800 text-center text-xs text-slate-400">
            Click <strong>Search</strong> above to load any song from iTunes into the ear-training
            workbench.
          </div>
        )}
      </div>

      {/* Live Key Deduction Results from Tagged Piano Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Real-Time Key Signature Deductor
            </h2>
            <span className="text-xs text-slate-400">
              {taggedNotesCount} piano note{taggedNotesCount === 1 ? '' : 's'} tagged
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-4">
            1. Play notes on the piano below while the song plays. 2. Tag notes that sound good with{' '}
            <strong className="text-emerald-300">Tag Fits</strong> and tag the resting note with{' '}
            <strong className="text-amber-300">Tag Home / Tonic</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {deducedCandidates.slice(0, 6).map((item, idx) => {
              const isSelected = activeKey.id === item.key.id;
              return (
                <button
                  key={item.key.id}
                  type="button"
                  onClick={() => setInspectedKey(item.key)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-950/70 border-teal-400 ring-1 ring-teal-400'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-white">
                      {idx === 0 && taggedNotesCount > 0 && '★ '}
                      {item.key.displayName}
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-300">
                      {item.matchScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {item.key.accidentalCount === 0
                      ? '0 sharps / flats'
                      : `${item.key.accidentalCount} ${item.key.accidentalType}${
                          item.key.accidentalCount > 1 ? 's' : ''
                        } (${item.key.accidentals.join(' ')})`}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Inspected Candidate Key Staff & Scale Audition */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Inspecting {activeKey.displayName}
            </span>
            <button
              type="button"
              onClick={() => soundEngine.playScale(activeKey.scaleNotes)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-600/30 transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Test Scale
            </button>
          </div>

          <KeySignatureStaff keyInfo={activeKey} compact />

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Scale Notes:</span>
              <span className="font-mono font-bold text-white">
                {activeKey.scaleNoteNames.join(' – ')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Character:</span>
              <span className="text-slate-300 text-right">{activeKey.moodDescription}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
