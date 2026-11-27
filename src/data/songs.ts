import { SongChallenge } from '../types/music';

const RAW_SONG_CHALLENGES: SongChallenge[] = [
  // ============================================================================
  // LEVEL 1: Beginner Keys (0–2 Sharps or Flats: C, Am, G, Em, F, Dm, Bb, Gm)
  // ============================================================================
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
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
    ],
    earClue:
      'Try playing only the white keys on the piano. Every single white key fits cleanly, and the opening piano chord settles warmly on C.',
    theoryExplanation: {
      whyThisTonic:
        'The piano loop begins on a C Major triad and uses the classic plagal cadence (F → C / IV → I) at the end of each phrase ("let it be") to return to C as home.',
      whyMajorOrMinor:
        'Although A Minor shares the same 7 white keys, the vocal melody and bassline resolve repeatedly to C—giving the song its bright, comforting Major tonality.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats. On the keyboard, its scale uses exclusively the 7 white keys (C D E F G A B).',
      cadenceInsight:
        'Uses the iconic I – V – vi – IV pop progression followed by a IV – I ("Amen") plagal cadence.',
    },
  },
  {
    id: 'imagine',
    title: 'Imagine',
    artist: 'John Lennon',
    year: 1971,
    itunesQuery: 'Imagine John Lennon',
    keyId: 'C-major',
    bpm: 75,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Cmaj7', roman: 'Imaj7', functionLabel: 'Tonic Major 7th', notes: ['C3', 'E3', 'G3', 'B3'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant Resolution', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Listen to the gentle rocking piano intro: it starts on C and steps down through B to land on F, using only white keys.',
    theoryExplanation: {
      whyThisTonic:
        'Every verse begins on a warm C Major triad and the chorus concludes with a G → C (V → I) resolution on "and the world will live as one."',
      whyMajorOrMinor:
        'The bright E natural in the opening chord and dreamy B natural (Major 7th) anchor the song in C Major.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats—all 7 diatonic notes are white keys.',
      cadenceInsight:
        'Alternates peacefully between I (C) and IV (F) before closing the chorus with a IV – V – I cadence.',
    },
  },
  {
    id: 'hallelujah',
    title: 'Hallelujah',
    artist: 'Jeff Buckley',
    year: 1994,
    itunesQuery: 'Hallelujah Jeff Buckley',
    keyId: 'C-major',
    bpm: 56,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The lyrics literally tell you the chord progression ("It goes like this, the fourth, the fifth, the minor fall, the major lift")—all on white keys!',
    theoryExplanation: {
      whyThisTonic:
        'The arpeggiated guitar intro rocks between C Major and A Minor before resolving the chorus ("Hallelujah") onto C Major.',
      whyMajorOrMinor:
        'C Major is the home triad that starts each verse and ends each chorus via F → G → C.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats.',
      cadenceInsight:
        'Features the classic 1950s/folk progression I – vi – IV – V (C – Am – F – G).',
    },
  },
  {
    id: 'stay-with-me',
    title: 'Stay With Me',
    artist: 'Sam Smith',
    year: 2014,
    itunesQuery: 'Stay With Me Sam Smith',
    keyId: 'C-major',
    bpm: 84,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor Launch', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'All 7 notes of this gospel-pop piano progression sit on the white keys. Notice how the third chord of the 4-chord loop feels like the bright resting home!',
    theoryExplanation: {
      whyThisTonic:
        'Although the loop begins on Am (vi) and steps to F (IV), it resolves onto C Major (I) on bar 3—and ends the chorus on C Major ("won’t you stay with me").',
      whyMajorOrMinor:
        'The gospel choir melody centers around the C Major pentatonic scale (C D E G A) and resolves to C at the end of every chorus.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats.',
      cadenceInsight:
        'Uses the vi – IV – I – V "Axis" progression (Am – F – C – G) plus a IV – I plagal resolution.',
    },
  },
  {
    id: 'no-woman-no-cry',
    title: 'No Woman, No Cry',
    artist: 'Bob Marley & The Wailers',
    year: 1974,
    itunesQuery: 'No Woman No Cry Bob Marley',
    keyId: 'C-major',
    bpm: 78,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
    ],
    earClue:
      'Listen to the organ and bass walking up from F through G back into C on the white keys.',
    theoryExplanation: {
      whyThisTonic:
        'Every 2-bar cycle starts on C Major and uses an F → G → C bass walk-up to land back on C.',
      whyMajorOrMinor:
        'The bright major third (E) in the opening organ chord establishes C Major immediately.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats.',
      cadenceInsight:
        'Cycles I – V – vi – IV (C – G – Am – F) with a quick I – IV – I turnaround.',
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
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Em', roman: 'v', functionLabel: 'Minor Dominant', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'Dm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'All white keys sound in-key here too! Test C versus A as your home note—listen to which one the mandolin riff keeps pulling back toward.',
    theoryExplanation: {
      whyThisTonic:
        'The famous mandolin riff walks up to and rests on A, and the verse sits firmly on the A Minor chord.',
      whyMajorOrMinor:
        'Even though A Minor has 0 sharps and 0 flats just like C Major, the tonal center is A and the primary chords (Am, Dm, Em) are all minor.',
      keySignatureRule:
        'A Minor is the relative minor of C Major (3 semitones below C), so its key signature also has 0 sharps and 0 flats.',
      cadenceInsight:
        'Uses natural minor harmony (G → Am / VII → i) without raising the G to G♯.',
    },
  },
  {
    id: 'house-of-the-rising-sun',
    title: 'The House of the Rising Sun',
    artist: 'The Animals',
    year: 1964,
    itunesQuery: 'The House of the Rising Sun The Animals',
    keyId: 'A-minor',
    bpm: 78,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'C', roman: 'III', functionLabel: 'Relative Major', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Borrowed Dorian IV', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'F', roman: 'VI', functionLabel: 'Submediant', notes: ['F3', 'A3', 'C4'] },
    ],
    earClue:
      'Listen to the famous rolling electric guitar arpeggio on chord 1: play A, C, and E on the piano to hear the exact opening triad.',
    theoryExplanation: {
      whyThisTonic:
        'Every verse starts and ends on A Minor, with an E7 → Am (V7 → i) turnaround sealing A as the unmistakable home note.',
      whyMajorOrMinor:
        'The dark A Minor opening arpeggio and dramatic E7 dominant cadence make A Minor the clear center.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats in its natural key signature (while borrowing F♯ on the D Major chord and G♯ on the E7 chord).',
      cadenceInsight:
        'A classic lesson in minor keys: songs in A Minor frequently borrow a Major IV (D) and a Harmonic Minor V7 (E7)!',
    },
  },
  {
    id: 'californication',
    title: 'Californication',
    artist: 'Red Hot Chili Peppers',
    year: 1999,
    itunesQuery: 'Californication Red Hot Chili Peppers',
    keyId: 'A-minor',
    bpm: 96,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'F', roman: 'VI', functionLabel: 'Submediant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'C', roman: 'III', functionLabel: 'Relative Major', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The clean guitar riff alternates between two white-key chords (A Minor and F Major) before expanding to C, G, F, and Dm.',
    theoryExplanation: {
      whyThisTonic:
        'John Frusciante’s iconic guitar motif outlines A – E – B – C over an A bass note, returning to A Minor every 2 bars.',
      whyMajorOrMinor:
        'The melancholy A → C minor third interval in the opening bars anchors the track in A Minor.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats (all white keys).',
      cadenceInsight:
        'Alternates i – VI (Am – F) in the verse and III – VII – iv – i in the pre-chorus.',
    },
  },
  {
    id: 'stairway-to-heaven',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    year: 1971,
    itunesQuery: 'Stairway to Heaven Led Zeppelin',
    keyId: 'A-minor',
    bpm: 82,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'F', roman: 'VI', functionLabel: 'Submediant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['A3', 'C4', 'E4'] },
    ],
    earClue:
      'Both the fingerpicked acoustic intro and the final rock anthem cadence ("Am – G – F – G – Am") resolve squarely on A.',
    theoryExplanation: {
      whyThisTonic:
        'The entire piece begins on an A Minor arpeggio and climaxes with the famous Am – G – F descending minor cadence.',
      whyMajorOrMinor:
        'A – C – E is the home triad throughout both the acoustic and electric sections.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats.',
      cadenceInsight:
        'Uses the Aeolian cadence i – VII – VI – VII – i (Am – G – F – G – Am) in the finale.',
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
      { symbol: 'Em7', roman: 'vi7', functionLabel: 'Relative Minor Pedal', notes: ['E3', 'G3', 'B3', 'D4'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4', 'G4'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'D', roman: 'V', functionLabel: 'Dominant', notes: ['D3', 'F#3', 'A3', 'D4'] },
    ],
    earClue:
      'Test F natural versus F♯ on the piano while the acoustic guitar plays. You will hear F natural clash while F♯ blends right in.',
    theoryExplanation: {
      whyThisTonic:
        'While the intro alternates between Em7 and G, every vocal section concludes with a strong acoustic resolution onto the open G Major chord.',
      whyMajorOrMinor:
        'The high G and D pedal strings ring across the entire progression, anchoring G Major as the bright home chord.',
      keySignatureRule:
        'G Major is 1 step clockwise on the Circle of Fifths and contains 1 sharp: F♯.',
      cadenceInsight:
        'The verse resolves via C → D → G (IV → V → I), the classic authentic cadence in G Major.',
    },
  },
  {
    id: 'sweet-home-alabama',
    title: 'Sweet Home Alabama',
    artist: 'Lynyrd Skynyrd',
    year: 1974,
    itunesQuery: 'Sweet Home Alabama Lynyrd Skynyrd',
    keyId: 'G-major',
    bpm: 98,
    difficulty: 1,
    chords: [
      { symbol: 'D', roman: 'V', functionLabel: 'Dominant Launch', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic Sustain', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Only 1 black key (F♯) fits this entire Southern rock riff, and the progression rests for two full beats on G!',
    theoryExplanation: {
      whyThisTonic:
        'The D – C – G loop lands on G Major and holds it for two full bars, making G the clear gravitational resting center (even though the riff starts on D Mixolydian!).',
      whyMajorOrMinor:
        'All three chords (D, C, G) are bright Major triads from the 1-sharp G Major scale.',
      keySignatureRule:
        'G Major has 1 sharp: F♯.',
      cadenceInsight:
        'Follows a V – IV – I rock turnaround (D – C – G) where G Major holds twice as long as D and C.',
    },
  },
  {
    id: 'good-riddance',
    title: 'Good Riddance (Time of Your Life)',
    artist: 'Green Day',
    year: 1997,
    itunesQuery: 'Good Riddance Time of Your Life Green Day',
    keyId: 'G-major',
    bpm: 95,
    difficulty: 1,
    chords: [
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'D', roman: 'V', functionLabel: 'Dominant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'Em', roman: 'vi', functionLabel: 'Relative Minor', notes: ['E3', 'G3', 'B3'] },
    ],
    earClue:
      'Listen to the acoustic guitar picking at the very start: it plays a G Major chord for two bars before moving to C and D.',
    theoryExplanation: {
      whyThisTonic:
        'The song opens with a double-G intro and resolves every chorus ("I hope you had the time of your life") straight back to G Major.',
      whyMajorOrMinor:
        'G – B – D is the home chord and all chords come directly from the bright G Major diatonic family.',
      keySignatureRule:
        'G Major has 1 sharp (F♯).',
      cadenceInsight:
        'Uses I – IV – V (G – C – D) in the verse and vi – V – IV – I (Em – D – C – G) in the chorus.',
    },
  },
  {
    id: 'ring-of-fire',
    title: 'Ring of Fire',
    artist: 'Johnny Cash',
    year: 1963,
    itunesQuery: 'Ring of Fire Johnny Cash',
    keyId: 'G-major',
    bpm: 104,
    difficulty: 1,
    chords: [
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'D', roman: 'V', functionLabel: 'Dominant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The famous mariachi trumpet hook plays solely using notes from the G Major triad and scale (with F♯ as the only black key).',
    theoryExplanation: {
      whyThisTonic:
        'Both the mariachi horns and Johnny Cash’s low baritone vocal start and end every phrase on G Major.',
      whyMajorOrMinor:
        'Built entirely from the three primary Major chords of G Major: G (I), C (IV), and D (V).',
      keySignatureRule:
        'G Major has 1 sharp (F♯).',
      cadenceInsight:
        'Pure three-chord country harmony: I – IV – I and I – V – I in G Major.',
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
      { symbol: 'Em', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['E3', 'G3', 'B3', 'E4'] },
      { symbol: 'C', roman: 'VI', functionLabel: 'Submediant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'III', functionLabel: 'Relative Major', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'D', roman: 'VII', functionLabel: 'Subtonic', notes: ['D3', 'F#3', 'A3'] },
    ],
    earClue:
      'Listen to the heavy opening chord of the loop. Find that dark root note (E) on the lower half of the keyboard, then test whether F or F♯ fits.',
    theoryExplanation: {
      whyThisTonic:
        'The entire song cycles on a 4-bar loop that starts on E Minor and drops from D back down into E Minor at the start of every cycle.',
      whyMajorOrMinor:
        'Despite sharing G Major’s 1-sharp signature (F♯), the heavy open-E bass note and minor third (G) define the song’s minor center.',
      keySignatureRule:
        'E Minor is the relative minor of G Major and has 1 sharp (F♯).',
      cadenceInsight:
        'Follows the i – VI – III – VII minor loop (Em – C – G – D).',
    },
  },
  {
    id: 'nothing-else-matters',
    title: 'Nothing Else Matters',
    artist: 'Metallica',
    year: 1991,
    itunesQuery: 'Nothing Else Matters Metallica',
    keyId: 'E-minor',
    bpm: 69,
    difficulty: 1,
    chords: [
      { symbol: 'Em', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['E3', 'G3', 'B3', 'E4'] },
      { symbol: 'D', roman: 'VII', functionLabel: 'Subtonic', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'C', roman: 'VI', functionLabel: 'Submediant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'B7', roman: 'V7', functionLabel: 'Harmonic Dominant', notes: ['B3', 'Eb4', 'F#4', 'A4'] },
    ],
    earClue:
      'The legendary open-string guitar intro plucks E – G – B – E. Play those 4 notes on the piano to match the intro instantly!',
    theoryExplanation: {
      whyThisTonic:
        'The acoustic guitar arpeggiates an open E Minor chord for several bars before walking down through D and C and using B7 (V7) to snap back to Em.',
      whyMajorOrMinor:
        'E – G – B is a pure E Minor triad, establishing a brooding, majestic 6/8 minor ballad.',
      keySignatureRule:
        'E Minor has 1 sharp in its key signature: F♯ (and raises D to D♯/E♭ on the B7 dominant chord).',
      cadenceInsight:
        'Combines natural minor descent (Em – D – C) with a classical harmonic minor V7 → i (B7 → Em) cadence.',
    },
  },
  {
    id: 'seven-nation-army',
    title: 'Seven Nation Army',
    artist: 'The White Stripes',
    year: 2003,
    itunesQuery: 'Seven Nation Army The White Stripes',
    keyId: 'E-minor',
    bpm: 124,
    difficulty: 1,
    chords: [
      { symbol: 'Em', roman: 'i', functionLabel: 'Tonic Riff (Home)', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'G', roman: 'III', functionLabel: 'Relative Major', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'C', roman: 'VI', functionLabel: 'Submediant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'B', roman: 'V', functionLabel: 'Dominant Turnaround', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'Play E – E – G – E – D – C – B on the piano! That single-note bassline tells you the entire key and chord progression.',
    theoryExplanation: {
      whyThisTonic:
        'The world-famous bass riff starts on E, leaps up a minor third to G, and walks down D – C – B before resolving back to E.',
      whyMajorOrMinor:
        'The E to G leap right at the start of the riff is a minor third, locking in E Minor.',
      keySignatureRule:
        'E Minor has 1 sharp (F♯).',
      cadenceInsight:
        'The chorus slams on G → A (III → IV) before dropping into the C → B → Em cadence.',
    },
  },
  {
    id: 'enter-sandman',
    title: 'Enter Sandman',
    artist: 'Metallica',
    year: 1991,
    itunesQuery: 'Enter Sandman Metallica',
    keyId: 'E-minor',
    bpm: 123,
    difficulty: 1,
    chords: [
      { symbol: 'Em', roman: 'i', functionLabel: 'Tonic Pedal (Home)', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'G', roman: 'III', functionLabel: 'Mediant Riff Note', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'F#m', roman: 'ii', functionLabel: 'Half-Step Tension', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'B7', roman: 'V7', functionLabel: 'Dominant Pre-Chorus', notes: ['B3', 'Eb4', 'F#4', 'A4'] },
    ],
    earClue:
      'A low open E bass note drones continuously under the intro guitar riff. Find E3 on the piano!',
    theoryExplanation: {
      whyThisTonic:
        'The low E string chugs as an unrelenting pedal tone throughout the intro, verse, and main riff.',
      whyMajorOrMinor:
        'Centered on E Minor (with a sinister B♭ tritone and F♯ Phrygian half-step in the main riff).',
      keySignatureRule:
        'E Minor is the 1-sharp minor key (F♯).',
      cadenceInsight:
        'Uses an E pedal riff in the verse and a B7 (V7) dominant build-up that explodes back into E Minor.',
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
      { symbol: 'F', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'C', roman: 'V', functionLabel: 'Dominant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Subdominant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'F', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['F3', 'A3', 'C4', 'F4'] },
    ],
    earClue:
      'Play the white keys from F up to E: notice that B natural sounds too sharp, while B♭ (the black key) fits like a glove.',
    theoryExplanation: {
      whyThisTonic:
        'Paul McCartney’s opening vocal ("Hey Jude") lands squarely on the F Major tonic chord, and every verse closes with a C7 → F (V7 → I) resolution.',
      whyMajorOrMinor:
        'The bright major third (A natural) over the F root gives the song its warm, uplifting character.',
      keySignatureRule:
        'F Major is 1 step counter-clockwise on the Circle of Fifths and has 1 flat: B♭.',
      cadenceInsight:
        'Features classic I – V – V7 – I and I – IV – I harmonic motion in F Major.',
    },
  },
  {
    id: 'free-fallin',
    title: "Free Fallin'",
    artist: 'Tom Petty',
    year: 1989,
    itunesQuery: 'Free Fallin Tom Petty',
    keyId: 'F-major',
    bpm: 84,
    difficulty: 1,
    chords: [
      { symbol: 'F', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Subdominant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Subdominant Peak', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'C', roman: 'V', functionLabel: 'Dominant Resolution', notes: ['C3', 'E3', 'G3', 'C4'] },
    ],
    earClue:
      'The entire song is built from just 3 chords in a 2-bar rhythmic hook, using only 1 black key (B♭) and resting on F.',
    theoryExplanation: {
      whyThisTonic:
        'The iconic acoustic strum starts on F Major, swells up to B♭, and drops through C back to F.',
      whyMajorOrMinor:
        'All three chords (F, B♭, C) are the primary I, IV, and V Major triads of F Major.',
      keySignatureRule:
        'F Major has 1 flat: B♭.',
      cadenceInsight:
        'A textbook I – IV – IV – I – V loop where F Major is the unmistakable home base.',
    },
  },
  {
    id: 'dont-stop-me-now',
    title: "Don't Stop Me Now",
    artist: 'Queen',
    year: 1979,
    itunesQuery: 'Dont Stop Me Now Queen',
    keyId: 'F-major',
    bpm: 156,
    difficulty: 1,
    chords: [
      { symbol: 'F', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Am', roman: 'iii', functionLabel: 'Mediant Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Dm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'Gm', roman: 'ii', functionLabel: 'Supertonic Minor', notes: ['G3', 'Bb3', 'D4'] },
    ],
    earClue:
      'Freddie Mercury’s piano intro ("Tonight I’m gonna have myself a real good time") starts on a bright F Major chord with B♭ as the only flat in the scale.',
    theoryExplanation: {
      whyThisTonic:
        'The piano intro opens on F Major and walks down through Am and Dm before using Gm → C7 (ii → V7) to launch back into F.',
      whyMajorOrMinor:
        'The joyful, exuberant opening F – A – C triad sets F Major from beat 1.',
      keySignatureRule:
        'F Major has 1 flat (B♭) and its relative minor is D Minor (vi).',
      cadenceInsight:
        'Uses the classic jazz/pop turnaround I – iii – vi – ii – V7 (F – Am – Dm – Gm – C7).',
    },
  },
  {
    id: 'another-brick-in-the-wall',
    title: 'Another Brick in the Wall, Pt. 2',
    artist: 'Pink Floyd',
    year: 1979,
    itunesQuery: 'Another Brick in the Wall Pt 2 Pink Floyd',
    keyId: 'D-minor',
    bpm: 104,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Groove (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Funk vamp', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['D3', 'F3', 'A3'] },
    ],
    earClue:
      'The disco-rock bass and vocal melody ("We don’t need no education") stay locked on D Minor for 8 straight bars!',
    theoryExplanation: {
      whyThisTonic:
        'The vocal hook sings D – E – F – E – D – F – E – D over a relentless D Minor groove.',
      whyMajorOrMinor:
        'The D to F natural minor third interval is repeated in almost every bar of the vocal melody.',
      keySignatureRule:
        'D Minor is the relative minor of F Major and has 1 flat in its key signature: B♭ (while borrowing B natural on the G Major Dorian chord!).',
      cadenceInsight:
        'A classic D Dorian rock groove: i (Dm) → IV (G) → VI (B♭) → VII (C) → i (Dm).',
    },
  },
  {
    id: 'sultans-of-swing',
    title: 'Sultans of Swing',
    artist: 'Dire Straits',
    year: 1978,
    itunesQuery: 'Sultans of Swing Dire Straits',
    keyId: 'D-minor',
    bpm: 148,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Bb', roman: 'VI', functionLabel: 'Submediant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'A', roman: 'V', functionLabel: 'Harmonic Dominant', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'Listen to the descending bassline in the verse: it walks smoothly down D → C → B♭ → A before snapping back to D Minor.',
    theoryExplanation: {
      whyThisTonic:
        'Mark Knopfler’s Stratocaster opens on a crisp D Minor triad and returns to Dm after every Andalusian cadence (Dm – C – B♭ – A).',
      whyMajorOrMinor:
        'D – F – A is the unmistakable minor tonic, reinforced by the A7 dominant chord pulling back to D.',
      keySignatureRule:
        'D Minor has 1 flat (B♭) in its key signature, plus a raised leading tone (C♯) on the A Major (V) chord.',
      cadenceInsight:
        'Features the textbook Andalusian cadence: i – VII – VI – V (Dm – C – B♭ – A).',
    },
  },
  {
    id: 'careless-whisper',
    title: 'Careless Whisper',
    artist: 'George Michael',
    year: 1984,
    itunesQuery: 'Careless Whisper George Michael',
    keyId: 'D-minor',
    bpm: 77,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'Gm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'Bb', roman: 'VI', functionLabel: 'Submediant Major', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Am', roman: 'v', functionLabel: 'Minor Dominant', notes: ['A3', 'C4', 'E4'] },
    ],
    earClue:
      'The legendary saxophone solo and the entire song cycle through the same 4 chords using the D natural minor scale (all white keys except B♭).',
    theoryExplanation: {
      whyThisTonic:
        'The saxophone hook launches from a high A down to F and D over a D Minor root chord, and the 4-bar loop restarts on Dm every single time.',
      whyMajorOrMinor:
        'Three of the four chords in the loop (Dm, Gm, Am) are minor triads centered on D Minor.',
      keySignatureRule:
        'D Minor has 1 flat: B♭.',
      cadenceInsight:
        'Loops i – iv – VI – v (Dm – Gm – B♭ – Am) continuously from the opening sax riff to the fade-out.',
    },
  },
  {
    id: 'set-fire-to-the-rain',
    title: 'Set Fire to the Rain',
    artist: 'Adele',
    year: 2011,
    itunesQuery: 'Set Fire to the Rain Adele',
    keyId: 'D-minor',
    bpm: 108,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'F', roman: 'III', functionLabel: 'Relative Major', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Gm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['G3', 'Bb3', 'D4'] },
    ],
    earClue:
      'Test the white keys with B♭ substituted for B natural: the dramatic piano opening lands squarely on D Minor.',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse and the explosive chorus begin on D Minor and resolve via Gm – A/C → Dm.',
      whyMajorOrMinor:
        'Even though F Major appears as the second chord, the brooding opening and closing D Minor chord establishes the minor key.',
      keySignatureRule:
        'D Minor is the relative minor of F Major with 1 flat (B♭).',
      cadenceInsight:
        'Uses i – III – VII – iv (Dm – F – C – Gm) to create dramatic minor-to-relative-major contrast.',
    },
  },
  {
    id: 'uptown-funk',
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    year: 2014,
    itunesQuery: 'Uptown Funk Mark Ronson Bruno Mars',
    keyId: 'D-minor',
    bpm: 115,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Funk Groove (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Dorian Funk IV', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Groove', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Dorian Funk IV', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The bassline and brass hits revolve around D ("Doh, doh-doh-doh...") while alternating between D Minor and a funky G7 chord!',
    theoryExplanation: {
      whyThisTonic:
        'The vocal bass chant starts and rests on D, and the entire song grooves around a D Minor tonic center.',
      whyMajorOrMinor:
        'Uses the D minor pentatonic scale (D – F – G – A – C) for every horn riff and vocal melody.',
      keySignatureRule:
        'D Minor has 1 flat (B♭) in its key signature, using the D Dorian mode (B natural on the G7 chord) for classic funk brightness.',
      cadenceInsight:
        'Two-chord Dorian funk vamp: i7 – IV7 (Dm7 – G7).',
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
      { symbol: 'Gm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'Cm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['C3', 'Eb3', 'G3'] },
      { symbol: 'D7', roman: 'V7', functionLabel: 'Harmonic Minor Dominant', notes: ['D3', 'F#3', 'A3', 'C4'] },
      { symbol: 'Gm', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['G3', 'Bb3', 'D4'] },
    ],
    earClue:
      'The bassline stays locked on G for the entire first half of the verse before jumping to C (iv) and D7 (V7).',
    theoryExplanation: {
      whyThisTonic:
        'The iconic bass riff hammers G as its starting note for 4 straight bars before shifting up to C and D.',
      whyMajorOrMinor:
        'The riff outlines a G minor triad (G – B♭ – D), giving it its sneaky, dark minor groove.',
      keySignatureRule:
        'G Minor is the relative minor of B♭ Major and has 2 flats: B♭ and E♭ (with F♯ borrowed from G harmonic minor on the D7 chord).',
      cadenceInsight:
        'Follows a minor blues structure: i (Gm) → iv (Cm) → V7 (D7) → i (Gm).',
    },
  },
  {
    id: 'purple-rain',
    title: 'Purple Rain',
    artist: 'Prince',
    year: 1984,
    itunesQuery: 'Purple Rain Prince',
    keyId: 'Bb-major',
    bpm: 58,
    difficulty: 1,
    chords: [
      { symbol: 'Bb', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Gm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'F', roman: 'V', functionLabel: 'Dominant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Eb', roman: 'IV', functionLabel: 'Subdominant', notes: ['Eb3', 'G3', 'Bb3'] },
    ],
    earClue:
      'Test the black keys B♭ and E♭—both fit cleanly, and the lush opening guitar chord resolves onto B♭ Major.',
    theoryExplanation: {
      whyThisTonic:
        'The anthem begins on a spacious B♭ Major chord and every verse/chorus turnaround lands back on B♭.',
      whyMajorOrMinor:
        'Even though G Minor (vi) features prominently in the second bar, B♭ Major is the radiant starting and ending chord of every cycle.',
      keySignatureRule:
        'B♭ Major is 2 steps counter-clockwise on the Circle of Fifths with 2 flats: B♭ and E♭.',
      cadenceInsight:
        'Cycles I – vi – V – IV (B♭ – Gm – F – E♭) in a slow, gospel-rock stadium ballad.',
    },
  },

  // ============================================================================
  // LEVEL 2: Intermediate Keys (2–4 Sharps or Flats: D, Bm, A, F#m, Eb, Cm, Fm)
  // ============================================================================
  {
    id: 'with-or-without-you',
    title: 'With or Without You',
    artist: 'U2',
    year: 1987,
    itunesQuery: 'With or Without You U2',
    keyId: 'D-major',
    bpm: 110,
    difficulty: 2,
    chords: [
      { symbol: 'D', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'V', functionLabel: 'Dominant', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'Bm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Subdominant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Listen to Adam Clayton’s pulsing 8th-note bassline: it plays 8 steady notes per bar on D → A → B → G, with F♯ and C♯ as the two black keys.',
    theoryExplanation: {
      whyThisTonic:
        'The song opens with a sustained D bass pulse and loops D – A – Bm – G unchanged from beginning to end.',
      whyMajorOrMinor:
        'The F♯ major third over the D root creates a warm, expansive D Major horizon.',
      keySignatureRule:
        'D Major sits at 2 o’clock on the Circle of Fifths with 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'One of the most famous I – V – vi – IV loops in rock history (D – A – Bm – G).',
    },
  },
  {
    id: 'thinking-out-loud',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    year: 2014,
    itunesQuery: 'Thinking Out Loud Ed Sheeran',
    keyId: 'D-major',
    bpm: 79,
    difficulty: 2,
    chords: [
      { symbol: 'D', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'D/F#', roman: 'I6', functionLabel: 'First Inversion Tonic', notes: ['F#3', 'A3', 'D4'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Subdominant', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'A', roman: 'V', functionLabel: 'Dominant', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'The acoustic guitar bass note steps smoothly up the D Major scale: D → F♯ → G → A!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse loop and the final chorus cadence ("we found love right where we are" — A → D) resolve unmistakably to D Major.',
      whyMajorOrMinor:
        'Built from the bright primary triads of D Major (D, G, and A) with F♯ and C♯.',
      keySignatureRule:
        'D Major has 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'Uses a first-inversion tonic chord (D/F♯) to connect I smoothly up to IV (G) and V (A).',
    },
  },
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
      { symbol: 'Bm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'F#7', roman: 'V7', functionLabel: 'Harmonic Dominant', notes: ['F#3', 'Bb3', 'C#4', 'E4'] },
      { symbol: 'A', roman: 'VII', functionLabel: 'Subtonic', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'G', roman: 'VI', functionLabel: 'Submediant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Test F♯ and C♯ on the piano—both black keys fit the natural scale of this song, and the 12-string guitar opens on B.',
    theoryExplanation: {
      whyThisTonic:
        'The progression launches on B Minor and uses a strong F♯7 dominant chord right in bar 2 and at the end of the verse loop to pull back to B.',
      whyMajorOrMinor:
        'While the chorus momentarily brightens toG and D Major (its relative major), the verse and iconic solos anchor unmistakably on B Minor.',
      keySignatureRule:
        'B Minor is the relative minor of D Major and has 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'Uses a descending chromatic bassline starting from B (B – A♯ – A – G♯ – G – F♯).',
    },
  },
  {
    id: 'comfortably-numb',
    title: 'Comfortably Numb',
    artist: 'Pink Floyd',
    year: 1979,
    itunesQuery: 'Comfortably Numb Pink Floyd',
    keyId: 'B-minor',
    bpm: 64,
    difficulty: 2,
    chords: [
      { symbol: 'Bm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'A', roman: 'VII', functionLabel: 'Subtonic', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'G', roman: 'VI', functionLabel: 'Submediant', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Em', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['E3', 'G3', 'B3'] },
    ],
    earClue:
      'The verse ("Hello? Is there anybody in there?") steps down three chords in a row: B Minor → A Major → G Major, using 2 sharps (F♯ and C♯).',
    theoryExplanation: {
      whyThisTonic:
        'The verse and David Gilmour’s legendary closing guitar solo both cycle in B Minor, resolving every 4-bar phrase back onto Bm.',
      whyMajorOrMinor:
        'The dark, floating B Minor verse and soaring B minor pentatonic guitar solos establish B Minor as the core key (while the chorus visits its relative D Major).',
      keySignatureRule:
        'B Minor has 2 sharps (F♯ and C♯), shared with its relative major, D Major.',
      cadenceInsight:
        'A classic rock dual-tonality design: verse & main solo in B Minor (i – VII – VI – iv – i), chorus in relative D Major!',
    },
  },
  {
    id: 'levitating',
    title: 'Levitating',
    artist: 'Dua Lipa',
    year: 2020,
    itunesQuery: 'Levitating Dua Lipa',
    keyId: 'B-minor',
    bpm: 103,
    difficulty: 2,
    chords: [
      { symbol: 'Bm', roman: 'i', functionLabel: 'Tonic Disco Groove (Home)', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'F#m', roman: 'v', functionLabel: 'Minor Dominant', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'Em', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'Bm', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['B3', 'D4', 'F#4'] },
    ],
    earClue:
      'Every single chord in this entire song is one of 3 minor triads (Bm – F♯m – Em – Bm), and the 4th bar always lands back on B Minor!',
    theoryExplanation: {
      whyThisTonic:
        'The 4-bar loop both starts on B Minor (bar 1) and lands back on B Minor early on bar 4, giving B double the harmonic weight of any other chord.',
      whyMajorOrMinor:
        'All three chords in the loop (Bm, F♯m, Em) are diatonic minor triads (i, v, iv) of B natural minor.',
      keySignatureRule:
        'B Minor has 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'Loops i – v – iv – i (Bm7 – F♯m7 – Em7 – Bm7) nonstop from start to finish.',
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
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'V', functionLabel: 'Dominant', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'F#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant', notes: ['D3', 'F#3', 'A3'] },
    ],
    earClue:
      'Play A, C♯, and E together on the piano against the rolling arpeggio—you will hear the exact opening piano pattern.',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse and chorus begin on a rich A Major arpeggio (A – C♯ – E), and the vocal phrase resolves directly onto A.',
      whyMajorOrMinor:
        'The major third (C♯) in the opening piano chord establishes a warm, bittersweet Major key rather than F♯ Minor.',
      keySignatureRule:
        'A Major sits at 3 o’clock on the Circle of Fifths with 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'A textbook I – V – vi – IV progression in A Major (A – E – F♯m – D).',
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
      { symbol: 'Bm', roman: 'ii', functionLabel: 'Supertonic Launch', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'E', roman: 'V', functionLabel: 'Dominant', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant', notes: ['D3', 'F#3', 'A3'] },
    ],
    earClue:
      'Test which 3 black keys fit across the entire song: F♯, C♯, and G♯ all fit cleanly!',
    theoryExplanation: {
      whyThisTonic:
        'While the synth riff starts on Bm (the ii chord), it immediately executes a ii → V → I turnaround (Bm → E → A), and the soaring chorus begins directly on A Major.',
      whyMajorOrMinor:
        'The iconic chorus ("Take on me") beams in A Major (A – E – F♯m – D), giving the song its euphoric lift.',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'A great lesson that a song doesn’t always start its verse on the I chord—follow where the V chord (E) resolves!',
    },
  },
  {
    id: 'here-comes-the-sun',
    title: 'Here Comes the Sun',
    artist: 'The Beatles',
    year: 1969,
    itunesQuery: 'Here Comes the Sun The Beatles',
    keyId: 'A-major',
    bpm: 129,
    difficulty: 2,
    chords: [
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'E', roman: 'V', functionLabel: 'Dominant', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'George Harrison put a capo on the 7th fret so his D-shape guitar chord rings out as a bright, shimmering A Major triad (A – C♯ – E)!',
    theoryExplanation: {
      whyThisTonic:
        'Every chorus ("Here comes the sun, and I say, it’s all right") starts on A Major and resolves via D → E7 → A.',
      whyMajorOrMinor:
        'The melody traces C♯ – B – C♯ – A (starting right on the bright Major 3rd of A Major).',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Classic I – IV – V7 – I sunny folk-pop harmony in A Major.',
    },
  },
  {
    id: 'wonderwall',
    title: 'Wonderwall',
    artist: 'Oasis',
    year: 1995,
    itunesQuery: 'Wonderwall Oasis',
    keyId: 'F#-minor',
    bpm: 87,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'A', roman: 'III', functionLabel: 'Relative Major', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'VII', functionLabel: 'Subtonic', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'B', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'Noel Gallagher played Em – G – D – A shapes with a capo on the 2nd fret, shifting the real concert pitch up 2 semitones to F♯ Minor!',
    theoryExplanation: {
      whyThisTonic:
        'The famous acoustic strum opens on F♯m7 and returns to F♯m throughout the verse and chorus.',
      whyMajorOrMinor:
        'The dark F♯ bass root with a sustained C♯ and F♯ high pedal gives the song its bittersweet F♯ Minor/Dorian center.',
      keySignatureRule:
        'F♯ Minor is the relative minor of A Major with 3 sharps: F♯, C♯, and G♯ (borrowing D♯ on the B7sus4/B chord).',
      cadenceInsight:
        'Uses a Dorian i – III – VII – IV loop (F♯m – A – E – B) in the verse and VI – VII – i (D – E – F♯m) in the chorus.',
    },
  },
  {
    id: 'billie-jean',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    year: 1982,
    itunesQuery: 'Billie Jean Michael Jackson',
    keyId: 'F#-minor',
    bpm: 117,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic Bass Groove (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'G#m', roman: 'ii', functionLabel: 'Dorian Supertonic Passing', notes: ['Ab3', 'B3', 'Eb4'] },
      { symbol: 'Bm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'C#', roman: 'V', functionLabel: 'Harmonic Dominant', notes: ['C#3', 'F3', 'Ab3'] },
    ],
    earClue:
      'The iconic synth-bass line walks F♯ – C♯ – E – F♯ – E – C♯ – B – C♯ for 20 straight bars before the chords even change!',
    theoryExplanation: {
      whyThisTonic:
        'The bassline and synth chords sit on an F♯ Minor pedal for the entire intro and first half of the verse, then resolve via Bm → F♯m and a C♯7 (V7) dominant chord.',
      whyMajorOrMinor:
        'F♯ – A – C♯ is the unmistakable minor home chord that opens and anchors the groove.',
      keySignatureRule:
        'F♯ Minor has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Follows a minor i – iv – i – iv – i – VI – V (F♯m – Bm – F♯m – D – C♯) structure.',
    },
  },
  {
    id: 'numb',
    title: 'Numb',
    artist: 'Linkin Park',
    year: 2003,
    itunesQuery: 'Numb Linkin Park',
    keyId: 'F#-minor',
    bpm: 110,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'VI', functionLabel: 'Submediant Major', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'III', functionLabel: 'Relative Major', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'VII', functionLabel: 'Subtonic', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'The synth intro melody plays C♯ – E – C♯ – F♯ – A – G♯ over a heavy 4-chord rock loop starting on F♯ Minor.',
    theoryExplanation: {
      whyThisTonic:
        'Both the synth intro and the chorus ("I’ve become so numb") slam down on F♯ Minor on beat 1 of the 4-bar loop.',
      whyMajorOrMinor:
        'Despite sharing A Major’s 3 sharps, the heavy F♯ Minor opening chord defines the dark emotional center.',
      keySignatureRule:
        'F♯ Minor is the relative minor of A Major and has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Uses the i – VI – III – VII minor anthem loop (F♯m – D – A – E).',
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
      { symbol: 'Fm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'Cm', roman: 'v', functionLabel: 'Minor Dominant', notes: ['C3', 'Eb3', 'G3'] },
      { symbol: 'Eb', roman: 'VII', functionLabel: 'Subtonic', notes: ['Eb3', 'G3', 'Bb3'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Dorian Subdominant', notes: ['Bb3', 'D4', 'F4'] },
    ],
    earClue:
      'Listen to the famous synth lead hook: it starts and holds on one main note (F), then climbs up through G, A♭, B♭, and C.',
    theoryExplanation: {
      whyThisTonic:
        'The synth riff begins on F and returns to F Minor at the top of every 4-bar cycle, giving the track its unmistakable home pitch.',
      whyMajorOrMinor:
        'The minor third interval (F to A♭) is the heart of the synth hook, confirming F Minor over its relative A♭ Major.',
      keySignatureRule:
        'F Minor is the relative minor of A♭ Major and has 4 flats: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Uses Fm – Cm – E♭ – B♭, borrowing a bright D natural on the B♭ chord (F Dorian color).',
    },
  },
  {
    id: 'smells-like-teen-spirit',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    year: 1991,
    itunesQuery: 'Smells Like Teen Spirit Nirvana',
    keyId: 'F-minor',
    bpm: 117,
    difficulty: 2,
    chords: [
      { symbol: 'Fm', roman: 'i', functionLabel: 'Tonic Power Riff (Home)', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'Bbm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Ab', roman: 'III', functionLabel: 'Relative Major', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Db', roman: 'VI', functionLabel: 'Submediant Major', notes: ['C#3', 'F3', 'Ab3'] },
    ],
    earClue:
      'Listen to the 2-note clean guitar floating in the verse: it plays C and F every single bar while the bass outlines F → B♭ → A♭ → D♭!',
    theoryExplanation: {
      whyThisTonic:
        'Kurt Cobain’s legendary 4-chord riff launches on F5/Fm and the verse guitar chimes F and C continuously as a tonic pedal.',
      whyMajorOrMinor:
        'All 4 root notes (F, B♭, A♭, D♭) come directly from the F natural minor scale (4 flats: B♭, E♭, A♭, D♭).',
      keySignatureRule:
        'F Minor is the relative minor of A♭ Major and has 4 flats: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Loops two pairs of fourths in F Minor: i → iv (Fm → B♭m) followed by III → VI (A♭ → D♭).',
    },
  },
  {
    id: 'boulevard-of-broken-dreams',
    title: 'Boulevard of Broken Dreams',
    artist: 'Green Day',
    year: 2004,
    itunesQuery: 'Boulevard of Broken Dreams Green Day',
    keyId: 'F-minor',
    bpm: 83,
    difficulty: 2,
    chords: [
      { symbol: 'Fm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'Ab', roman: 'III', functionLabel: 'Relative Major', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Eb', roman: 'VII', functionLabel: 'Subtonic', notes: ['Eb3', 'G3', 'Bb3'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['Bb3', 'D4', 'F4'] },
    ],
    earClue:
      'The tremolo guitar intro opens on dark F Minor ("I walk a lonely road") and steps through A♭, E♭, and B♭.',
    theoryExplanation: {
      whyThisTonic:
        'Every verse phrase begins on F Minor, and the chorus ends on a dramatic C7 → Fm (V7 → i) harmonic minor cadence ("I walk alone").',
      whyMajorOrMinor:
        'The brooding F Minor verse and C Major dominant turnaround at the end of the chorus cement F Minor.',
      keySignatureRule:
        'F Minor has 4 flats: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Verse uses F Dorian (Fm – A♭ – E♭ – B♭); chorus uses VI – III – VII – V (D♭ – A♭ – E♭ – C) resolving to Fm!',
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
      { symbol: 'Cm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['C3', 'Eb3', 'G3', 'C4'] },
      { symbol: 'Gm', roman: 'v', functionLabel: 'Minor Dominant', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'Bb', roman: 'VII', functionLabel: 'Subtonic', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Ab', roman: 'VI', functionLabel: 'Submediant', notes: ['Ab3', 'C4', 'Eb4'] },
    ],
    earClue:
      'Play C on the piano during the rhythmic acoustic guitar chug in the verse—then test E natural versus E♭ to hear the minor mode.',
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
    id: 'eye-of-the-tiger',
    title: 'Eye of the Tiger',
    artist: 'Survivor',
    year: 1982,
    itunesQuery: 'Eye of the Tiger Survivor',
    keyId: 'C-minor',
    bpm: 109,
    difficulty: 2,
    chords: [
      { symbol: 'Cm', roman: 'i', functionLabel: 'Tonic Pulse (Home)', notes: ['C3', 'Eb3', 'G3', 'C4'] },
      { symbol: 'Ab', roman: 'VI', functionLabel: 'Submediant', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Bb', roman: 'VII', functionLabel: 'Subtonic', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Cm', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['C3', 'Eb3', 'G3', 'C4'] },
    ],
    earClue:
      'That famous muted guitar pulse at the very beginning hammers one single note: C! Then the big power chords punch C → B♭ → C → G → A♭.',
    theoryExplanation: {
      whyThisTonic:
        'The intro guitar pulses on C for 4 bars before the power chords punch Cm – B♭ – Cm – Gm – A♭.',
      whyMajorOrMinor:
        'All the chords (Cm, Gm, A♭, B♭, Fm) belong to the 3-flat C natural minor family.',
      keySignatureRule:
        'C Minor has 3 flats: B♭, E♭, and A♭.',
      cadenceInsight:
        'Uses i – VI – VII – i (Cm – A♭ – B♭ – Cm) in the verse and iv – III – VI (Fm – E♭ – A♭) in the chorus.',
    },
  },
  {
    id: 'skyfall',
    title: 'Skyfall',
    artist: 'Adele',
    year: 2012,
    itunesQuery: 'Skyfall Adele',
    keyId: 'C-minor',
    bpm: 76,
    difficulty: 2,
    chords: [
      { symbol: 'Cm', roman: 'i', functionLabel: 'Tonic Bond Theme (Home)', notes: ['C3', 'Eb3', 'G3', 'C4'] },
      { symbol: 'Ab', roman: 'VI', functionLabel: 'Submediant Major', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Fm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'G7', roman: 'V7', functionLabel: 'Harmonic Minor Dominant', notes: ['G3', 'B3', 'D4', 'F4'] },
    ],
    earClue:
      'Listen for the classic James Bond cinematic tension: a dark C Minor chord stepping down to A♭ and F Minor before G7 pulls back to C!',
    theoryExplanation: {
      whyThisTonic:
        'The piano and orchestra open on a suspenseful C Minor pedal, and every chorus ("Let the sky fall") begins on Cm and ends with G7 → Cm.',
      whyMajorOrMinor:
        'Combines C natural minor (B♭, E♭, A♭) with the raised leading tone B natural on the G7 (V7) chord.',
      keySignatureRule:
        'C Minor has 3 flats: B♭, E♭, and A♭.',
      cadenceInsight:
        'A textbook classical minor progression: i – VI – iv – V7 (Cm – A♭ – Fm – G7).',
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
      { symbol: 'Eb', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Eb3', 'G3', 'Bb3', 'Eb4'] },
      { symbol: 'Bbm', roman: 'v', functionLabel: 'Mixolydian Minor Fifth', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Bbm', roman: 'v', functionLabel: 'Minor Fifth (sustained)', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Fm', roman: 'ii', functionLabel: 'Supertonic Minor', notes: ['F3', 'Ab3', 'C4'] },
    ],
    earClue:
      'The hypnotic piano arpeggio starts on a black key (E♭) and cascades down through B♭ and G.',
    theoryExplanation: {
      whyThisTonic:
        'The signature piano riff outlines an E♭ Major triad (E♭ – B♭ – G) at the top of every 4-bar loop, anchoring E♭ as the bright home chord.',
      whyMajorOrMinor:
        'Even though the progression borrows a moody minor fifth chord (from E♭ Mixolydian), the opening chord and vocal center are E♭ Major.',
      keySignatureRule:
        'E♭ Major has 3 flats in its standard key signature: B♭, E♭, and A♭.',
      cadenceInsight:
        'Uses a modal Mixolydian loop (I – v – ii) that gives the riff its floating, perpetual-motion feel.',
    },
  },
  {
    id: 'fix-you',
    title: 'Fix You',
    artist: 'Coldplay',
    year: 2005,
    itunesQuery: 'Fix You Coldplay',
    keyId: 'Eb-major',
    bpm: 69,
    difficulty: 2,
    chords: [
      { symbol: 'Eb', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Eb3', 'G3', 'Bb3', 'Eb4'] },
      { symbol: 'Cm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['C3', 'Eb3', 'G3'] },
      { symbol: 'Ab', roman: 'IV', functionLabel: 'Subdominant', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Bb', roman: 'V', functionLabel: 'Dominant', notes: ['Bb3', 'D4', 'F4'] },
    ],
    earClue:
      'The warm church-organ intro begins on a glowing E♭ Major triad (E♭ – G – B♭) and uses the 3 flats B♭, E♭, and A♭.',
    theoryExplanation: {
      whyThisTonic:
        'Every verse opens on E♭ Major and every chorus ("Lights will guide you home... and I will try to fix you") resolves from A♭ → B♭ → E♭ (IV → V → I).',
      whyMajorOrMinor:
        'Pure E♭ Major diatonic harmony from the first organ chord to the final resolving triad.',
      keySignatureRule:
        'E♭ Major has 3 flats: B♭, E♭, and A♭.',
      cadenceInsight:
        'Uses I – iii/vi – IV – V in the verse and a sweeping IV – I – V – vi – IV – V – I chorus.',
    },
  },

  // ============================================================================
  // LEVEL 3: Advanced Keys (4–6 Sharps or Flats: E, C#m, B, G#m, F#, Ebm, Db, Bbm, Ab)
  // ============================================================================
  {
    id: 'dont-stop-believin',
    title: "Don't Stop Believin'",
    artist: 'Journey',
    year: 1981,
    itunesQuery: 'Dont Stop Believin Journey',
    keyId: 'E-major',
    bpm: 119,
    difficulty: 3,
    chords: [
      { symbol: 'E', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['E3', 'Ab3', 'B3', 'E4'] },
      { symbol: 'B', roman: 'V', functionLabel: 'Dominant', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'C#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['C#3', 'E3', 'Ab3'] },
      { symbol: 'A', roman: 'IV', functionLabel: 'Subdominant', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'Jonathan Cain’s legendary left-hand piano bassline walks up the E Major scale (E – F♯ – G♯ – B → C♯ → A) using 4 sharps!',
    theoryExplanation: {
      whyThisTonic:
        'The iconic piano intro launches on a resonant E Major chord and repeats the E Major loop throughout the song.',
      whyMajorOrMinor:
        'The G♯ (Major 3rd above E) in the bass walk and right-hand triad shines brightly as E Major.',
      keySignatureRule:
        'E Major sits at 4 o’clock on the Circle of Fifths with 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'The quintessential I – V – vi – IV anthem in E Major (E – B – C♯m – A).',
    },
  },
  {
    id: 'under-the-bridge',
    title: 'Under the Bridge',
    artist: 'Red Hot Chili Peppers',
    year: 1991,
    itunesQuery: 'Under the Bridge Red Hot Chili Peppers',
    keyId: 'E-major',
    bpm: 84,
    difficulty: 3,
    chords: [
      { symbol: 'E', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['E3', 'Ab3', 'B3', 'E4'] },
      { symbol: 'B', roman: 'V', functionLabel: 'Dominant', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'C#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['C#3', 'E3', 'Ab3'] },
      { symbol: 'A', roman: 'IV', functionLabel: 'Subdominant', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'Once the verse vocals begin ("Sometimes I feel like I don’t have a partner"), the guitar plays a classic 4-sharp E Major progression.',
    theoryExplanation: {
      whyThisTonic:
        'After the D → F♯ intro, the verse locks immediately into E Major (E – B – C♯m – G♯m – A) with E as the home triad.',
      whyMajorOrMinor:
        'All verse chords (E, B, C♯m, G♯m, A) come directly from the 4-sharp E Major scale.',
      keySignatureRule:
        'E Major has 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Blends I – V – vi – iii – IV (Pachelbel’s Canon variant) in E Major.',
    },
  },
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
      { symbol: 'C#m', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['C#3', 'E3', 'Ab3', 'C#4'] },
      { symbol: 'F#m', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'A', roman: 'VI', functionLabel: 'Submediant', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'B', roman: 'VII', functionLabel: 'Subtonic', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'The marimba riff uses only 5 notes (a minor pentatonic scale starting on C♯). Find that starting black key between C and D!',
    theoryExplanation: {
      whyThisTonic:
        'The marimba hook starts on C♯, leaps to E and F♯, and resolves back to C♯ at the end of every 2-bar loop.',
      whyMajorOrMinor:
        'The minor third interval (C♯ to E natural) gives the marimba riff its unmistakable minor bounce.',
      keySignatureRule:
        'C♯ Minor is the relative minor of E Major and has 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Loops i – iv – VI – VII (C♯m – F♯m – A – B) continuously from start to finish.',
    },
  },
  {
    id: 'counting-stars',
    title: 'Counting Stars',
    artist: 'OneRepublic',
    year: 2013,
    itunesQuery: 'Counting Stars OneRepublic',
    keyId: 'C#-minor',
    bpm: 122,
    difficulty: 3,
    chords: [
      { symbol: 'C#m', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['C#3', 'E3', 'Ab3', 'C#4'] },
      { symbol: 'E', roman: 'III', functionLabel: 'Relative Major', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'B', roman: 'VII', functionLabel: 'Subtonic', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'A', roman: 'VI', functionLabel: 'Submediant', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'Both the quiet folk opening ("Lately, I’ve been, I’ve been losing sleep") and the stomping chorus start on C♯ Minor with 4 sharps.',
    theoryExplanation: {
      whyThisTonic:
        'Every 4-bar cycle begins on C♯ Minor and steps through E, B, and A before returning to C♯m.',
      whyMajorOrMinor:
        'C♯ – E – G♯ is the anchoring tonic chord on bar 1 of every verse and chorus.',
      keySignatureRule:
        'C♯ Minor is the relative minor of E Major with 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Cycles i – III – VII – VI (C♯m – E – B – A) throughout the entire track.',
    },
  },
  {
    id: 'yellow',
    title: 'Yellow',
    artist: 'Coldplay',
    year: 2000,
    itunesQuery: 'Yellow Coldplay',
    keyId: 'B-major',
    bpm: 87,
    difficulty: 3,
    chords: [
      { symbol: 'B', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'F#', roman: 'V', functionLabel: 'Dominant', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'E', roman: 'IV', functionLabel: 'Subdominant', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'B', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'All 5 black keys on the piano (F♯, C♯, G♯, D♯, A♯) fit this shimmering guitar anthem, while the white keys B and E anchor the root and fourth!',
    theoryExplanation: {
      whyThisTonic:
        'The song opens with a ringing B Major guitar chord and every verse loops B → F♯ → E → B (I – V – IV – I).',
      whyMajorOrMinor:
        'Built from the three bright Major pillars of B Major: B (I), E (IV), and F♯ (V).',
      keySignatureRule:
        'B Major has 5 sharps: F♯, C♯, G♯, D♯, and A♯ (using all 5 black keys plus only B and E on the white keys!).',
      cadenceInsight:
        'Verse uses I – V – IV – I (B – F♯ – E – B); chorus shifts to IV – vi – V (E – G♯m – F♯).',
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
      { symbol: 'Db', roman: 'IV', functionLabel: 'Subdominant Launch', notes: ['C#3', 'F3', 'Ab3', 'C#4'] },
      { symbol: 'Eb', roman: 'V', functionLabel: 'Dominant', notes: ['Eb3', 'G3', 'Bb3', 'Eb4'] },
      { symbol: 'Ab', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Fm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F3', 'Ab3', 'C4'] },
    ],
    earClue:
      'Try the 4 black keys B♭, E♭, A♭, and D♭—all 4 belong to this orchestral string loop!',
    theoryExplanation: {
      whyThisTonic:
        'The string loop starts on the subdominant (IV) chord and climbs through the dominant (V) to resolve onto A♭ Major (I) on beat 1 of bar 2.',
      whyMajorOrMinor:
        'The IV → V → I ascent into A♭ Major gives the strings their regal, triumphant Major lift.',
      keySignatureRule:
        'A♭ Major has 4 flats in its key signature: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Starting a loop on the IV chord (IV – V – I – vi) is a favorite modern pop technique to create forward momentum.',
    },
  },
  {
    id: 'every-breath-you-take',
    title: 'Every Breath You Take',
    artist: 'The Police',
    year: 1983,
    itunesQuery: 'Every Breath You Take The Police',
    keyId: 'Ab-major',
    bpm: 117,
    difficulty: 3,
    chords: [
      { symbol: 'Ab', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Fm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'Db', roman: 'IV', functionLabel: 'Subdominant', notes: ['C#3', 'F3', 'Ab3'] },
      { symbol: 'Eb', roman: 'V', functionLabel: 'Dominant', notes: ['Eb3', 'G3', 'Bb3'] },
    ],
    earClue:
      'Andy Summers’ famous 9th-chord guitar arpeggio starts on the black key A♭ and walks through Fm, D♭, and E♭ using 4 flats.',
    theoryExplanation: {
      whyThisTonic:
        'The verse opens on A♭add9 and closes each 8-bar section with a D♭ → E♭ → A♭ (IV → V → I) authentic cadence.',
      whyMajorOrMinor:
        'A♭ – C – E♭ is the unmistakable Major tonic that begins and ends every verse.',
      keySignatureRule:
        'A♭ Major has 4 flats: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'The classic 1950s doo-wop progression I – vi – IV – V (A♭ – Fm – D♭ – E♭) in A♭ Major.',
    },
  },
  {
    id: 'all-of-me',
    title: 'All of Me',
    artist: 'John Legend',
    year: 2013,
    itunesQuery: 'All of Me John Legend',
    keyId: 'Ab-major',
    bpm: 63,
    difficulty: 3,
    chords: [
      { symbol: 'Fm', roman: 'vi', functionLabel: 'Relative Minor Verse Launch', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'Db', roman: 'IV', functionLabel: 'Subdominant', notes: ['C#3', 'F3', 'Ab3'] },
      { symbol: 'Ab', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Eb', roman: 'V', functionLabel: 'Dominant', notes: ['Eb3', 'G3', 'Bb3'] },
    ],
    earClue:
      'While the verse piano begins on F Minor ("What would I do without your smart mouth"), the chorus ("’Cause all of me loves all of you") beams in A♭ Major!',
    theoryExplanation: {
      whyThisTonic:
        'The verse uses the relative minor start (vi – IV – I – V: Fm – D♭ – A♭ – E♭), and the chorus flips directly to the A♭ Major tonic (A♭ – Fm – D♭ – E♭).',
      whyMajorOrMinor:
        'The emotional payoff in the chorus centers on A♭ Major (I) with a clear D♭ → E♭ → A♭ resolution.',
      keySignatureRule:
        'A♭ Major and its relative F Minor share 4 flats: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'Shows how modern pop songs often start the verse on the relative minor (vi = Fm) and open up to the relative Major (I = A♭) for the chorus!',
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
      { symbol: 'Ebm7', roman: 'i7', functionLabel: 'Tonic Funk Riff (Home)', notes: ['Eb3', 'F#3', 'Bb3', 'C#4'] },
      { symbol: 'Ebm7', roman: 'i7', functionLabel: 'Tonic Groove', notes: ['Eb3', 'F#3', 'Bb3', 'C#4'] },
      { symbol: 'Bb7', roman: 'V7', functionLabel: 'Dominant Turnaround', notes: ['Bb3', 'D4', 'F4', 'Ab4'] },
      { symbol: 'Ab7', roman: 'IV7', functionLabel: 'Dorian Funk Subdominant', notes: ['Ab3', 'C4', 'Eb4', 'F#4'] },
    ],
    earClue:
      'Almost every note of this famous clavinet riff sits on the black keys! Find the black key between D and E (E♭) that anchors the groove.',
    theoryExplanation: {
      whyThisTonic:
        'Stevie Wonder wrote the clavinet riff on the black keys centered around E♭, using the E♭ minor pentatonic scale (E♭, G♭, A♭, B♭, D♭).',
      whyMajorOrMinor:
        'The minor third (E♭ to G♭/F♯) and flat seventh (D♭) establish a deep E♭ Minor funk groove.',
      keySignatureRule:
        'E♭ Minor (enharmonic with D♯ Minor) sits at the bottom of the Circle of Fifths with 6 flats: B♭, E♭, A♭, D♭, G♭, and C♭.',
      cadenceInsight:
        'The horn turnaround walks chromatically into B♭7 (V7) before slamming back into E♭m.',
    },
  },
  {
    id: 'in-the-end',
    title: 'In the End',
    artist: 'Linkin Park',
    year: 2000,
    itunesQuery: 'In the End Linkin Park',
    keyId: 'Eb-minor',
    bpm: 105,
    difficulty: 3,
    chords: [
      { symbol: 'Ebm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['Eb3', 'F#3', 'Bb3'] },
      { symbol: 'Db', roman: 'VII', functionLabel: 'Subtonic', notes: ['C#3', 'F3', 'Ab3'] },
      { symbol: 'Cb', roman: 'VI', functionLabel: 'Submediant (B Major)', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'Db', roman: 'VII', functionLabel: 'Subtonic Turnaround', notes: ['C#3', 'F3', 'Ab3'] },
    ],
    earClue:
      'That iconic piano motif plays E♭ – B♭ – B♭ – G♭ – F – F – F – G♭ – E♭. Play those black keys plus F natural on the keyboard!',
    theoryExplanation: {
      whyThisTonic:
        'The piano hook starts on E♭, leaps up a fifth to B♭, and resolves back to E♭ at the end of the phrase.',
      whyMajorOrMinor:
        'E♭ – G♭ – B♭ outlines a dark E♭ Minor triad throughout both the verse and chorus.',
      keySignatureRule:
        'E♭ Minor has 6 flats: B♭, E♭, A♭, D♭, G♭, and C♭ (note that C♭ is the white key B!).',
      cadenceInsight:
        'Loops i – VII – VI – VII (E♭m – D♭ – C♭/B – D♭) continuously.',
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
      { symbol: 'Db', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C#3', 'F3', 'Ab3', 'C#4'] },
      { symbol: 'Db/C', roman: 'I/vii', functionLabel: 'Major 7th Bass Walk', notes: ['C3', 'F3', 'Ab3', 'C#4'] },
      { symbol: 'Gb', roman: 'IV', functionLabel: 'Subdominant', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'Ab', roman: 'V', functionLabel: 'Dominant', notes: ['Ab3', 'C4', 'Eb4'] },
    ],
    earClue:
      'Why do all the white keys except F and C clash? Because the guitars are tuned down a half-step from D Major into D♭ Major (5 flats)!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse arpeggio and the chorus ("I’m Mr. Brightside") resolve squarely onto D♭ Major.',
      whyMajorOrMinor:
        'All primary chords in the verse and chorus revolve around the bright D♭ Major tonic triad (D♭ – F – A♭).',
      keySignatureRule:
        'D♭ Major has 5 flats: B♭, E♭, A♭, D♭, and G♭ (meaning all 5 black keys on the piano are in the scale!).',
      cadenceInsight:
        'Many rock bands tune their guitars down 1 semitone (E♭ standard), turning a D Major finger shape into concert D♭ Major.',
    },
  },
  {
    id: 'sweet-child-o-mine',
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    year: 1987,
    itunesQuery: 'Sweet Child O Mine Guns N Roses',
    keyId: 'Db-major',
    bpm: 125,
    difficulty: 3,
    chords: [
      { symbol: 'Db', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C#3', 'F3', 'Ab3', 'C#4'] },
      { symbol: 'Cb', roman: 'bVII', functionLabel: 'Mixolydian Flat-VII (B)', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'Gb', roman: 'IV', functionLabel: 'Subdominant', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'Db', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['C#3', 'F3', 'Ab3', 'C#4'] },
    ],
    earClue:
      'Slash’s famous guitar riff starts on the black key D♭ (tuned a half-step down from D) and jumps up an octave to D♭4!',
    theoryExplanation: {
      whyThisTonic:
        'The opening riff starts on D♭, and every verse cycle (D♭ – C♭/B – G♭ – D♭) lands back on D♭ Major for two full bars.',
      whyMajorOrMinor:
        'D♭ – F – A♭ is the bright Major tonic triad anchoring the intro and verses.',
      keySignatureRule:
        'D♭ Major has 5 flats: B♭, E♭, A♭, D♭, and G♭ (and borrows C♭/B as a classic Mixolydian bVII rock chord).',
      cadenceInsight:
        'Uses the classic Mixolydian rock loop I – bVII – IV – I (D♭ – C♭ – G♭ – D♭), just like "Sweet Home Alabama" transposed!',
    },
  },
  {
    id: 'chandelier',
    title: 'Chandelier',
    artist: 'Sia',
    year: 2014,
    itunesQuery: 'Chandelier Sia',
    keyId: 'Bb-minor',
    bpm: 117,
    difficulty: 3,
    chords: [
      { symbol: 'Bbm', roman: 'i', functionLabel: 'Tonic Verse (Home)', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Gb', roman: 'VI', functionLabel: 'Submediant Major', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'Ab', roman: 'VII', functionLabel: 'Subtonic', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Fm', roman: 'v', functionLabel: 'Minor Dominant', notes: ['F3', 'Ab3', 'C4'] },
    ],
    earClue:
      'All 5 black keys on the piano belong to this song’s scale, and the verse opens on a dark B♭ Minor chord ("Party girls don’t get hurt").',
    theoryExplanation: {
      whyThisTonic:
        'The verse opens and anchors on B♭ Minor (B♭m – G♭ – A♭ – Fm), while the soaring chorus visits its submediant G♭ and relative D♭ Major.',
      whyMajorOrMinor:
        'The dark B♭ – D♭ – F minor triad establishes B♭ Minor as the emotional core of the song.',
      keySignatureRule:
        'B♭ Minor is the relative minor of D♭ Major and has 5 flats: B♭, E♭, A♭, D♭, and G♭.',
      cadenceInsight:
        'Verse cycles i – VI – VII – v (B♭m – G♭ – A♭ – Fm) in 5-flat B♭ natural minor.',
    },
  },
  {
    id: 'crazy-in-love',
    title: 'Crazy In Love',
    artist: 'Beyoncé ft. JAY-Z',
    year: 2003,
    itunesQuery: 'Crazy In Love Beyonce',
    keyId: 'D-minor',
    bpm: 99,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Horn Riff (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Bb', roman: 'VI', functionLabel: 'Submediant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'A', roman: 'V', functionLabel: 'Dominant Turnaround', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'That unstoppable Chi-Lites brass sample climbs up from A through B♭ and C to hammer heavily on D Minor!',
    theoryExplanation: {
      whyThisTonic:
        'The horn fanfare lands squarely on D Minor on beat 1 and holds a D Minor groove throughout the verse and chorus.',
      whyMajorOrMinor:
        'The horn melody emphasizes D – F – G – A (D minor pentatonic / natural minor).',
      keySignatureRule:
        'D Minor has 1 flat: B♭.',
      cadenceInsight:
        'Uses a descending minor bass walk (D – C – B♭ – A) under the brass hook.',
    },
  },
  {
    id: 'creep',
    title: 'Creep',
    artist: 'Radiohead',
    year: 1992,
    itunesQuery: 'Creep Radiohead',
    keyId: 'G-major',
    bpm: 92,
    difficulty: 2,
    chords: [
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'B', roman: 'III', functionLabel: 'Secondary Dominant (V/vi)', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Cm', roman: 'iv', functionLabel: 'Borrowed Minor Subdominant', notes: ['C3', 'Eb3', 'G3'] },
    ],
    earClue:
      'The first chord is a pure, sunny G Major triad—followed by two famous "borrowed" chromatic twists (B Major and C Minor) before returning home to G!',
    theoryExplanation: {
      whyThisTonic:
        'Every 8-bar loop begins on G Major for 2 full bars and resolves from C Minor (iv) straight back to G Major (I).',
      whyMajorOrMinor:
        'G Major is the home chord, enriched by chromatic voice-leading (D → D♯ → E → E♭ → D).',
      keySignatureRule:
        'G Major has 1 sharp (F♯), while borrowing D♯ on the B Major chord and E♭ on the C Minor chord!',
      cadenceInsight:
        'Features the famous chromatic line cliché I – III – IV – iv (G – B – C – Cm) resolving back to G.',
    },
  },
  {
    id: 'shallow',
    title: 'Shallow',
    artist: 'Lady Gaga & Bradley Cooper',
    year: 2018,
    itunesQuery: 'Shallow Lady Gaga Bradley Cooper',
    keyId: 'G-major',
    bpm: 96,
    difficulty: 1,
    chords: [
      { symbol: 'Em7', roman: 'vi7', functionLabel: 'Relative Minor Launch', notes: ['E3', 'G3', 'B3', 'D4'] },
      { symbol: 'D/F#', roman: 'V6', functionLabel: 'First-Inversion Dominant', notes: ['F#3', 'A3', 'D4'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
    ],
    earClue:
      'The acoustic guitar walks up the bass notes E → F♯ → G ("Tell me somethin’, girl") to settle on G Major!',
    theoryExplanation: {
      whyThisTonic:
        'The opening walk-up Em7 → D/F♯ → G lands on G Major in bar 2, and every verse phrase resolves to G.',
      whyMajorOrMinor:
        'Shares the 1-sharp signature (F♯) between G Major in the verse and relative E Minor in the dramatic chorus ("I’m off the deep end").',
      keySignatureRule:
        'G Major and E Minor share 1 sharp: F♯.',
      cadenceInsight:
        'A brilliant example of relative Major/Minor interplay: verse resolves to G Major (I), chorus resolves to E Minor (vi)!',
    },
  },
  {
    id: 'dreams',
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    year: 1977,
    itunesQuery: 'Dreams Fleetwood Mac',
    keyId: 'F-major',
    bpm: 120,
    difficulty: 1,
    chords: [
      { symbol: 'F', roman: 'I', functionLabel: 'Lydian Home Chord', notes: ['F3', 'A3', 'C4', 'E4'] },
      { symbol: 'G', roman: 'II', functionLabel: 'Lydian Second', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'F', roman: 'I', functionLabel: 'Lydian Home Chord', notes: ['F3', 'A3', 'C4', 'E4'] },
      { symbol: 'G', roman: 'II', functionLabel: 'Lydian Second', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Almost the entire song sways back and forth between just TWO adjacent white-key Major chords: F Major and G Major!',
    theoryExplanation: {
      whyThisTonic:
        'John McVie’s hypnotic bassline pulses F – F – G – G from start to finish, and the song ends on a floating Fmaj7 chord.',
      whyMajorOrMinor:
        'Uses the 7 white keys (no sharps or flats), centering on F (giving it an airy F Lydian / A Minor tonal floating feel).',
      keySignatureRule:
        'F Major standard signature has 1 flat (B♭), while F Lydian raises B♭ to B natural so every white key fits.',
      cadenceInsight:
        'Two-chord Fmaj7 ↔ G6 pendulum that never lands on C Major or A Minor (except briefly in the guitar solo!).',
    },
  },
  {
    id: 'stand-by-me',
    title: 'Stand By Me',
    artist: 'Ben E. King',
    year: 1961,
    itunesQuery: 'Stand By Me Ben E King',
    keyId: 'A-major',
    bpm: 118,
    difficulty: 2,
    chords: [
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'F#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'E', roman: 'V', functionLabel: 'Dominant', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'Listen to the upright bass intro: it starts on A for two full bars, walks down G♯ → F♯, then E → D → E → A using 3 sharps!',
    theoryExplanation: {
      whyThisTonic:
        'The famous upright bass riff begins and ends every 8-bar cycle on A Major.',
      whyMajorOrMinor:
        'A – C♯ – E is the warm, reassuring Major home chord for two bars at the start and two bars at the end of every loop.',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'The definitive 1950s/60s soul progression: I – vi – IV – V – I (A – F♯m – D – E – A).',
    },
  },
  {
    id: 'i-want-it-that-way',
    title: 'I Want It That Way',
    artist: 'Backstreet Boys',
    year: 1999,
    itunesQuery: 'I Want It That Way Backstreet Boys',
    keyId: 'F#-minor',
    bpm: 99,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic Verse (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'VI', functionLabel: 'Submediant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'III', functionLabel: 'Relative Major', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'VII', functionLabel: 'Subtonic', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'The acoustic guitar arpeggio in the intro alternates between F♯ Minor and D → A, using the 3 sharps F♯, C♯, and G♯.',
    theoryExplanation: {
      whyThisTonic:
        'The intro and verse center on F♯ Minor ("You are my fire"), while the chorus ("Tell me why") pivots between relative A Major and F♯ Minor.',
      whyMajorOrMinor:
        'F♯ Minor and A Major share the exact same 3-sharp scale (F♯, C♯, G♯), with F♯m opening every verse and ending the chorus hook ("I want it that way").',
      keySignatureRule:
        'F♯ Minor is the relative minor of A Major with 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Chorus uses IV – V – vi (D – E – F♯m) deceptive resolution so "I want it that way" lands poignantly on F♯ Minor!',
    },
  },
  {
    id: 'africa',
    title: 'Africa',
    artist: 'Toto',
    year: 1982,
    itunesQuery: 'Africa Toto',
    keyId: 'F#-minor',
    bpm: 93,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic Chorus (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'VI', functionLabel: 'Submediant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'III', functionLabel: 'Relative Major', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'VII', functionLabel: 'Subtonic', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'The famous synth-brass riff ends on F♯m, and the iconic chorus ("It’s gonna take a lot to drag me away from you") launches on F♯ Minor!',
    theoryExplanation: {
      whyThisTonic:
        'While the verse floats in B Major (with a G♯m → F♯m turnaround), the world-famous chorus locks into F♯m – D – A – E.',
      whyMajorOrMinor:
        'The chorus melody and harmonic loop begin every 2-bar cycle on F♯ Minor (with 3 sharps: F♯, C♯, G♯).',
      keySignatureRule:
        'F♯ Minor has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'The chorus uses the Axis minor progression i – VI – III – VII (F♯m – D – A – E).',
    },
  },
  {
    id: 'crazy-train',
    title: 'Crazy Train',
    artist: 'Ozzy Osbourne',
    year: 1980,
    itunesQuery: 'Crazy Train Ozzy Osbourne',
    keyId: 'F#-minor',
    bpm: 138,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic Riff (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'VI', functionLabel: 'Submediant Bass Pedal', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'E', roman: 'VII', functionLabel: 'Subtonic Bass Pedal', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['F#3', 'A3', 'C#4'] },
    ],
    earClue:
      'Randy Rhoads’ legendary intro guitar riff pedals continuously off the F♯ bass note using the 3-sharp F♯ natural minor scale!',
    theoryExplanation: {
      whyThisTonic:
        'After the 4-bar F♯ – D – E – F♯ bass intro, the main guitar riff bounces every other 8th note off F♯.',
      whyMajorOrMinor:
        'The intro and main riff are built strictly from the F♯ Aeolian (natural minor) scale (F♯ G♯ A B C♯ D E).',
      keySignatureRule:
        'F♯ Minor has 3 sharps: F♯, C♯, and G♯ (while the verse brightens to its relative A Major!).',
      cadenceInsight:
        'Intro/Riff in F♯ Minor (i – VI – VII – i); Verse flips to relative A Major (I – V – IV – I)!',
    },
  },
  {
    id: 'get-lucky',
    title: 'Get Lucky',
    artist: 'Daft Punk ft. Pharrell Williams',
    year: 2013,
    itunesQuery: 'Get Lucky Daft Punk',
    keyId: 'B-minor',
    bpm: 116,
    difficulty: 2,
    chords: [
      { symbol: 'Bm', roman: 'i', functionLabel: 'Tonic Dorian Groove (Home)', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'D', roman: 'III', functionLabel: 'Relative Major', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'F#m', roman: 'v', functionLabel: 'Minor Dominant', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'E', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'Nile Rodgers’ funky disco guitar loops the exact same 4 chords for the entire 4 minutes, starting on B Minor and using 3 sharps (B Dorian)!',
    theoryExplanation: {
      whyThisTonic:
        'The 4-bar disco loop begins on Bm7 on bar 1 of every cycle from the first guitar scratch to the final fade.',
      whyMajorOrMinor:
        'Anchored on B Minor (using the B Dorian mode, which shares A Major/F♯ Minor’s 3 sharps: F♯, C♯, G♯ so the IV chord is a bright E Major!).',
      keySignatureRule:
        'B Minor natural has 2 sharps (F♯, C♯), and B Dorian adds G♯ to make the 4th chord (E Major) sparkle.',
      cadenceInsight:
        'Loops i – III – v – IV (Bm7 – D – F♯m7 – E) nonstop.',
    },
  },
  {
    id: 'as-it-was',
    title: 'As It Was',
    artist: 'Harry Styles',
    year: 2022,
    itunesQuery: 'As It Was Harry Styles',
    keyId: 'A-major',
    bpm: 174,
    difficulty: 2,
    chords: [
      { symbol: 'Bm', roman: 'ii', functionLabel: 'Supertonic Launch', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'E', roman: 'V', functionLabel: 'Dominant', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant', notes: ['D3', 'F#3', 'A3'] },
    ],
    earClue:
      'Just like "Take On Me", this fast synth-pop loop uses 3 sharps (F♯, C♯, G♯) and cycles ii → V → I → IV in A Major!',
    theoryExplanation: {
      whyThisTonic:
        'Every 4-bar cycle executes a textbook ii → V → I resolution (Bm → E → A) landing on A Major in bar 3.',
      whyMajorOrMinor:
        'The bright synth melody plays solely on the A Major scale (A B C♯ D E F♯ G♯) and resolves its phrases onto C♯ and A.',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Uses the perpetual-motion ii – V – I – IV loop (Bm – E – A – D).',
    },
  },
  {
    id: 'drivers-license',
    title: 'drivers license',
    artist: 'Olivia Rodrigo',
    year: 2021,
    itunesQuery: 'drivers license Olivia Rodrigo',
    keyId: 'Bb-major',
    bpm: 144,
    difficulty: 2,
    chords: [
      { symbol: 'Bb', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Gm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'Eb', roman: 'IV', functionLabel: 'Subdominant', notes: ['Eb3', 'G3', 'Bb3'] },
      { symbol: 'Bb', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['Bb3', 'D4', 'F4'] },
    ],
    earClue:
      'The pulsing piano note at the very beginning hammers B♭, and the two black keys in the scale are B♭ and E♭!',
    theoryExplanation: {
      whyThisTonic:
        'The verse opens with 4 bars of a pulsing B♭ Major chord and returns to B♭ after stepping to Gm and E♭.',
      whyMajorOrMinor:
        'B♭ – D – F is the unmistakable home chord that opens and closes every verse and chorus.',
      keySignatureRule:
        'B♭ Major has 2 flats: B♭ and E♭.',
      cadenceInsight:
        'Verse uses I – vi – IV – I (B♭ – Gm – E♭ – B♭); chorus launches from IV (E♭ – B♭ – Gm – F).',
    },
  },
  {
    id: 'bohemian-rhapsody',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    year: 1975,
    itunesQuery: 'Bohemian Rhapsody Queen',
    keyId: 'Bb-major',
    bpm: 72,
    difficulty: 2,
    chords: [
      { symbol: 'Bb', roman: 'I', functionLabel: 'Tonic Ballad Home', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Gm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'Cm', roman: 'ii', functionLabel: 'Supertonic Minor', notes: ['C3', 'Eb3', 'G3'] },
      { symbol: 'F', roman: 'V', functionLabel: 'Dominant', notes: ['F3', 'A3', 'C4'] },
    ],
    earClue:
      'Freddie Mercury’s iconic piano ballad ("Mama, just killed a man") begins on B♭ Major, steps down to G Minor, then moves to C Minor and F7!',
    theoryExplanation: {
      whyThisTonic:
        'The famous piano arpeggio launches on B♭ Major (B♭ – F – B♭ – D) and uses a ii → V → I (Cm7 → F7 → B♭) cadence.',
      whyMajorOrMinor:
        'All four chords of the main ballad loop (B♭, Gm, Cm, F7) are the classic I – vi – ii – V turnaround of B♭ Major.',
      keySignatureRule:
        'B♭ Major has 2 flats: B♭ and E♭ (later modulating to E♭ Major with 3 flats for the guitar solo!).',
      cadenceInsight:
        'Textbook circle-of-fifths ballad turnaround: I – vi – ii – V7 (B♭ – Gm – Cm – F7).',
    },
  },
  {
    id: 'locked-out-of-heaven',
    title: 'Locked Out of Heaven',
    artist: 'Bruno Mars',
    year: 2012,
    itunesQuery: 'Locked Out of Heaven Bruno Mars',
    keyId: 'D-minor',
    bpm: 144,
    difficulty: 2,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Reggae-Rock Chop', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Bb', roman: 'VI', functionLabel: 'Submediant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Gm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['G3', 'Bb3', 'D4'] },
    ],
    earClue:
      'All chords in the verse and chorus come from the 1-flat family (B♭), with the verse walking C → Dm → B♭ → Gm → A!',
    theoryExplanation: {
      whyThisTonic:
        'The verse centers on D Minor (with an A Major dominant chord pulling back into Dm), while the chorus brightens to B♭ and F Major within the same 1-flat key signature.',
      whyMajorOrMinor:
        'Uses the 1-flat pitch collection (D E F G A B♭ C) shared by D Minor and F Major.',
      keySignatureRule:
        'D Minor (and its relative F Major) has 1 flat: B♭.',
      cadenceInsight:
        'Verse uses VII – i – VI – iv – V in D Minor; chorus uses IV – ii – I – V in relative F Major!',
    },
  },
  {
    id: 'paint-it-black',
    title: 'Paint It, Black',
    artist: 'The Rolling Stones',
    year: 1966,
    itunesQuery: 'Paint It Black The Rolling Stones',
    keyId: 'E-minor',
    bpm: 159,
    difficulty: 2,
    chords: [
      { symbol: 'Em', roman: 'i', functionLabel: 'Tonic Sitar Riff (Home)', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'B7', roman: 'V7', functionLabel: 'Harmonic Minor Dominant', notes: ['B3', 'Eb4', 'F#4', 'A4'] },
      { symbol: 'Em', roman: 'i', functionLabel: 'Tonic Return', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'D', roman: 'VII', functionLabel: 'Subtonic', notes: ['D3', 'F#3', 'A3'] },
    ],
    earClue:
      'Brian Jones’ famous sitar melody plays E – F♯ – G – A – G – F♯ – E – D♯ – E: notice that dramatic D♯ (E♭) half-step leading tone right below E!',
    theoryExplanation: {
      whyThisTonic:
        'The verse alternates strictly between E Minor (i) and B7 (V7), making E the unmistakable minor tonic.',
      whyMajorOrMinor:
        'A textbook demonstration of the E Harmonic Minor scale (E F♯ G A B C D♯).',
      keySignatureRule:
        'E Minor has 1 sharp in its key signature (F♯), and raises the 7th degree (D → D♯) to create the magnetic V7 → i pull.',
      cadenceInsight:
        'Verse uses E Harmonic Minor (Em ↔ B7); second half uses E Natural Minor (Em – D – G – D – Em / A)!',
    },
  },
  {
    id: 'All-Along-the-Watchtower',
    title: 'All Along the Watchtower',
    artist: 'Jimi Hendrix',
    year: 1968,
    itunesQuery: 'All Along the Watchtower Jimi Hendrix',
    keyId: 'C#-minor',
    bpm: 114,
    difficulty: 3,
    chords: [
      { symbol: 'C#m', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['C#3', 'E3', 'Ab3', 'C#4'] },
      { symbol: 'B', roman: 'VII', functionLabel: 'Subtonic', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'A', roman: 'VI', functionLabel: 'Submediant', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'B', roman: 'VII', functionLabel: 'Subtonic Turnaround', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'Hendrix tuned his guitar down a half-step from D Minor into concert C♯ Minor (4 sharps), rocking back and forth across just 3 chords: C♯m – B – A – B!',
    theoryExplanation: {
      whyThisTonic:
        'The entire song cycles a 2-bar pendulum (C♯m → B → A → B → C♯m) that peaks and resolves on C♯ Minor.',
      whyMajorOrMinor:
        'Jimi Hendrix’s blistering guitar solos play C♯ minor pentatonic and C♯ Aeolian from start to finish.',
      keySignatureRule:
        'C♯ Minor is the relative minor of E Major with 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'The quintessential Aeolian rock cadence: i – VII – VI – VII (C♯m – B – A – B).',
    },
  },
  {
    id: 'one',
    title: 'One',
    artist: 'U2',
    year: 1991,
    itunesQuery: 'One U2',
    keyId: 'A-minor',
    bpm: 91,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic Verse (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'F', roman: 'VI', functionLabel: 'Submediant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The Edge’s opening guitar chord is a soulful A Minor triad, followed by a warm D Major (borrowing F♯) before returning to all white keys (F and G)!',
    theoryExplanation: {
      whyThisTonic:
        'The verse opens on A Minor ("Is it getting better?") and returns to Am every 4 bars, while the chorus ("One love, one blood") resolves to relative C Major.',
      whyMajorOrMinor:
        'A Minor and C Major share the 0-sharp/0-flat key signature, with the verse anchored on A Minor.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats (with an occasional F♯ borrowed from A Dorian on the D Major chord).',
      cadenceInsight:
        'Verse uses i – IV – VI – VII (Am – D – F – G); chorus shifts to relative C Major (C – Am – F – C)!',
    },
  },
  {
    id: 'flowers',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    year: 2023,
    itunesQuery: 'Flowers Miley Cyrus',
    keyId: 'A-minor',
    bpm: 118,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic Launch (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Dm', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'C', roman: 'III', functionLabel: 'Relative Major', notes: ['C3', 'E3', 'G3', 'C4'] },
    ],
    earClue:
      'Every single chord in this disco-pop hit uses only the white keys, walking through the Circle of Fifths in A Minor: Am → Dm → G → C!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse and chorus ("I can buy myself flowers") begin on A Minor and use an E7/F → E turnaround to pull right back to Am.',
      whyMajorOrMinor:
        'Uses the classic minor circle-of-fifths sequence (i – iv – VII – III) anchored on A Minor.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats.',
      cadenceInsight:
        'Follows the jazz/disco "Fly Me to the Moon" / "I Will Survive" progression in A Minor (Am – Dm – G – C – F – Dm – E).',
    },
  },
  {
    id: 'bad-romance',
    title: 'Bad Romance',
    artist: 'Lady Gaga',
    year: 2009,
    itunesQuery: 'Bad Romance Lady Gaga',
    keyId: 'A-minor',
    bpm: 119,
    difficulty: 1,
    chords: [
      { symbol: 'F', roman: 'VI', functionLabel: 'Submediant Chorus Launch', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'C', roman: 'III', functionLabel: 'Relative Major', notes: ['C3', 'E3', 'G3', 'C4'] },
    ],
    earClue:
      'All white keys fit! While the synth verse stomps on Am – C – F – E, the huge chorus launches on F → G → Am → C.',
    theoryExplanation: {
      whyThisTonic:
        'The famous "Rah-rah-ah-ah-ah" hook hammers A Minor and resolves every phrase via G or E back to Am.',
      whyMajorOrMinor:
        'Anchored on A Minor (0 sharps/flats) with strong A Aeolian and Harmonic Minor cadences.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats.',
      cadenceInsight:
        'Chorus climbs VI – VII – i – III (F – G – Am – C) before closing VI – VII – V – i.',
    },
  },
  {
    id: 'starboy',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    year: 2016,
    itunesQuery: 'Starboy The Weeknd',
    keyId: 'A-minor',
    bpm: 186,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'F', roman: 'VI', functionLabel: 'Submediant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'G', roman: 'VII', functionLabel: 'Subtonic Return', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The entire track loops a simple white-key bass descent from A down to G and F before stepping back up through G to A Minor!',
    theoryExplanation: {
      whyThisTonic:
        'The piano and sub-bass start on A Minor on bar 1 of every 4-bar cycle and return to Am without ever changing the loop.',
      whyMajorOrMinor:
        'A – C – E is the dark minor tonic chord on beat 1.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats (all white keys).',
      cadenceInsight:
        'Loops i – VII – VI – VII (Am7 – G – F – G) from start to finish.',
    },
  },
  {
    id: 'espresso',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    year: 2024,
    itunesQuery: 'Espresso Sabrina Carpenter',
    keyId: 'A-minor',
    bpm: 104,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'iv', functionLabel: 'Subdominant Minor Launch', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'Em', roman: 'v', functionLabel: 'Minor Dominant', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Am', roman: 'i', functionLabel: 'Tonic Groove Sustain', notes: ['A3', 'C4', 'E4'] },
    ],
    earClue:
      'All 7 white keys fit this funky disco-pop bassline, which walks Dm7 → Em7 → Am7 and rests for two full bars on A Minor!',
    theoryExplanation: {
      whyThisTonic:
        'Although each 4-bar cycle starts on Dm7 (iv) and steps up to Em7 (v), it lands on Am7 (i) and holds A Minor for the entire second half of the loop.',
      whyMajorOrMinor:
        'All three chords in the loop (Dm7, Em7, Am7) are minor seventh chords from the 0-sharp/0-flat A natural minor scale.',
      keySignatureRule:
        'A Minor has 0 sharps and 0 flats.',
      cadenceInsight:
        'Uses a sleek iv7 – v7 – i7 – i7 minor funk progression (Dm7 – Em7 – Am7 – Am7).',
    },
  },
  {
    id: 'save-your-tears',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    year: 2020,
    itunesQuery: 'Save Your Tears The Weeknd',
    keyId: 'C-major',
    bpm: 118,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Em', roman: 'iii', functionLabel: 'Mediant Minor', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Every single synth chord and vocal note uses only the 7 white keys, opening on a bright 80s C Major chord!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse (C – Am – Em – G) and the chorus (Dm – Am – F – G → C) resolve directly onto C Major.',
      whyMajorOrMinor:
        'The bright C Major opening synth chord and F → G → C chorus turnaround establish C Major.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats.',
      cadenceInsight:
        'Verse uses I – vi – iii – V (C – Am – Em – G); chorus uses ii – vi – IV – V (Dm – Am – F – G).',
    },
  },
  {
    id: 'circles',
    title: 'Circles',
    artist: 'Post Malone',
    year: 2019,
    itunesQuery: 'Circles Post Malone',
    keyId: 'C-major',
    bpm: 120,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Cmaj7', roman: 'Imaj7', functionLabel: 'Tonic Major 7th', notes: ['C3', 'E3', 'G3', 'B3'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Fm', roman: 'iv', functionLabel: 'Borrowed Minor Subdominant', notes: ['F3', 'Ab3', 'C4'] },
    ],
    earClue:
      'The dreamy bass and acoustic guitar start on C Major (all white keys) before melting from F Major into a nostalgic F Minor chord (with A♭)!',
    theoryExplanation: {
      whyThisTonic:
        'Every 8-bar cycle begins with 4 bars on C / Cmaj7 and returns home to C Major right after the F → Fm minor plagal cadence.',
      whyMajorOrMinor:
        'C Major is the sunny home base, colored by the classic borrowed iv chord (F Minor).',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats (borrowing A♭ on the F Minor chord).',
      cadenceInsight:
        'Features the beloved I – Imaj7 – IV – iv (C – Cmaj7 – F – Fm) nostalgia progression.',
    },
  },
  {
    id: 'ho-hey',
    title: 'Ho Hey',
    artist: 'The Lumineers',
    year: 2012,
    itunesQuery: 'Ho Hey The Lumineers',
    keyId: 'C-major',
    bpm: 80,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'F', roman: 'IV', functionLabel: 'Subdominant Grace Hit', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'G', roman: 'V', functionLabel: 'Dominant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The acoustic guitar strums C Major ("Ho!") and flicks F back to C ("Hey!") using purely the 7 white keys.',
    theoryExplanation: {
      whyThisTonic:
        'The verse sits almost entirely on C Major (with quick F neighbor strums) before stepping to Am → G → C.',
      whyMajorOrMinor:
        'C – E – G is the constant acoustic anchor for more than 70% of every verse.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats.',
      cadenceInsight:
        'Verse uses I – IV – I and vi – V – I; chorus uses vi – Em – F – C – G.',
    },
  },
  {
    id: 'happier-than-ever',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    year: 2021,
    itunesQuery: 'Happier Than Ever Billie Eilish',
    keyId: 'C-major',
    bpm: 81,
    difficulty: 1,
    chords: [
      { symbol: 'C', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'E7', roman: 'V7/vi', functionLabel: 'Secondary Dominant to Am', notes: ['E3', 'Ab3', 'B3', 'D4'] },
      { symbol: 'Am', roman: 'vi', functionLabel: 'Relative Minor', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Dm', roman: 'ii', functionLabel: 'Supertonic Minor', notes: ['D3', 'F3', 'A3'] },
    ],
    earClue:
      'Both the quiet ukulele first half and the explosive rock finale start on C Major and use an E7 chord to pull into A Minor!',
    theoryExplanation: {
      whyThisTonic:
        'Every cycle begins on C Major ("When I’m away from you, I’m happier than ever") and finishes with a Dm → G7 → C (ii → V → I) turnaround.',
      whyMajorOrMinor:
        'Opens on C Major and closes every cycle with a G → C cadence.',
      keySignatureRule:
        'C Major has 0 sharps and 0 flats (using G♯ on the E7 secondary dominant chord to pull into Am).',
      cadenceInsight:
        'Uses the classic jazz/rock progression I – V7/vi – vi – ii – V7 (C – E7 – Am – Dm – G7).',
    },
  },
  {
    id: 'shake-it-off',
    title: 'Shake It Off',
    artist: 'Taylor Swift',
    year: 2014,
    itunesQuery: 'Shake It Off Taylor Swift',
    keyId: 'G-major',
    bpm: 160,
    difficulty: 1,
    chords: [
      { symbol: 'Am', roman: 'ii', functionLabel: 'Supertonic Launch', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'Cmaj7', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'B3'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic Sustain', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The entire song repeats just 3 chords (Am – C – G – G), holding G Major for two full bars on every single loop!',
    theoryExplanation: {
      whyThisTonic:
        'The saxophone and bassline step Am → C → G and rest on G Major for half of every 4-bar cycle.',
      whyMajorOrMinor:
        'G Major is the bright resting chord for bars 3 and 4 of every cycle, using the 1-sharp G Major scale (F♯).',
      keySignatureRule:
        'G Major has 1 sharp: F♯.',
      cadenceInsight:
        'Loops ii – IV – I – I (Am – C – G – G) continuously from start to finish.',
    },
  },
  {
    id: 'royals',
    title: 'Royals',
    artist: 'Lorde',
    year: 2013,
    itunesQuery: 'Royals Lorde',
    keyId: 'G-major',
    bpm: 85,
    difficulty: 1,
    chords: [
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'G', roman: 'I', functionLabel: 'Tonic Pedal', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'F', roman: 'bVII', functionLabel: 'Mixolydian Subtonic', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'C', roman: 'IV', functionLabel: 'Subdominant', notes: ['C3', 'E3', 'G3', 'C4'] },
    ],
    earClue:
      'Listen to the deep sub-bass in the verse: it sits on one low root note (G) while the vocal sings the G Major triad, then steps down to F natural (G Mixolydian)!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse and chorus start on G Major and stay on G for two full bars before dipping to F (bVII) and C (IV).',
      whyMajorOrMinor:
        'Lorde’s melody outlines a bright G Major triad (G – B – D) right over the G bass note.',
      keySignatureRule:
        'G Major has 1 sharp (F♯), while G Mixolydian lowers F♯ to F natural to create the cool bVII chord (F Major).',
      cadenceInsight:
        'Uses the classic Mixolydian pop loop I – I – bVII – IV (G – G – F – C).',
    },
  },
  {
    id: 'blank-space',
    title: 'Blank Space',
    artist: 'Taylor Swift',
    year: 2014,
    itunesQuery: 'Blank Space Taylor Swift',
    keyId: 'F-major',
    bpm: 96,
    difficulty: 1,
    chords: [
      { symbol: 'F', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Dm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'Gm', roman: 'ii', functionLabel: 'Supertonic Minor', notes: ['G3', 'Bb3', 'D4'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Subdominant', notes: ['Bb3', 'D4', 'F4'] },
    ],
    earClue:
      'Only 1 black key (B♭) fits this entire song, and both the verse ("Nice to meet you, where you been?") and chorus open on F Major!',
    theoryExplanation: {
      whyThisTonic:
        'Every 4-bar cycle in both the verse and chorus begins on a crisp F Major chord.',
      whyMajorOrMinor:
        'F – A – C is the home triad on bar 1, using the classic F Major diatonic family (F, Dm, Gm, B♭, C).',
      keySignatureRule:
        'F Major has 1 flat: B♭.',
      cadenceInsight:
        'Verse uses I – vi – ii – IV (F – Dm – Gm – B♭); chorus uses I – vi – Bb – C (I – vi – IV – V).',
    },
  },
  {
    id: 'vampire',
    title: 'vampire',
    artist: 'Olivia Rodrigo',
    year: 2023,
    itunesQuery: 'vampire Olivia Rodrigo',
    keyId: 'F-major',
    bpm: 138,
    difficulty: 2,
    chords: [
      { symbol: 'F', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'A', roman: 'III', functionLabel: 'Secondary Dominant (V/vi)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'Bb', roman: 'IV', functionLabel: 'Subdominant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Bbm', roman: 'iv', functionLabel: 'Borrowed Minor Subdominant', notes: ['Bb3', 'C#4', 'F4'] },
    ],
    earClue:
      'Just like Radiohead’s "Creep" (transposed down a whole step to F Major!), the piano plays F → A → B♭ → B♭m with a rising/falling chromatic inner voice (C → C♯ → D → D♭)!',
    theoryExplanation: {
      whyThisTonic:
        'The piano ballad opens on a warm F Major chord and returns to F Major at the top of every 4-chord cycle.',
      whyMajorOrMinor:
        'Anchored on F Major (1 flat: B♭), enhanced with the dramatic I – III – IV – iv chromatic line cliché.',
      keySignatureRule:
        'F Major has 1 flat (B♭), borrowing C♯ on the A Major chord and D♭ on the B♭ Minor chord.',
      cadenceInsight:
        'Uses the theatrical I – III – IV – iv progression (F – A – B♭ – B♭m) resolving back to F Major.',
    },
  },
  {
    id: 'watermelon-sugar',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    year: 2019,
    itunesQuery: 'Watermelon Sugar Harry Styles',
    keyId: 'D-minor',
    bpm: 95,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'Am', roman: 'v', functionLabel: 'Minor Dominant', notes: ['A3', 'C4', 'E4'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'All 7 white keys fit this sunny summer groove, yet the opening and resting home chord is D Minor (making it D Dorian)!',
    theoryExplanation: {
      whyThisTonic:
        'The entire song repeats a 4-bar loop (Dm7 – Am7 – C – G) that starts on D Minor every single time.',
      whyMajorOrMinor:
        'Starts on a minor tonic (Dm7) and uses the D Dorian mode (raising B♭ to B natural on the final G Major chord).',
      keySignatureRule:
        'D Minor’s key signature has 1 flat (B♭), while D Dorian uses 0 sharps/flats.',
      cadenceInsight:
        'Loops i7 – v7 – VII – IV (Dm7 – Am7 – C – G) from start to finish.',
    },
  },
  {
    id: 'somebody-that-i-used-to-know',
    title: 'Somebody That I Used to Know',
    artist: 'Gotye ft. Kimbra',
    year: 2011,
    itunesQuery: 'Somebody That I Used to Know Gotye',
    keyId: 'D-minor',
    bpm: 129,
    difficulty: 1,
    chords: [
      { symbol: 'Dm', roman: 'i', functionLabel: 'Tonic Verse (Home)', notes: ['D3', 'F3', 'A3'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic', notes: ['C3', 'E3', 'G3', 'C4'] },
      { symbol: 'Bb', roman: 'VI', functionLabel: 'Submediant Chorus', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'C', roman: 'VII', functionLabel: 'Subtonic Turnaround', notes: ['C3', 'E3', 'G3', 'C4'] },
    ],
    earClue:
      'The verse guitar plucks just two chords back and forth (D Minor ↔ C Major), and the xylophone plays the D natural minor scale (with B♭ as the only black key)!',
    theoryExplanation: {
      whyThisTonic:
        'The entire verse alternates Dm ↔ C, and the chorus adds B♭ (Dm – C – B♭ – C) while always returning to D Minor on beat 1.',
      whyMajorOrMinor:
        'Built 100% from the D natural minor (Aeolian) scale: D E F G A B♭ C.',
      keySignatureRule:
        'D Minor has 1 flat: B♭.',
      cadenceInsight:
        'Verse uses a two-chord i – VII pendulum (Dm – C); chorus expands to i – VII – VI – VII (Dm – C – B♭ – C).',
    },
  },
  {
    id: 'love-story',
    title: 'Love Story',
    artist: 'Taylor Swift',
    year: 2008,
    itunesQuery: 'Love Story Taylor Swift',
    keyId: 'D-major',
    bpm: 119,
    difficulty: 2,
    chords: [
      { symbol: 'D', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'V', functionLabel: 'Dominant', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'Bm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Subdominant', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'The banjo and acoustic guitar intro starts on a bright D Major triad using 2 sharps (F♯ and C♯).',
    theoryExplanation: {
      whyThisTonic:
        'The intro, verse, and chorus all revolve around D Major (until the famous final-chorus key change up a whole step to E Major!).',
      whyMajorOrMinor:
        'Uses the 4 primary diatonic chords of D Major: D (I), G (IV), A (V), and Bm (vi).',
      keySignatureRule:
        'D Major has 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'Verse uses I – IV – vi – V (D – G – Bm – A); chorus uses I – V – vi – IV (D – A – Bm – G).',
    },
  },
  {
    id: 'sunflower',
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    year: 2018,
    itunesQuery: 'Sunflower Post Malone Swae Lee',
    keyId: 'D-major',
    bpm: 90,
    difficulty: 2,
    chords: [
      { symbol: 'D', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Subdominant', notes: ['G3', 'B3', 'D4'] },
      { symbol: 'Bm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'G', roman: 'IV', functionLabel: 'Subdominant Return', notes: ['G3', 'B3', 'D4'] },
    ],
    earClue:
      'Only 2 black keys (F♯ and C♯) fit this breezy synth-funk loop, which rocks D → G → Bm → G!',
    theoryExplanation: {
      whyThisTonic:
        'The bassline starts every 4-bar cycle on D and uses a IV → I (G → D) plagal resolution back to D Major.',
      whyMajorOrMinor:
        'The bright F♯ in the opening D Major chord sets a sunny, relaxed D Major tonality.',
      keySignatureRule:
        'D Major has 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'Loops I – IV – vi – IV (D – G – Bm – G) throughout the entire track.',
    },
  },
  {
    id: 'birds-of-a-feather',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    year: 2024,
    itunesQuery: 'BIRDS OF A FEATHER Billie Eilish',
    keyId: 'D-major',
    bpm: 105,
    difficulty: 2,
    chords: [
      { symbol: 'D', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'Bm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'Em', roman: 'ii', functionLabel: 'Supertonic Minor', notes: ['E3', 'G3', 'B3'] },
      { symbol: 'A', roman: 'V', functionLabel: 'Dominant', notes: ['A3', 'C#4', 'E4'] },
    ],
    earClue:
      'Listen to the sparkling synth loop: it follows the classic 1950s/motown circle turnaround in D Major (D – Bm7 – Em7 – A7) with 2 sharps (F♯ and C♯)!',
    theoryExplanation: {
      whyThisTonic:
        'Every 4-bar cycle starts on D Major and finishes with an Em7 → A7 → D (ii → V → I) authentic cadence.',
      whyMajorOrMinor:
        'All 4 chords (D, Bm7, Em7, A7) are the textbook I – vi – ii – V chords of D Major.',
      keySignatureRule:
        'D Major has 2 sharps: F♯ and C♯.',
      cadenceInsight:
        'Loops the timeless I – vi7 – ii7 – V7 turnaround (D – Bm7 – Em7 – A7) from start to finish.',
    },
  },
  {
    id: 'radioactive',
    title: 'Radioactive',
    artist: 'Imagine Dragons',
    year: 2012,
    itunesQuery: 'Radioactive Imagine Dragons',
    keyId: 'B-minor',
    bpm: 136,
    difficulty: 2,
    chords: [
      { symbol: 'Bm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['B3', 'D4', 'F#4'] },
      { symbol: 'D', roman: 'III', functionLabel: 'Relative Major', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'VII', functionLabel: 'Subtonic', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'IV', functionLabel: 'Dorian Major IV', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'The acoustic intro and heavy dubstep-rock chorus both cycle Bm – D – A – E, starting on B Minor!',
    theoryExplanation: {
      whyThisTonic:
        'Every 4-bar cycle begins on B Minor ("I’m waking up to ash and dust") and loops continuously.',
      whyMajorOrMinor:
        'Anchored on B Minor, using the B Dorian mode (raising G to G♯ on the E Major IV chord).',
      keySignatureRule:
        'B Minor natural has 2 sharps (F♯, C♯), and B Dorian adds G♯ for the E Major chord.',
      cadenceInsight:
        'Follows the Dorian rock loop i – III – VII – IV (Bm – D – A – E).',
    },
  },
  {
    id: 'cruel-summer',
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    year: 2019,
    itunesQuery: 'Cruel Summer Taylor Swift',
    keyId: 'A-major',
    bpm: 170,
    difficulty: 2,
    chords: [
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'C#m', roman: 'iii', functionLabel: 'Mediant Minor', notes: ['C#3', 'E3', 'Ab3'] },
      { symbol: 'F#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant', notes: ['D3', 'F#3', 'A3'] },
    ],
    earClue:
      'Test the 3 black keys F♯, C♯, and G♯—all three fit this shimmering synth-pop progression centered on A Major!',
    theoryExplanation: {
      whyThisTonic:
        'Both the pulsing synth verse and the soaring chorus ("It’s a cruel summer") launch on A Major (I) and return to A via D (IV) or E (V).',
      whyMajorOrMinor:
        'The bright C♯ major third in the opening A Major chord establishes A Major immediately.',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Cycles I – iii – vi – IV (A – C♯m – F♯m – D) in A Major.',
    },
  },
  {
    id: 'pompeii',
    title: 'Pompeii',
    artist: 'Bastille',
    year: 2013,
    itunesQuery: 'Pompeii Bastille',
    keyId: 'A-major',
    bpm: 127,
    difficulty: 2,
    chords: [
      { symbol: 'D', roman: 'IV', functionLabel: 'Subdominant Chant Launch', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'A', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'F#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'E', roman: 'V', functionLabel: 'Dominant', notes: ['E3', 'Ab3', 'B3'] },
    ],
    earClue:
      'The famous "Eh-eh-oh, eh-oh" choir chant uses the 3-sharp A Major scale (F♯, C♯, G♯) over a D – A – F♯m – E loop!',
    theoryExplanation: {
      whyThisTonic:
        'Although the 4-bar loop starts on the IV chord (D), it immediately drops to the A Major tonic (I) on bar 2, and every vocal phrase resolves onto A and C♯.',
      whyMajorOrMinor:
        'The choir hook outlines the A Major triad (A – C♯ – E) throughout the song.',
      keySignatureRule:
        'A Major has 3 sharps: F♯, C♯, and G♯.',
      cadenceInsight:
        'Uses the stadium-pop IV – I – vi – V loop (D – A – F♯m – E).',
    },
  },
  {
    id: 'good-4-u',
    title: 'good 4 u',
    artist: 'Olivia Rodrigo',
    year: 2021,
    itunesQuery: 'good 4 u Olivia Rodrigo',
    keyId: 'F#-minor',
    bpm: 167,
    difficulty: 2,
    chords: [
      { symbol: 'F#m', roman: 'i', functionLabel: 'Tonic Pop-Punk Riff (Home)', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'E', roman: 'VII', functionLabel: 'Subtonic', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'D', roman: 'VI', functionLabel: 'Submediant', notes: ['D3', 'F#3', 'A3'] },
      { symbol: 'C#', roman: 'V', functionLabel: 'Harmonic Minor Dominant', notes: ['C#3', 'F3', 'Ab3'] },
    ],
    earClue:
      ' while the verse bass bounces between F♯m and E, the explosive chorus ("Good for you, you look happy and healthy") walks down the classic Andalusian cadence in F♯ Minor:D → A/E → F♯m → C♯!',
    theoryExplanation: {
      whyThisTonic:
        'The verse sits on F♯m ↔ E, and the chorus uses a sharp C♯7 (V7) dominant chord to slam back into F♯ Minor.',
      whyMajorOrMinor:
        'F♯ – A – C♯ is the unmistakable minor center of both the bass groove and power-chord chorus.',
      keySignatureRule:
        'F♯ Minor has 3 sharps: F♯, C♯, and G♯ (raising E to E♯/F natural on the C♯ Major V chord).',
      cadenceInsight:
        'Combines a two-chord i – VII verse with a VI – III – V – i harmonic minor chorus!',
    },
  },
  {
    id: 'demons',
    title: 'Demons',
    artist: 'Imagine Dragons',
    year: 2012,
    itunesQuery: 'Demons Imagine Dragons',
    keyId: 'Eb-major',
    bpm: 90,
    difficulty: 2,
    chords: [
      { symbol: 'Eb', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['Eb3', 'G3', 'Bb3', 'Eb4'] },
      { symbol: 'Bb', roman: 'V', functionLabel: 'Dominant', notes: ['Bb3', 'D4', 'F4'] },
      { symbol: 'Cm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['C3', 'Eb3', 'G3'] },
      { symbol: 'Ab', roman: 'IV', functionLabel: 'Subdominant', notes: ['Ab3', 'C4', 'Eb4'] },
    ],
    earClue:
      'The chiming synth-piano intro starts on the black key E♭ and plays a pure I – V – vi – IV loop using 3 flats (B♭, E♭, A♭)!',
    theoryExplanation: {
      whyThisTonic:
        'Every single 4-bar cycle from the first synth note to the last chorus begins on E♭ Major.',
      whyMajorOrMinor:
        'E♭ – G – B♭ is the warm, resonant Major home triad on bar 1 of every phrase.',
      keySignatureRule:
        'E♭ Major has 3 flats: B♭, E♭, and A♭.',
      cadenceInsight:
        'A crystal-clear I – V – vi – IV anthem in E♭ Major (E♭ – B♭ – Cm – A♭).',
    },
  },
  {
    id: 'anti-hero',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    year: 2022,
    itunesQuery: 'Anti-Hero Taylor Swift',
    keyId: 'E-major',
    bpm: 97,
    difficulty: 3,
    chords: [
      { symbol: 'A', roman: 'IV', functionLabel: 'Subdominant Launch', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['E3', 'Ab3', 'B3', 'E4'] },
      { symbol: 'B', roman: 'V', functionLabel: 'Dominant', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'C#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['C#3', 'E3', 'Ab3'] },
    ],
    earClue:
      'Test the 4 black keys F♯, C♯, G♯, and D♯—all 4 belong to this synth loop ("It’s me, hi, I’m the problem, it’s me") in E Major!',
    theoryExplanation: {
      whyThisTonic:
        'The 4-bar synth loop steps A → E → B → C♯m (IV – I – V – vi), centering the vocal melody around E, G♯, and B.',
      whyMajorOrMinor:
        'Uses the 4 primary chords of E Major (A, E, B, C♯m) with the vocal hook resolving onto the E Major triad.',
      keySignatureRule:
        'E Major has 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Cycles IV – I – V – vi (A – E – B – C♯m) endlessly to create a floating synth-pop pulse.',
    },
  },
  {
    id: 'golden-hour',
    title: 'golden hour',
    artist: 'JVKE',
    year: 2022,
    itunesQuery: 'golden hour JVKE',
    keyId: 'E-major',
    bpm: 94,
    difficulty: 3,
    chords: [
      { symbol: 'A', roman: 'IV', functionLabel: 'Subdominant Arpeggio Launch', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'E', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['E3', 'Ab3', 'B3', 'E4'] },
      { symbol: 'C#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['C#3', 'E3', 'Ab3'] },
      { symbol: 'B', roman: 'V', functionLabel: 'Dominant', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'The glittering piano arpeggios cascade through the 4-sharp E Major scale (with a dreamy G♯7 secondary dominant leading into C♯m in the chorus)!',
    theoryExplanation: {
      whyThisTonic:
        'The piano arpeggios resolve repeatedly to E Major (I), and the chorus ("It’s your golden hour") centers around the E Major scale.',
      whyMajorOrMinor:
        'Built on the shimmering 4-sharp E Major key signature (F♯, C♯, G♯, D♯).',
      keySignatureRule:
        'E Major has 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Uses IV – I – vi – V (A – E – C♯m – B) in the verse and adds V7/vi (G♯7) before C♯m in the chorus.',
    },
  },
  {
    id: 'die-for-you',
    title: 'Die For You',
    artist: 'The Weeknd',
    year: 2016,
    itunesQuery: 'Die For You The Weeknd',
    keyId: 'C#-minor',
    bpm: 134,
    difficulty: 3,
    chords: [
      { symbol: 'C#m', roman: 'i', functionLabel: 'Tonic R&B Synth (Home)', notes: ['C#3', 'E3', 'Ab3', 'C#4'] },
      { symbol: 'F#m', roman: 'iv', functionLabel: 'Subdominant Minor', notes: ['F#3', 'A3', 'C#4'] },
      { symbol: 'A', roman: 'VI', functionLabel: 'Submediant Major', notes: ['A3', 'C#4', 'E4'] },
      { symbol: 'B', roman: 'VII', functionLabel: 'Subtonic Major', notes: ['B3', 'Eb4', 'F#4'] },
    ],
    earClue:
      'Play C♯ Minor, F♯ Minor, A Major, and B Major—this lush R&B loop uses the exact same 4-sharp C♯ Minor progression as "Shape of You"!',
    theoryExplanation: {
      whyThisTonic:
        'The synth pad starts on C♯m7 on bar 1 and climbs through F♯m7, A, and B before dropping back into C♯m7.',
      whyMajorOrMinor:
        'The vocal hook ("I would die for you") lands directly on the C♯ Minor tonic triad.',
      keySignatureRule:
        'C♯ Minor is the relative minor of E Major with 4 sharps: F♯, C♯, G♯, and D♯.',
      cadenceInsight:
        'Cycles i7 – iv7 – VI – VII (C♯m7 – F♯m7 – Amaj7 – B) throughout.',
    },
  },
  {
    id: 'poker-face',
    title: 'Poker Face',
    artist: 'Lady Gaga',
    year: 2008,
    itunesQuery: 'Poker Face Lady Gaga',
    keyId: 'Ab-minor',
    bpm: 119,
    difficulty: 3,
    chords: [
      { symbol: 'G#m', roman: 'i', functionLabel: 'Tonic Synth Riff (Home)', notes: ['Ab3', 'B3', 'Eb4'] },
      { symbol: 'E', roman: 'VI', functionLabel: 'Submediant Major', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'B', roman: 'III', functionLabel: 'Relative Major', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'F#', roman: 'VII', functionLabel: 'Subtonic', notes: ['F#3', 'Bb3', 'C#4'] },
    ],
    earClue:
      'The dark robotic synth bass ("Mum-mum-mum-mah") pulses on the black key G♯ (A♭) and uses all 5 sharps of the G♯ Minor / B Major scale!',
    theoryExplanation: {
      whyThisTonic:
        'Both the verse pulse (G♯m – E – F♯) and the soaring chorus (G♯m – E – B – F♯) launch on G♯ Minor on beat 1.',
      whyMajorOrMinor:
        'G♯ – B – D♯ is the dark minor tonic chord that anchors the entire song.',
      keySignatureRule:
        'G♯ Minor (enharmonic with A♭ Minor) is the relative minor of B Major with 5 sharps: F♯, C♯, G♯, D♯, and A♯.',
      cadenceInsight:
        'Chorus uses the Axis minor progression i – VI – III – VII in G♯ Minor (G♯m – E – B – F♯).',
    },
  },
  {
    id: 'born-this-way',
    title: 'Born This Way',
    artist: 'Lady Gaga',
    year: 2011,
    itunesQuery: 'Born This Way Lady Gaga',
    keyId: 'F#-major',
    bpm: 124,
    difficulty: 3,
    chords: [
      { symbol: 'E', roman: 'bVII', functionLabel: 'Mixolydian Flat-VII Launch', notes: ['E3', 'Ab3', 'B3'] },
      { symbol: 'B', roman: 'IV', functionLabel: 'Subdominant', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'F#', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'F#', roman: 'I', functionLabel: 'Tonic Resolution', notes: ['F#3', 'Bb3', 'C#4'] },
    ],
    earClue:
      'Almost every note of the vocal hook ("I’m on the right track, baby, I was born this way") sits on the black keys, resolving to F♯ Major for two full bars!',
    theoryExplanation: {
      whyThisTonic:
        'The 4-bar loop steps E → B → F♯ → F♯, holding the bright F♯ Major triad for the entire second half of every cycle.',
      whyMajorOrMinor:
        'F♯ – A♯ – C♯ is the exuberant Major tonic triad that anchors both verse and chorus.',
      keySignatureRule:
        'F♯ Major sits at 6 o’clock on the Circle of Fifths with 6 sharps (F♯, C♯, G♯, D♯, A♯, E♯), while borrowing E natural for the Mixolydian bVII chord (E Major).',
      cadenceInsight:
        'Uses the classic Mixolydian dance-pop cadence bVII – IV – I – I (E – B – F♯ – F♯).',
    },
  },
  {
    id: 'girls-just-want-to-have-fun',
    title: 'Girls Just Want to Have Fun',
    artist: 'Cyndi Lauper',
    year: 1983,
    itunesQuery: 'Girls Just Want to Have Fun Cyndi Lauper',
    keyId: 'F#-major',
    bpm: 120,
    difficulty: 3,
    chords: [
      { symbol: 'F#', roman: 'I', functionLabel: 'Tonic Synth Riff (Home)', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'D#m', roman: 'vi', functionLabel: 'Relative Minor', notes: ['Eb3', 'F#3', 'Bb3'] },
      { symbol: 'B', roman: 'IV', functionLabel: 'Subdominant', notes: ['B3', 'Eb4', 'F#4'] },
      { symbol: 'C#', roman: 'V', functionLabel: 'Dominant', notes: ['C#3', 'F3', 'Ab3'] },
    ],
    earClue:
      'Play the 3 black keys F♯ – A♯ – C♯ together: this entire 80s classic shines in 6-sharp F♯ Major!',
    theoryExplanation: {
      whyThisTonic:
        'The sparkling synth riff opens on F♯ Major for two full bars and resolves every chorus via B → C♯ → F♯ (IV → V → I).',
      whyMajorOrMinor:
        'Pure, joyful F♯ Major diatonic harmony using I (F♯), vi (D♯m), IV (B), and V (C♯).',
      keySignatureRule:
        'F♯ Major (enharmonic with G♭ Major) sits at the bottom of the Circle of Fifths with 6 sharps: F♯, C♯, G♯, D♯, A♯, and E♯ (F natural!).',
      cadenceInsight:
        'Uses I – vi – IV – V (F♯ – D♯m – B – C♯) in the verse and IV – V – I in the chorus.',
    },
  },
  {
    id: 'riptide',
    title: 'Riptide',
    artist: 'Vance Joy',
    year: 2013,
    itunesQuery: 'Riptide Vance Joy',
    keyId: 'Db-major',
    bpm: 102,
    difficulty: 3,
    chords: [
      { symbol: 'Bbm', roman: 'vi', functionLabel: 'Relative Minor Launch', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Ab', roman: 'V', functionLabel: 'Dominant', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Db', roman: 'I', functionLabel: 'Tonic (Home)', notes: ['C#3', 'F3', 'Ab3', 'C#4'] },
      { symbol: 'Db', roman: 'I', functionLabel: 'Tonic Sustain', notes: ['C#3', 'F3', 'Ab3', 'C#4'] },
    ],
    earClue:
      'Vance Joy played Am – G – C shapes on a ukulele tuned up a half-step (or capo 1), so the real concert key is D♭ Major (5 flats) resting for two bars on D♭!',
    theoryExplanation: {
      whyThisTonic:
        'The 4-bar ukulele loop steps B♭m → A♭ → D♭ → D♭, spending the entire second half of every cycle resting on the bright D♭ Major chord.',
      whyMajorOrMinor:
        'Even though bar 1 starts on the relative minor (B♭m = vi), the V → I (A♭ → D♭) resolution on bar 3 holds D♭ Major twice as long.',
      keySignatureRule:
        'D♭ Major has 5 flats: B♭, E♭, A♭, D♭, and G♭.',
      cadenceInsight:
        'Loops vi – V – I – I (B♭m – A♭ – D♭ – D♭) continuously from start to finish.',
    },
  },
  {
    id: 'believer',
    title: 'Believer',
    artist: 'Imagine Dragons',
    year: 2017,
    itunesQuery: 'Believer Imagine Dragons',
    keyId: 'Bb-minor',
    bpm: 125,
    difficulty: 3,
    chords: [
      { symbol: 'Bbm', roman: 'i', functionLabel: 'Tonic Stomp (Home)', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Gb', roman: 'VI', functionLabel: 'Submediant Major', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'F', roman: 'V', functionLabel: 'Harmonic Minor Dominant', notes: ['F3', 'A3', 'C4'] },
      { symbol: 'Bbm', roman: 'i', functionLabel: 'Tonic Resolution', notes: ['Bb3', 'C#4', 'F4'] },
    ],
    earClue:
      'The stomping guitar and bass sit on B♭ Minor for two full bars, drop to G♭ Major, and use a fiery F Major (V) dominant chord to snap back to B♭m!',
    theoryExplanation: {
      whyThisTonic:
        'Every 4-bar cycle in both the verse and chorus opens on B♭ Minor for 2 bars and ends with an F7 → B♭m (V7 → i) cadence.',
      whyMajorOrMinor:
        'A textbook 5-flat B♭ Harmonic Minor progression (using A natural on the F Major dominant chord to pull back to B♭).',
      keySignatureRule:
        'B♭ Minor is the relative minor of D♭ Major and has 5 flats: B♭, E♭, A♭, D♭, and G♭.',
      cadenceInsight:
        'Loops i – i – VI – V (B♭m – B♭m – G♭ – F) from beginning to end.',
    },
  },
  {
    id: 'stay-kid-laroi',
    title: 'STAY',
    artist: 'The Kid LAROI & Justin Bieber',
    year: 2021,
    itunesQuery: 'STAY The Kid LAROI Justin Bieber',
    keyId: 'Bb-minor',
    bpm: 170,
    difficulty: 3,
    chords: [
      { symbol: 'Gb', roman: 'VI', functionLabel: 'Submediant Synth Launch', notes: ['F#3', 'Bb3', 'C#4'] },
      { symbol: 'Ab', roman: 'VII', functionLabel: 'Subtonic', notes: ['Ab3', 'C4', 'Eb4'] },
      { symbol: 'Bbm', roman: 'i', functionLabel: 'Tonic (Home)', notes: ['Bb3', 'C#4', 'F4'] },
      { symbol: 'Fm', roman: 'v', functionLabel: 'Minor Dominant', notes: ['F3', 'Ab3', 'C4'] },
    ],
    earClue:
      'All 5 black keys on the piano fit this high-speed 80s-style synth riff, which climbs G♭ → A♭ → B♭m → Fm in 5-flat B♭ Minor!',
    theoryExplanation: {
      whyThisTonic:
        'The synth loop climbs VI → VII → i (G♭ → A♭ → B♭m) to land on B♭ Minor in bar 3, and all vocal phrases resolve onto B♭ and D♭.',
      whyMajorOrMinor:
        'Uses the 5-flat B♭ natural minor scale (B♭ C D♭ E♭ F G♭ A♭).',
      keySignatureRule:
        'B♭ Minor has 5 flats: B♭, E♭, A♭, D♭, and G♭.',
      cadenceInsight:
        'Loops VI – VII – i – v (G♭ – A♭ – B♭m – Fm) throughout the entire track.',
    },
  },
  {
    id: 'closer',
    title: 'Closer',
    artist: 'The Chainsmokers ft. Halsey',
    year: 2016,
    itunesQuery: 'Closer The Chainsmokers Halsey',
    keyId: 'Ab-major',
    bpm: 95,
    difficulty: 3,
    chords: [
      { symbol: 'Db', roman: 'IV', functionLabel: 'Subdominant Launch', notes: ['C#3', 'F3', 'Ab3'] },
      { symbol: 'Eb', roman: 'V', functionLabel: 'Dominant', notes: ['Eb3', 'G3', 'Bb3'] },
      { symbol: 'Fm', roman: 'vi', functionLabel: 'Relative Minor', notes: ['F3', 'Ab3', 'C4'] },
      { symbol: 'Eb', roman: 'V', functionLabel: 'Dominant Turnaround', notes: ['Eb3', 'G3', 'Bb3'] },
    ],
    earClue:
      'The entire song uses only 3 chords (D♭ – E♭ – Fm – E♭) from the 4-flat A♭ Major / F Minor scale, while the synth drop melody hammers C – B♭ – A♭!',
    theoryExplanation: {
      whyThisTonic:
        'Even though the chord loop avoids landing on the A♭ Major I chord (hovering on IV – V – vi – V: D♭ – E♭ – Fm – E♭), the vocal and synth lead melodies resolve repeatedly down 3 – 2 – 1 (C – B♭ – A♭) onto A♭!',
      whyMajorOrMinor:
        'Shares the 4-flat key signature between A♭ Major (the melodic tonic) and F Minor (the relative minor chord in bar 3).',
      keySignatureRule:
        'A♭ Major (and relative F Minor) has 4 flats: B♭, E♭, A♭, and D♭.',
      cadenceInsight:
        'A famous example of a "deceptive pop loop" (IV – V – vi – V) where the melody supplies the A♭ tonic resolution!',
    },
  },
];

/**
 * Deterministically interleaves songs so that songs in the same key (or same relative key pair)
 * are never grouped together—both in the full list and within each difficulty level filter.
 */
export function interleaveSongsByKeyDiversity(songs: SongChallenge[]): SongChallenge[] {
  const hashString = (str: string): number => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };

  // Pre-sort by deterministic hash of title+artist so original key clusters are broken up
  const pool = [...songs].sort(
    (a, b) => hashString(`${a.title}-${a.artist}`) - hashString(`${b.title}-${b.artist}`)
  );

  const result: SongChallenge[] = [];
  const lastSeenAtKey: Record<string, number> = {};

  while (pool.length > 0) {
    const step = result.length;
    const prev1 = result[step - 1];
    const prev2 = result[step - 2];

    let bestIdx = 0;
    let bestScore = -Infinity;

    for (let i = 0; i < pool.length; i++) {
      const candidate = pool[i];
      let score = 0;

      // Strongly penalize matching the previous song's key or 2nd-previous song's key
      if (prev1 && candidate.keyId === prev1.keyId) {
        score -= 10000;
      }
      if (prev2 && candidate.keyId === prev2.keyId) {
        score -= 3000;
      }

      // Bonus for alternating Major vs. Minor mode
      if (prev1) {
        const prevIsMinor = prev1.keyId.endsWith('minor');
        const candIsMinor = candidate.keyId.endsWith('minor');
        if (prevIsMinor !== candIsMinor) score += 250;
      }

      // Bonus for keys not seen recently
      const lastSeen = lastSeenAtKey[candidate.keyId];
      if (lastSeen === undefined) {
        score += 500;
      } else {
        score += (step - lastSeen) * 90;
      }

      // Bonus for mixing difficulty levels smoothly in the "All Levels" view
      if (prev1 && candidate.difficulty !== prev1.difficulty) {
        score += 120;
      }

      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }

    const chosen = pool.splice(bestIdx, 1)[0];
    lastSeenAtKey[chosen.keyId] = step;
    result.push(chosen);
  }

  return result;
}

export const SONG_CHALLENGES: SongChallenge[] = interleaveSongsByKeyDiversity(RAW_SONG_CHALLENGES);


