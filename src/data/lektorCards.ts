// Dane kart lektorskich
export interface LektorCard {
  id: string;
  title: string;
  desc: string;
  iconPath: string; // SVG path data
  iconViewBox: string;
  audioId: string;
  audioSrc: string;
  audioType: string;
}

export const lektorCards: LektorCard[] = [
  {
    id: 'lektor-reklama',
    title: 'Reklama',
    desc: 'Nagrania reklamowe - spoty radiowe i telewizyjne, voice-over do video.',
    iconViewBox: '0 0 24 24',
    iconPath:
      'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    audioId: 'audio-lektor-1',
    audioSrc: '/assets/audio/lektorstwo/lektor_reklama.wav',
    audioType: 'audio/wav',
  },
  {
    id: 'lektor-elearning',
    title: 'E-Learning',
    desc: 'Kursy online, szkolenia korporacyjne - wyraźny, spokojny głos edukacyjny.',
    iconViewBox: '0 0 24 24',
    iconPath:
      'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    audioId: 'audio-lektor-2',
    audioSrc: '/assets/audio/lektorstwo/lektor_elearning.mp3',
    audioType: 'audio/mpeg',
  },
  {
    id: 'lektor-audiobook',
    title: 'Rozrywka i Media',
    desc: 'Audycje radiowe, podcasty - autorski projekt Roll D17, swobodny głos prezenterski.',
    iconViewBox: '0 0 24 24',
    iconPath:
      'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19L12 23 M8 23L16 23',
    audioId: 'audio-lektor-3',
    audioSrc: '/assets/audio/lektorstwo/radio.mp3',
    audioType: 'audio/mpeg',
  },
];
