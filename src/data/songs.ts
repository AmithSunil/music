import { SongChallenge } from '../types/music';

export const SONG_CHALLENGES: SongChallenge[] = [
  // ==========================================
  // LEVEL 1: Beginner Keys (0–1 Sharp or Flat)
  // ==========================================
  {
    id: 'let-it-be',
    title: 'Let It Be',
    artist: 'The Beatles',
    year: 1970,
    itunesQuery: 'Let It Be The Beatles',
    keyId: 'C-major',
    bpm: 72,
    difficulty: 1,
    chords: [
      {
        symbol: 'C',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['C3', 'E3', 'G3', 'C4'],
      },
      {
        symbol: 'G',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['G3', 'B3', 'D4'],
      },
      {
        symbol: 'Am',
        roman: 'vi',
        functionLabel: 'Relative Minor',
        notes: ['A3', 'C4', 'E4'],
      },
      {
        symbol: 'F',
        roman: 'IV',
        functionLabel: 'Subdominant',
        notes: ['F3', 'A3', 'C4'],
      },
    ],
    earClue:
      'Try playing only the white keys on the piano. Notice how every single white key fits cleanly, and the opening piano chord settles warmly on C.',
    theoryExplanation: {
      whyThisTonic:
        'The piano loop begins on a C Major triad and uses the classic plagal cadence (F → C / IV → I) at the end of each phrase ("let it be") to return unmistakably to C as home.',
      whyMajorOrMinor:
        'Although A Minor shares the same 7 white keys, the vocal melody and bassline resolve repeatedly to C—giving the song its bright, comforting Major tonality.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats. On the keyboard, its scale uses exclusively the 7 white keys (C D E F G A B).',
      cadenceInsight:
        'Uses the iconic I – V – vi – IV pop progression followed by a IV – I ("Amen") plagal cadence.',
    },
  },
  {
    id: 'losing-my-religion',
    title: 'Losing My Religion',
    artist: 'R.E.M.',
    year: 1991,
    itunesQuery: 'Losing My Religion R.E.M.',
    keyId: 'A-minor',
    bpm: 125,
    difficulty: 1,
    chords: [
      {
        symbol: 'Am',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['A3', 'C4', 'E4'],
      },
      {
        symbol: 'Em',
        roman: 'v',
        functionLabel: 'Minor Dominant',
        notes: ['E3', 'G3', 'B3'],
      },
      {
        symbol: 'Dm',
        roman: 'iv',
        functionLabel: 'Subdominant',
        notes: ['D3', 'F3', 'A3'],
      },
      {
        symbol: 'G',
        roman: 'VII',
        functionLabel: 'Subtonic',
        notes: ['G3', 'B3', 'D4'],
      },
    ],
    earClue:
      'All white keys sound in-key here too! But test C versus A as your home note—listen to which one the mandolin riff keeps pulling back toward.',
    theoryExplanation: {
      whyThisTonic:
        'The famous mandolin riff walks up to and rests on A, and the verse sits firmly on the A Minor chord for bars at a time.',
      whyMajorOrMinor:
        'Even though A Minor has 0 sharps and 0 flats just like C Major, the tonal center is A and the primary chords (Am, Dm, Em) are all minor, creating a wistful, urgent mood.',
      keySignatureRule:
        'A Minor is the relative minor of C Major (3 semitones below C), so its key signature also has 0 sharps and 0 flats.',
      cadenceInsight:
        'Uses natural minor harmony (G → Am / VII → i) without raising the G to G♯.',
    },
  },
  {
    id: 'wish-you-were-here',
    title: 'Wish You Were Here',
    artist: 'Pink Floyd',
    year: 1975,
    itunesQuery: 'Wish You Were Here Pink Floyd',
    keyId: 'G-major',
    bpm: 62,
    difficulty: 1,
    chords: [
      {
        symbol: 'Em7',
        roman: 'vi7',
        functionLabel: 'Relative Minor Pedal',
        notes: ['E3', 'G3', 'B3', 'D4'],
      },
      {
        symbol: 'G',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['G3', 'B3', 'D4', 'G4'],
      },
      {
        symbol: 'C',
        roman: 'IV',
        functionLabel: 'Subdominant',
        notes: ['C3', 'E3', 'G3', 'C4'],
      },
      {
        symbol: 'D',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['D3', 'F#3', 'A3', 'D4'],
      },
    ],
    earClue:
      'Test F natural versus F♯ on the piano while the acoustic guitar plays. You will hear F natural clash while F♯ blends right in.',
    theoryExplanation: {
      whyThisTonic:
        'While the intro alternates between Em7 and G, every vocal section concludes with a strong acoustic resolution onto the open G Major chord.',
      whyMajorOrMinor:
        'The high G and D pedal strings ring across the entire progression, anchoring G Major as the bright home chord.',
      keySignatureRule:
        'G Major is 1 step clockwise on the Circle of Fifths and contains exactly 1 sharp: F♯ (its leading tone, a half-step below G).',
      cadenceInsight:
        'The verse resolves via C → D → G (IV → V → I), the classic authentic cadence in G Major.',
    },
  },
  {
    id: 'zombie',
    title: 'Zombie',
    artist: 'The Cranberries',
    year: 1994,
    itunesQuery: 'Zombie The Cranberries',
    keyId: 'E-minor',
    bpm: 84,
    difficulty: 1,
    chords: [
      {
        symbol: 'Em',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['E3', 'G3', 'B3', 'E4'],
      },
      {
        symbol: 'C',
        roman: 'VI',
        functionLabel: 'Submediant',
        notes: ['C3', 'E3', 'G3', 'C4'],
      },
      {
        symbol: 'G',
        roman: 'III',
        functionLabel: 'Relative Major',
        notes: ['G3', 'B3', 'D4'],
      },
      {
        symbol: 'D',
        roman: 'VII',
        functionLabel: 'Subtonic',
        notes: ['D3', 'F#3', 'A3'],
      },
    ],
    earClue:
      'Listen to the heavy opening chord of the loop. Find that dark root note on the lower half of the keyboard, then test whether F or F♯ fits.',
    theoryExplanation: {
      whyThisTonic:
        'The entire song cycles on a 4-bar loop that starts on E Minor and drops from D back down into E Minor at the start of every cycle.',
      whyMajorOrMinor:
        'Despite sharing G Major’s 1-sharp signature (F♯), the heavy, dark open-E bass note and minor third (G) define the song’s minor center.',
      keySignatureRule:
        'E Minor is the relative minor of G Major and has 1 sharp (F♯).',
      cadenceInsight:
        'Follows the i – VI – III – VII "Andalusian/Axis minor" loop (Em – C – G – D).',
    },
  },
  {
    id: 'hey-jude',
    title: 'Hey Jude',
    artist: 'The Beatles',
    year: 1968,
    itunesQuery: 'Hey Jude The Beatles',
    keyId: 'F-major',
    bpm: 74,
    difficulty: 1,
    chords: [
      {
        symbol: 'F',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['F3', 'A3', 'C4'],
      },
      {
        symbol: 'C',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['C3', 'E3', 'G3', 'C4'],
      },
      {
        symbol: 'Bb',
        roman: 'IV',
        functionLabel: 'Subdominant',
        notes: ['Bb3', 'D4', 'F4'],
      },
      {
        symbol: 'F',
        roman: 'I',
        functionLabel: 'Tonic Resolution',
        notes: ['F3', 'A3', 'C4', 'F4'],
      },
    ],
    earClue:
      'Play the white keys from F up to E: notice that B natural sounds too sharp, while B♭ (the black key) fits like a glove.',
    theoryExplanation: {
      whyThisTonic:
        'Paul McCartney’s opening vocal ("Hey Jude") lands squarely on the F Major tonic chord, and every verse closes with a C7 → F (V7 → I) resolution.',
      whyMajorOrMinor:
        'The bright major third (A natural) over the F root gives the song its warm, uplifting character.',
      keySignatureRule:
        'F Major is 1 step counter-clockwise on the Circle of Fifths and has exactly 1 flat: B♭.',
      cadenceInsight:
        'Features classic I – V – V7 – I and I – IV – I harmonic motion in F Major.',
    },
  },
  {
    id: 'bad-guy',
    title: 'bad guy',
    artist: 'Billie Eilish',
    year: 2019,
    itunesQuery: 'bad guy Billie Eilish',
    keyId: 'G-minor',
    bpm: 135,
    difficulty: 1,
    chords: [
      {
        symbol: 'Gm',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['G3', 'Bb3', 'D4'],
      },
      {
        symbol: 'Cm',
        roman: 'iv',
        functionLabel: 'Subdominant Minor',
        notes: ['C3', 'Eb3', 'G3'],
      },
      {
        symbol: 'D7',
        roman: 'V7',
        functionLabel: 'Harmonic Minor Dominant',
        notes: ['D3', 'F#3', 'A3', 'C4'],
      },
      {
        symbol: 'Gm',
        roman: 'i',
        functionLabel: 'Tonic Resolution',
        notes: ['G3', 'Bb3', 'D4'],
      },
    ],
    earClue:
      'The bassline stays locked on one root note for the entire first half of the verse. Find that root note on the piano first!',
    theoryExplanation: {
      whyThisTonic:
        'The iconic bass riff hammers G as its starting note for 4 straight bars before shifting up to C (the iv chord) and D (the V chord).',
      whyMajorOrMinor:
        'The riff outlines a G minor triad (G – B♭ – D), giving it its sneaky, dark minor groove.',
      keySignatureRule:
        'G Minor is the relative minor of B♭ Major and has 2 flats in its key signature: B♭ and E♭ (with an occasional F♯ borrowed from G harmonic minor on the D7 chord!).',
      cadenceInsight:
        'Follows a minor blues structure: i (Gm) → iv (Cm) → V (D) → i (Gm).',
    },
  },

  // ==========================================
  // LEVEL 2: Intermediate Keys (2–4 Sharps/Flats)
  // ==========================================
  {
    id: 'hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    year: 1976,
    itunesQuery: 'Hotel California Eagles',
    keyId: 'B-minor',
    bpm: 75,
    difficulty: 2,
    chords: [
      {
        symbol: 'Bm',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['B3', 'D4', 'F#4'],
      },
      {
        symbol: 'F#7',
        roman: 'V7',
        functionLabel: 'Harmonic Dominant',
        notes: ['F#3', 'Bb3', 'C#4', 'E4'],
      },
      {
        symbol: 'A',
        roman: 'VII',
        functionLabel: 'Subtonic',
        notes: ['A3', 'C#4', 'E4'],
      },
      {
        symbol: 'G',
        roman: 'VI',
        functionLabel: 'Submediant',
        notes: ['G3', 'B3', 'D4'],
      },
    ],
    earClue:
      'Test F♯ and C♯ on the piano—both black keys fit the natural scale of this song, and the 12-string guitar opens on B.',
    theoryExplanation: {
      whyThisTonic:
        'The progression launches on B Minor and uses a strong F♯7 dominant chord right in bar 2 and at the end of the 8-bar verse loop to pull back to B.',
      whyMajorOrMinor:
        'While the chorus momentarily brightens to D Major (its relative major), the verse and iconic solos anchor unmistakably on B Minor.',
      keySignatureRule:
        'B Minor is the relative minor of D Major and has 2 sharps in its key signature: F♯ and C♯.',
      cadenceInsight:
        'Uses a descending chromatic bassline starting from B (B – A♯ – A – G♯ – G – F♯).',
    },
  },
  {
    id: 'someone-like-you',
    title: 'Someone Like You',
    artist: 'Adele',
    year: 2011,
    itunesQuery: 'Someone Like You Adele',
    keyId: 'A-major',
    bpm: 67,
    difficulty: 2,
    chords: [
      {
        symbol: 'A',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['A3', 'C#4', 'E4'],
      },
      {
        symbol: 'E',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['E3', 'Ab3', 'B3'],
      },
      {
        symbol: 'F#m',
        roman: 'vi',
        functionLabel: 'Relative Minor',
        notes: ['F#3', 'A3', 'C#4'],
      },
      {
        symbol: 'D',
        roman: 'IV',
        functionLabel: 'Subdominant',
        notes: ['D3', 'F#3', 'A3'],
      },
    ],
    earClue:
      'Play A, C♯, and E together on the piano against the rolling arpeggio—you will hear the exact opening piano pattern.',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse and chorus begin on a rich A Major arpeggio (A – C♯ – E), and the vocal phrase "Never mind, I’ll find someone like you" resolves directly onto A.',
      whyMajorOrMinor:
        'The major third (C♯) in the opening piano chord establishes a warm, bittersweet Major key rather than F♯ Minor.',
      keySignatureRule:
        'A Major sits at 3 o’clock on the Circle of Fifths with 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'A textbook I – V – vi – IV progression in A Major (A – E – F♯m – D).',
    },
  },
  {
    id: 'blinding-lights',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    year: 2019,
    itunesQuery: 'Blinding Lights The Weeknd',
    keyId: 'F-minor',
    bpm: 171,
    difficulty: 2,
    chords: [
      {
        symbol: 'Fm',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['F3', 'Ab3', 'C4'],
      },
      {
        symbol: 'Cm',
        roman: 'v',
        functionLabel: 'Minor Dominant',
        notes: ['C3', 'Eb3', 'G3'],
      },
      {
        symbol: 'Eb',
        roman: 'VII',
        functionLabel: 'Subtonic',
        notes: ['Eb3', 'G3', 'Bb3'],
      },
      {
        symbol: 'Bb',
        roman: 'IV',
        functionLabel: 'Dorian Subdominant',
        notes: ['Bb3', 'D4', 'F4'],
      },
    ],
    earClue:
      'Listen to the famous synth lead hook: it starts and holds on one main note (F), then climbs up through G, A♭, B♭, and C.',
    theoryExplanation: {
      whyThisTonic:
        'The synth riff begins on F and returns to F Minor at the top of every 4-bar cycle, giving the track its unmistakable home pitch.',
      whyMajorOrMinor:
        'The minor third interval (F to A♭) is the heart of the synth hook, confirming F Minor over its relative A♭ Major.',
      keySignatureRule:
        'F Minor is the relative minor of A♭ Major and has 4 flats in its key signature: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Uses Fm – Cm – E♭ – B♭, borrowing a bright D natural on the B♭ chord (F Dorian color).',
    },
  },
  {
    id: 'rolling-in-the-deep',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    year: 2010,
    itunesQuery: 'Rolling in the Deep Adele',
    keyId: 'C-minor',
    bpm: 105,
    difficulty: 2,
    chords: [
      {
        symbol: 'Cm',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['C3', 'Eb3', 'G3', 'C4'],
      },
      {
        symbol: 'Gm',
        roman: 'v',
        functionLabel: 'Minor Dominant',
        notes: ['G3', 'Bb3', 'D4'],
      },
      {
        symbol: 'Bb',
        roman: 'VII',
        functionLabel: 'Subtonic',
        notes: ['Bb3', 'D4', 'F4'],
      },
      {
        symbol: 'Ab',
        roman: 'VI',
        functionLabel: 'Submediant',
        notes: ['Ab3', 'C4', 'Eb4'],
      },
    ],
    earClue:
      'Play C on the piano during the rhythmic acoustic guitar chug in the verse—then test E natural versus E♭ to hear the mode.',
    theoryExplanation: {
      whyThisTonic:
        'The verse opens with a driving C5/Cm pedal rhythm, and the chorus melody ("We could have had it all") lands powerfully on C.',
      whyMajorOrMinor:
        'E♭, A♭, and B♭ are prominent throughout the vocal melody, giving C Minor its bluesy, stormy authority.',
      keySignatureRule:
        'C Minor is the relative minor of E♭ Major and has 3 flats: B♭, E♭, and A♭.',
      cadenceInsight:
        'Chorus cycles between Cm – B♭ – A♭ – B♭ (i – VII – VI – VII) before resolving back to Cm.',
    },
  },
  {
    id: 'clocks',
    title: 'Clocks',
    artist: 'Coldplay',
    year: 2002,
    itunesQuery: 'Clocks Coldplay',
    keyId: 'Eb-major',
    bpm: 131,
    difficulty: 2,
    chords: [
      {
        symbol: 'Eb',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['Eb3', 'G3', 'Bb3', 'Eb4'],
      },
      {
        symbol: 'Bbm',
        roman: 'v',
        functionLabel: 'Mixolydian Minor Fifth',
        notes: ['Bb3', 'C#4', 'F4'],
      },
      {
        symbol: 'Bbm',
        roman: 'v',
        functionLabel: 'Minor Fifth (sustained)',
        notes: ['Bb3', 'C#4', 'F4'],
      },
      {
        symbol: 'Fm',
        roman: 'ii',
        functionLabel: 'Supertonic Minor',
        notes: ['F3', 'Ab3', 'C4'],
      },
    ],
    earClue:
      'The hypnotic piano arpeggio starts on a black key (E♭) and cascades down through B♭ and G.',
    theoryExplanation: {
      whyThisTonic:
        'The signature piano riff outlines an E♭ Major triad (E♭ – B♭ – G) at the top of every 4-bar loop, anchoring E♭ as the bright home chord.',
      whyMajorOrMinor:
        'Even though the second chord is a moody B♭ minor (borrowing D♭ from E♭ Mixolydian), the opening chord and vocal center are E♭ Major.',
      keySignatureRule:
        'E♭ Major has 3 flats in its standard key signature: B♭, E♭, and A♭.',
      cadenceInsight:
        'Uses a modal Mixolydian loop (I – v – ii) that gives the riff its floating, perpetual-motion feel.',
    },
  },
  {
    id: 'take-on-me',
    title: 'Take On Me',
    artist: 'a-ha',
    year: 1985,
    itunesQuery: 'Take On Me a-ha',
    keyId: 'A-major',
    bpm: 169,
    difficulty: 2,
    chords: [
      {
        symbol: 'Bm',
        roman: 'ii',
        functionLabel: 'Supertonic',
        notes: ['B3', 'D4', 'F#4'],
      },
      {
        symbol: 'E',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['E3', 'Ab3', 'B3'],
      },
      {
        symbol: 'A',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['A3', 'C#4', 'E4'],
      },
      {
        symbol: 'D',
        roman: 'IV',
        functionLabel: 'Subdominant',
        notes: ['D3', 'F#3', 'A3'],
      },
    ],
    earClue:
      'Test which 3 black keys fit across the entire song: F♯, C♯, and G♯ all fit cleanly!',
    theoryExplanation: {
      whyThisTonic:
        'While the verse riff starts on Bm (the ii chord), it immediately executes a ii → V → I turnaround (Bm → E → A), and the soaring chorus begins directly on A Major.',
      whyMajorOrMinor:
        'The iconic chorus ("Take on me") beams in A Major (A – E – F♯m – D), giving the song its euphoric lift.',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'A great lesson that a song doesn’t always start its verse on the I chord—follow where the V chord (E) resolves!',
    },
  },

  // ==========================================
  // LEVEL 3: Advanced Keys (4–6 Sharps/Flats)
  // ==========================================
  {
    id: 'shape-of-you',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    year: 2017,
    itunesQuery: 'Shape of You Ed Sheeran',
    keyId: 'C#-minor',
    bpm: 96,
    difficulty: 3,
    chords: [
      {
        symbol: 'C#m',
        roman: 'i',
        functionLabel: 'Tonic (Home)',
        notes: ['C#3', 'E3', 'Ab3', 'C#4'],
      },
      {
        symbol: 'F#m',
        roman: 'iv',
        functionLabel: 'Subdominant',
        notes: ['F#3', 'A3', 'C#4'],
      },
      {
        symbol: 'A',
        roman: 'VI',
        functionLabel: 'Submediant',
        notes: ['A3', 'C#4', 'E4'],
      },
      {
        symbol: 'B',
        roman: 'VII',
        functionLabel: 'Subtonic',
        notes: ['B3', 'Eb4', 'F#4'],
      },
    ],
    earClue:
      'The marimba riff uses only 5 notes (a minor pentatonic scale starting on a black key). Find that starting black key between C and D!',
    theoryExplanation: {
      whyThisTonic:
        'The marimba hook starts on C♯, leaps to E and F♯, and resolves back to C♯ at the end of every 2-bar loop.',
      whyMajorOrMinor:
        'The minor third interval (C♯ to E natural) gives the marimba riff its unmistakable minor bounce.',
      keySignatureRule:
        'C♯ Minor is the relative minor of E Major and has 4 sharps in its key signature: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Loops i – iv – VI – VII (C♯m – F♯m – A – B) continuously from start to finish.',
    },
  },
  {
    id: 'viva-la-vida',
    title: 'Viva La Vida',
    artist: 'Coldplay',
    year: 2008,
    itunesQuery: 'Viva La Vida Coldplay',
    keyId: 'Ab-major',
    bpm: 138,
    difficulty: 3,
    chords: [
      {
        symbol: 'Db',
        roman: 'IV',
        functionLabel: 'Subdominant Launch',
        notes: ['C#3', 'F3', 'Ab3', 'C#4'],
      },
      {
        symbol: 'Eb',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['Eb3', 'G3', 'Bb3', 'Eb4'],
      },
      {
        symbol: 'Ab',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['Ab3', 'C4', 'Eb4'],
      },
      {
        symbol: 'Fm',
        roman: 'vi',
        functionLabel: 'Relative Minor',
        notes: ['F3', 'Ab3', 'C4'],
      },
    ],
    earClue:
      'Try the 4 black keys B♭, E♭, A♭, and D♭—all 4 belong to this orchestral string loop!',
    theoryExplanation: {
      whyThisTonic:
        'The string loop starts on the IV chord (D♭) and climbs through E♭ (V) to resolve onto A♭ Major (I) on beat 1 of bar 2.',
      whyMajorOrMinor:
        'The IV → V → I ascent into A♭ Major gives the strings their regal, triumphant Major lift before stepping down to F Minor (vi).',
      keySignatureRule:
        'A♭ Major has 4 flats in its key signature: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Starting a loop on the IV chord (IV – V – I – vi) is a favorite modern pop technique to create forward momentum.',
    },
  },
  {
    id: 'superstition',
    title: 'Superstition',
    artist: 'Stevie Wonder',
    year: 1972,
    itunesQuery: 'Superstition Stevie Wonder',
    keyId: 'Eb-minor',
    bpm: 101,
    difficulty: 3,
    chords: [
      {
        symbol: 'Ebm7',
        roman: 'i7',
        functionLabel: 'Tonic Funk Riff (Home)',
        notes: ['Eb3', 'F#3', 'Bb3', 'C#4'],
      },
      {
        symbol: 'Ebm7',
        roman: 'i7',
        functionLabel: 'Tonic Groove',
        notes: ['Eb3', 'F#3', 'Bb3', 'C#4'],
      },
      {
        symbol: 'Bb7',
        roman: 'V7',
        functionLabel: 'Dominant Turnaround',
        notes: ['Bb3', 'D4', 'F4', 'Ab4'],
      },
      {
        symbol: 'Ab7',
        roman: 'IV7',
        functionLabel: 'Dorian Funk Subdominant',
        notes: ['Ab3', 'C4', 'Eb4', 'F#4'],
      },
    ],
    earClue:
      'Almost every note of this famous clavinet riff sits on the black keys! Find the black key between D and E that anchors the groove.',
    theoryExplanation: {
      whyThisTonic:
        'Stevie Wonder wrote the clavinet riff on the black keys centered around E♭, using the E♭ minor pentatonic scale (E♭, G♭, A♭, B♭, D♭).',
      whyMajorOrMinor:
        'The minor third (E♭ to G♭/F♯) and flat seventh (D♭) establish a deep E♭ Minor funk groove.',
      keySignatureRule:
        'E♭ Minor (enharmonic with D♯ Minor) is at the bottom of the Circle of Fifths with 6 flats: B♭, E♭, A♭, D♭, G♭, and C♭.',
      cadenceInsight:
        'The horn turnaround walks chromatically through B7 – B♭7 – A7 – A♭7 – B♭7 before slamming back into E♭m.',
    },
  },
  {
    id: 'mr-brightside',
    title: 'Mr. Brightside',
    artist: 'The Killers',
    year: 2003,
    itunesQuery: 'Mr. Brightside The Killers',
    keyId: 'Db-major',
    bpm: 148,
    difficulty: 3,
    chords: [
      {
        symbol: 'Db',
        roman: 'I',
        functionLabel: 'Tonic (Home)',
        notes: ['C#3', 'F3', 'Ab3', 'C#4'],
      },
      {
        symbol: 'Db/C',
        roman: 'I/vii',
        functionLabel: 'Major 7th Bass Walk',
        notes: ['C3', 'F3', 'Ab3', 'C#4'],
      },
      {
        symbol: 'Gb',
        roman: 'IV',
        functionLabel: 'Subdominant',
        notes: ['F#3', 'Bb3', 'C#4'],
      },
      {
        symbol: 'Ab',
        roman: 'V',
        functionLabel: 'Dominant',
        notes: ['Ab3', 'C4', 'Eb4'],
      },
    ],
    earClue:
      'Why do all the white keys except F and C clash? Because the guitars are tuned down a half-step from D Major into D♭ Major (5 flats)!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse arpeggio and the chorus ("I’m Mr. Brightside") resolve squarely onto D♭ Major.',
      whyMajorOrMinor:
        'All three primary chords in the chorus (D♭ – G♭ – B♭m – A♭) revolve around the bright D♭ Major tonic.',
      keySignatureRule:
        'D♭ Major has 5 flats: B♭, E♭, A♭, D♭, and G♭ (meaning all 5 black keys on the piano are in the scale!).',
      cadenceInsight:
        'Many rock bands tune their guitars down 1 semitone (E♭ standard), turning a D Major finger shape into concert D♭ Major.',
    },
  },
];
