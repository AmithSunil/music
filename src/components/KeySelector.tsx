import React, { useState } from 'react';
import { Compass, Grid, CheckCircle2, Sparkles } from 'lucide-react';
import { KEY_SIGNATURES } from '../data/musicTheory';
import { KeySignatureInfo } from '../types/music';
import { KeySignatureStaff } from './KeySignatureStaff';

interface KeySelectorProps {
  selectedKeyId: string | null;
  onSelectKey: (keyId: string) => void;
  onSubmitAnswer?: () => void;
  isSubmitted?: boolean;
  correctKeyId?: string;
  narrowedKeyIds?: string[]; // From Hint 3 (Relative Major/Minor pair)
  deducedTopKeyIds?: string[]; // From user's marked piano notes
  masteredKeyIds?: string[];
}

export const KeySelector: React.FC<KeySelectorProps> = ({
  selectedKeyId,
  onSelectKey,
  onSubmitAnswer,
  isSubmitted = false,
  correctKeyId,
  narrowedKeyIds = [],
  deducedTopKeyIds = [],
  masteredKeyIds = [],
}) => {
  const [viewMode, setViewMode] = useState<'circle' | 'grid'>('circle');

  const majorKeys = KEY_SIGNATURES.filter((k) => k.mode === 'major').sort(
    (a, b) => a.circleIndex - b.circleIndex
  );
  const minorKeys = KEY_SIGNATURES.filter((k) => k.mode === 'minor').sort(
    (a, b) => a.circleIndex - b.circleIndex
  );

  const selectedKey = KEY_SIGNATURES.find((k) => k.id === selectedKeyId) || null;

  // Helper to compute SVG polar coordinates for Circle of Fifths
  const polarToCartesian = (cx: number, cy: number, r: number, index12: number) => {
    const angleDeg = index12 * 30 - 90; // 0 index at 12 o'clock (-90 deg)
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    };
  };

  const getKeyButtonStyle = (key: KeySignatureInfo) => {
    const isSelected = selectedKeyId === key.id;
    const isCorrect = isSubmitted && correctKeyId === key.id;
    const isWrongGuess = isSubmitted && isSelected && correctKeyId !== key.id;
    const isNarrowed = narrowedKeyIds.length > 0 && narrowedKeyIds.includes(key.id);
    const isDimmed = narrowedKeyIds.length > 0 && !narrowedKeyIds.includes(key.id);
    const isDeducedCandidate = deducedTopKeyIds.includes(key.id);

    if (isCorrect) {
      return {
        fill: '#10b981',
        stroke: '#6ee7b7',
        textFill: '#022c22',
        badgeClass: 'bg-emerald-500 text-slate-950 border-emerald-300 ring-2 ring-emerald-400',
      };
    }
    if (isWrongGuess) {
      return {
        fill: '#f43f5e',
        stroke: '#fda4af',
        textFill: '#ffffff',
        badgeClass: 'bg-rose-600 text-white border-rose-400 ring-2 ring-rose-400',
      };
    }
    if (isSelected) {
      return {
        fill: '#6366f1',
        stroke: '#a5b4fc',
        textFill: '#ffffff',
        badgeClass: 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/60',
      };
    }
    if (isNarrowed) {
      return {
        fill: '#f59e0b',
        stroke: '#fde68a',
        textFill: '#0f172a',
        badgeClass: 'bg-amber-500/25 text-amber-200 border-amber-400 ring-2 ring-amber-400/50',
      };
    }
    if (isDeducedCandidate) {
      return {
        fill: '#0f766e',
        stroke: '#2dd4bf',
        textFill: '#f0fdfa',
        badgeClass: 'bg-teal-900/70 text-teal-200 border-teal-400',
      };
    }
    if (isDimmed) {
      return {
        fill: '#0f172a',
        stroke: '#1e293b',
        textFill: '#475569',
        badgeClass: 'bg-slate-900/40 text-slate-600 border-slate-800/60 opacity-45',
      };
    }

    return key.mode === 'major'
      ? {
          fill: '#1e293b',
          stroke: '#334155',
          textFill: '#f8fafc',
          badgeClass:
            'bg-slate-800/90 text-slate-100 border-slate-700 hover:border-indigo-400 hover:bg-slate-800',
        }
      : {
          fill: '#0f172a',
          stroke: '#334155',
          textFill: '#cbd5e1',
          badgeClass:
            'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-indigo-400 hover:bg-slate-800/80',
        };
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
      {/* Header & Mode Switch */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Select the Song’s Key Signature
          </h2>
          <p className="text-xs text-slate-400">
            Outer ring: <strong className="text-slate-200">Major keys</strong> • Inner ring:{' '}
            <strong className="text-slate-200">Relative Minor keys</strong>
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode('circle')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
              viewMode === 'circle'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Circle of 5ths
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Grid
          </button>
        </div>
      </div>

      {/* Deduced candidate banner if user tagged notes on the piano */}
      {deducedTopKeyIds.length > 0 && !isSubmitted && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center gap-2 text-xs text-teal-200">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            Based on your tagged piano notes, top matches are highlighted in{' '}
            <strong className="text-teal-300">teal</strong>!
          </span>
        </div>
      )}

      {/* VIEW 1: Interactive SVG Circle of Fifths */}
      {viewMode === 'circle' ? (
        <div className="flex flex-col items-center my-1">
          <svg
            viewBox="0 0 360 360"
            className="w-full max-w-[330px] h-auto select-none"
            aria-label="Interactive Circle of Fifths"
          >
            {/* Decorative Ring Tracks */}
            <circle
              cx="180"
              cy="180"
              r="146"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle
              cx="180"
              cy="180"
              r="102"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
            <circle cx="180" cy="180" r="62" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />

            {/* Spokes connecting Relative Major & Minor pairs */}
            {majorKeys.map((maj) => {
              const p1 = polarToCartesian(180, 180, 102, maj.circleIndex);
              const p2 = polarToCartesian(180, 180, 146, maj.circleIndex);
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

            {/* Outer Ring: 12 Major Keys + Accidental Count Badges */}
            {majorKeys.map((key) => {
              const pos = polarToCartesian(180, 180, 146, key.circleIndex);
              const badgePos = polarToCartesian(180, 180, 173, key.circleIndex);
              const style = getKeyButtonStyle(key);
              const isMastered = masteredKeyIds.includes(key.id);

              const accLabel =
                key.accidentalCount === 0
                  ? '0'
                  : `${key.accidentalCount}${key.accidentalType === 'sharp' ? '♯' : '♭'}`;

              return (
                <g
                  key={key.id}
                  onClick={() => !isSubmitted && onSelectKey(key.id)}
                  className={isSubmitted ? 'cursor-default' : 'cursor-pointer group'}
                >
                  {/* Accidental count label outside the ring */}
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
                    fontSize="9.5"
                    fontWeight="700"
                  >
                    {accLabel}
                  </text>

                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="21"
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth="2.2"
                    className="transition-all duration-150 group-hover: brightness-110"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    textAnchor="middle"
                    fill={style.textFill}
                    fontSize="12.5"
                    fontWeight="800"
                  >
                    {key.shortName}
                  </text>
                  {isMastered && (
                    <circle
                      cx={pos.x + 14}
                      cy={pos.y - 14}
                      r="4.5"
                      fill="#10b981"
                      stroke="#020617"
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}

            {/* Inner Ring: 12 Relative Minor Keys */}
            {minorKeys.map((key) => {
              const pos = polarToCartesian(180, 180, 102, key.circleIndex);
              const style = getKeyButtonStyle(key);
              const isMastered = masteredKeyIds.includes(key.id);

              return (
                <g
                  key={key.id}
                  onClick={() => !isSubmitted && onSelectKey(key.id)}
                  className={isSubmitted ? 'cursor-default' : 'cursor-pointer group'}
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
                    {key.shortName}
                  </text>
                  {isMastered && (
                    <circle
                      cx={pos.x + 11}
                      cy={pos.y - 11}
                      r="4"
                      fill="#10b981"
                      stroke="#020617"
                      strokeWidth="1.2"
                    />
                  )}
                </g>
              );
            })}

            {/* Center Hub Info */}
            <text
              x="180"
              y="174"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="12"
              fontWeight="800"
            >
              {selectedKey ? selectedKey.shortName : 'Pick Key'}
            </text>
            <text
              x="180"
              y="191"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="9.5"
              fontWeight="600"
            >
              {selectedKey
                ? selectedKey.accidentalCount === 0
                  ? '0 ♯ / 0 ♭'
                  : `${selectedKey.accidentalCount} ${
                      selectedKey.accidentalType === 'sharp' ? '♯' : '♭'
                    }`
                : 'Major / Minor'}
            </text>
          </svg>
        </div>
      ) : (
        /* VIEW 2: Structured Major & Minor Key Grid */
        <div className="space-y-3 my-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1.5">
              Major Keys (Bright / Resolved)
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
              {majorKeys.map((k) => {
                const style = getKeyButtonStyle(k);
                return (
                  <button
                    key={k.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onSelectKey(k.id)}
                    className={`px-2 py-2 rounded-lg border text-xs font-bold transition flex flex-col items-center cursor-pointer ${style.badgeClass}`}
                  >
                    <span>{k.shortName}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {k.accidentalCount === 0
                        ? '0 ♯/♭'
                        : `${k.accidentalCount}${k.accidentalType === 'sharp' ? '♯' : '♭'}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
              Minor Keys (Dark / Moody)
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
              {minorKeys.map((k) => {
                const style = getKeyButtonStyle(k);
                return (
                  <button
                    key={k.id}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onSelectKey(k.id)}
                    className={`px-2 py-2 rounded-lg border text-xs font-bold transition flex flex-col items-center cursor-pointer ${style.badgeClass}`}
                  >
                    <span>{k.shortName}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {k.accidentalCount === 0
                        ? '0 ♯/♭'
                        : `${k.accidentalCount}${k.accidentalType === 'sharp' ? '♯' : '♭'}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Key Live Staff Preview & Submit Action */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-3">
        {selectedKey ? (
          <KeySignatureStaff keyInfo={selectedKey} compact />
        ) : (
          <div className="h-24 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-500">
            Click any Major or Minor key above to preview its staff signature
          </div>
        )}

        {onSubmitAnswer && !isSubmitted && (
          <button
            type="button"
            disabled={!selectedKeyId}
            onClick={onSubmitAnswer}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg ${
              selectedKeyId
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {selectedKey
              ? `Lock In Answer: ${selectedKey.displayName}`
              : 'Select a Key Signature to Submit'}
          </button>
        )}
      </div>
    </div>
  );
};
