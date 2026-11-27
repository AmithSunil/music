import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Music,
  Radio,
  Disc3,
  Loader2,
  Repeat,
} from 'lucide-react';
import { fetchSongPreview } from '../services/itunesApi';
import { soundEngine } from '../services/audioEngine';
import { ItunesTrackPreview, SongChallenge } from '../types/music';

interface SongPlayerCardProps {
  song: SongChallenge;
  isSubmitted: boolean;
  hintsUsed: number;
}

export const SongPlayerCard: React.FC<SongPlayerCardProps> = ({
  song,
  isSubmitted,
  hintsUsed,
}) => {
  const [preview, setPreview] = useState<ItunesTrackPreview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [audioMode, setAudioMode] = useState<'itunes' | 'synth'>('itunes');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [songVolume, setSongVolume] = useState<number>(0.75);
  const [activeChordIdx, setActiveChordIdx] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch 30-second real preview when song changes
  useEffect(() => {
    let cancelled = false;
    stopAllPlayback();
    setLoading(true);
    setCurrentTime(0);

    fetchSongPreview(song.itunesQuery, song.title).then((res) => {
      if (cancelled) return;
      setPreview(res);
      setLoading(false);
      if (!res) {
        setAudioMode('synth');
      } else {
        setAudioMode('itunes');
      }
    });

    return () => {
      cancelled = true;
      stopAllPlayback();
    };
  }, [song.id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = songVolume;
    }
  }, [songVolume]);

  const stopAllPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    soundEngine.stopChordLoop();
    setIsPlaying(false);
    setActiveChordIdx(null);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAllPlayback();
      return;
    }

    if (audioMode === 'itunes' && preview?.previewUrl && audioRef.current) {
      soundEngine.stopChordLoop();
      audioRef.current.volume = songVolume;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback to synth loop if stream blocked
          setAudioMode('synth');
          startSynthLoop();
        });
    } else {
      startSynthLoop();
    }
  };

  const startSynthLoop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(true);
    soundEngine.startChordLoop(song.chords, song.bpm, (idx) => {
      setActiveChordIdx(idx);
    });
  };

  const switchAudioMode = (mode: 'itunes' | 'synth') => {
    if (mode === audioMode) return;
    const wasPlaying = isPlaying;
    stopAllPlayback();
    setAudioMode(mode);

    if (wasPlaying) {
      window.setTimeout(() => {
        if (mode === 'synth') {
          startSynthLoop();
        } else if (audioRef.current && preview?.previewUrl) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 60);
    }
  };

  const handleRestart = () => {
    if (audioMode === 'itunes' && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      startSynthLoop();
    }
  };

  const formatTime = (sec: number) => {
    const s = Math.floor(sec);
    return `0:${s < 10 ? '0' : ''}${s}`;
  };

  const showChordNames = isSubmitted;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
      {/* Hidden HTML5 Audio Element for iTunes 30s Preview */}
      {preview?.previewUrl && (
        <audio
          ref={audioRef}
          src={preview.previewUrl}
          loop={isLooping}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current && audioRef.current.duration) {
              setDuration(audioRef.current.duration);
            }
          }}
          onEnded={() => {
            if (!isLooping) setIsPlaying(false);
          }}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Album Artwork & Song Metadata */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0 shadow-md flex items-center justify-center">
            {loading ? (
              <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            ) : preview?.artworkUrl ? (
              <img
                src={preview.artworkUrl}
                alt={`${song.title} cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Disc3 className="w-8 h-8 text-indigo-400" />
            )}
            {isPlaying && (
              <span className="absolute bottom-1.5 right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  song.difficulty === 1
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : song.difficulty === 2
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}
              >
                Level {song.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono">{song.bpm} BPM</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">{song.year}</span>
            </div>

            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-1 tracking-tight">
              {song.title}
            </h1>
            <p className="text-sm text-slate-300 font-medium">{song.artist}</p>
          </div>
        </div>

        {/* Right: Audio Source Toggle (Real 30s Song Preview vs. Isolated Chord Loop) */}
        <div className="flex flex-col sm:items-end gap-2">
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              disabled={!preview?.previewUrl}
              onClick={() => switchAudioMode('itunes')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                audioMode === 'itunes'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 disabled:opacity-40'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              Real Song Preview (30s)
            </button>
            <button
              type="button"
              onClick={() => switchAudioMode('synth')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                audioMode === 'synth'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              Isolated Chords (Synth)
            </button>
          </div>
          <span className="text-[11px] text-slate-400">
            {audioMode === 'itunes'
              ? 'Streaming live 30s audio preview — play piano notes along with the recording'
              : 'Playing isolated Web Audio harmonic chords so you can hear the tonic clearly'}
          </span>
        </div>
      </div>

      {/* Transport Controls & Progress Bar / Chord Loop Visualizer */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            disabled={loading && audioMode === 'itunes'}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition shadow-lg cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                {audioMode === 'itunes' ? 'Play Song Preview' : 'Play Chord Loop'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRestart}
            title="Restart playback"
            className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {audioMode === 'itunes' && (
            <button
              type="button"
              onClick={() => setIsLooping((l) => !l)}
              title="Toggle 30s loop"
              className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isLooping
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              Loop
            </button>
          )}
        </div>

        {/* Center Scrubber (iTunes mode) or Active Chord Pulse (Synth mode) */}
        {audioMode === 'itunes' ? (
          <div className="flex-1 min-w-[180px] flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 w-9 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 30}
              step={0.1}
              value={currentTime}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setCurrentTime(val);
                if (audioRef.current) audioRef.current.currentTime = val;
              }}
              className="flex-1 accent-indigo-500 cursor-pointer"
              aria-label="Song playback progress"
            />
            <span className="text-xs font-mono text-slate-400 w-9">
              {formatTime(duration || 30)}
            </span>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2">
            {song.chords.map((chord, idx) => {
              const isActive = activeChordIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => soundEngine.playChord(chord.notes, 1.3)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-400 scale-105 shadow'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {showChordNames ? chord.symbol : `Chord ${idx + 1}`}
                </button>
              );
            })}
          </div>
        )}

        {/* Right: Song Volume Control */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px] text-slate-400 font-medium">Track</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={songVolume}
            onChange={(e) => setSongVolume(parseFloat(e.target.value))}
            className="w-20 accent-emerald-500 cursor-pointer"
            aria-label="Track Volume"
          />
        </div>
      </div>
    </div>
  );
};
