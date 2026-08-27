// Dane utworów muzycznych
export interface Track {
  id: string;
  num: string;
  title: string;
  genre: string;
  audioId: string;
  audioSrc: string;
}

export const tracks: Track[] = [
  {
    id: 'track-1',
    num: '01',
    title: "Hell's Greatest Dad (Polish Cover)",
    genre:
      'Musical - Polski cover utworu z Hazbin Hotel. W nagraniu wykonuję wszystkie partie wokalne, a także odpowiadam za miks i mastering.',
    audioId: 'audio-music-1',
    audioSrc: '/assets/audio/muzyka/hells.mp3',
  },
  {
    id: 'track-2',
    num: '02',
    title: 'Once We Get Up There (Polish Cover)',
    genre: 'Musical - Polski cover utworu z Hazbin Hotel. W nagraniu wykonuję partię Voxa.',
    audioId: 'audio-music-2',
    audioSrc: '/assets/audio/muzyka/once.mp3',
  },
  {
    id: 'track-3',
    num: '03',
    title: 'Hazbin Guarantee (Trust Us) (Polish Cover) - fragment',
    genre: 'Musical - Polski cover utworu z Hazbin Hotel. W nagraniu wykonuję partię Valentino.',
    audioId: 'audio-music-3',
    audioSrc: '/assets/audio/muzyka/guarantee.mp3',
  },
];
