import React from 'react';
import { KeySignatureInfo } from '../types/music';

interface KeySignatureStaffProps {
  keyInfo: KeySignatureInfo;
  compact?: boolean;
}

/**
 * Renders an authentic SVG Treble Clef musical staff with the exact sharps or flats
 * in standard conservatory positions (F# C# G# D# A# E# / Bb Eb Ab Db Gb Cb)
 */
export const KeySignatureStaff: React.FC<KeySignatureStaffProps> = ({
  keyInfo,
  compact = false,
}) => {
  // 5 staff lines from top (F5) to bottom (E4): y = 30, 42, 54, 66, 78
  const staffLines = [30, 42, 54, 66, 78];

  // Treble clef standard Y coordinates for sharps: F5, C5, G5, D5, A4, E5
  const sharpYPositions = [30, 48, 24, 42, 60, 36];

  // Treble clef standard Y coordinates for flats: B4, E5, A4, D5, G4, C5
  const flatYPositions = [54, 36, 60, 42, 66, 48];

  const isSharp = keyInfo.accidentalType === 'sharp';
  const isFlat = keyInfo.accidentalType === 'flat';
  const count = keyInfo.accidentalCount;

  // Tonic whole-note Y position on the treble staff
  const tonicYMap: Record<string, number> = {
    C: 90, // Middle C4 (with ledger line)
    'C#': 90,
    D: 84, // D4
    Eb: 78, // E4
    E: 78,
    F: 72, // F4
    'F#': 72,
    G: 66, // G4
    Ab: 60, // A4
    A: 60,
    Bb: 54, // B4
    B: 54,
  };

  const tonicY = tonicYMap[keyInfo.tonic] ?? 66;

  return (
    <div
      className={`bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col items-center justify-center ${
        compact ? 'p-2.5' : 'p-4'
      }`}
    >
      <svg
        viewBox="0 0 280 112"
        className={`w-full ${compact ? 'max-w-[220px] h-20' : 'max-w-[280px] h-28'}`}
        aria-label={`Musical staff showing key signature for ${keyInfo.displayName}`}
      >
        {/* 5 Staff Lines */}
        {staffLines.map((y, idx) => (
          <line
            key={idx}
            x1="14"
            y1={y}
            x2="266"
            y2={y}
            stroke="#475569"
            strokeWidth="1.5"
          />
        ))}

        {/* Left & Right Barlines */}
        <line x1="14" y1="30" x2="14" y2="78" stroke="#94a3b8" strokeWidth="2" />
        <line x1="262" y1="30" x2="262" y2="78" stroke="#64748b" strokeWidth="1.5" />
        <line x1="266" y1="30" x2="266" y2="78" stroke="#94a3b8" strokeWidth="3" />

        {/* Treble Clef Symbol */}
        <text
          x="22"
          y="74"
          fill="#e2e8f0"
          fontSize="58"
          fontFamily="serif"
          className="select-none"
        >
          𝄞
        </text>

        {/* Key Signature Sharps or Flats */}
        {Array.from({ length: count }).map((_, i) => {
          const x = 68 + i * 18;
          const y = isSharp ? sharpYPositions[i] : flatYPositions[i];
          const symbol = isSharp ? '♯' : '♭';
          return (
            <g key={i}>
              <text
                x={x}
                y={y + (isSharp ? 7 : 6)}
                fill={isSharp ? '#fbbf24' : '#38bdf8'}
                fontSize={isSharp ? '22' : '23'}
                fontWeight="bold"
                fontFamily="serif"
              >
                {symbol}
              </text>
            </g>
          );
        })}

        {/* Natural / 0 Sharps & Flats Indicator */}
        {count === 0 && (
          <text
            x="75"
            y="58"
            fill="#94a3b8"
            fontSize="11"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
          >
            0 ♯ / 0 ♭
          </text>
        )}

        {/* Ledger line for Middle C if tonic is C/C# */}
        {tonicY === 90 && (
          <line x1="210" y1="90" x2="242" y2="90" stroke="#94a3b8" strokeWidth="1.8" />
        )}

        {/* Tonic Whole Note Showcase on the right side of the staff */}
        <g>
          <ellipse
            cx="226"
            cy={tonicY}
            rx="8.5"
            ry="6"
            transform={`rotate(-15 226 ${tonicY})`}
            fill="none"
            stroke="#818cf8"
            strokeWidth="3.2"
          />
          <text
            x="226"
            y="20"
            textAnchor="middle"
            fill="#a5b4fc"
            fontSize="10"
            fontWeight="700"
          >
            Tonic: {keyInfo.scaleNoteNames[0]}
          </text>
        </g>
      </svg>

      <div className="flex items-center gap-2 text-xs mt-1">
        <span className="font-bold text-white">{keyInfo.displayName}</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 font-medium">
          {count === 0
            ? 'No sharps or flats'
            : `${count} ${isSharp ? 'sharp' : 'flat'}${count > 1 ? 's' : ''} (${keyInfo.accidentals.join(', ')})`}
        </span>
      </div>
    </div>
  );
};
