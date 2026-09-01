// Dane postaci dubbingowych
export interface VideoClip {
  type: 'youtube' | 'tiktok';
  id: string;
  label?: string;
  url?: string;
}

export interface Character {
  id: string;
  name: string;
  source: string;
  badge: 'fan' | 'official';
  badgeLabel: string;
  imageSrc: string;
  audioId: string;
  audioSrc: string;
  videos?: VideoClip[];
}

export const characters: Character[] = [
  {
    id: 'char-nedward',
    name: 'Nedward',
    source: 'Office Place',
    badge: 'official',
    badgeLabel: 'Oficjalny',
    imageSrc: '/assets/images/characters/nedward.png',
    audioId: 'audio-nedward',
    audioSrc: '/assets/audio/dubbing/nedward.mp3',
    videos: [{ type: 'youtube', id: 'YI0RFfaQoes' }],
  },
  {
    id: 'char-norfeusz',
    name: 'Morpheus',
    source: 'Sunny Side Down',
    badge: 'official',
    badgeLabel: 'Oficjalny',
    imageSrc: '/assets/images/characters/norfeusz2.png',
    audioId: 'audio-norfeusz',
    audioSrc: '/assets/audio/dubbing/Morpheus.mp3',
    videos: [{ type: 'youtube', id: 'b7K3FnTbl2Q' }],
  },
  {
    id: 'char-gojo',
    name: 'Gojo Satoru',
    source: 'Jujutsu Kaisen',
    badge: 'fan',
    badgeLabel: 'Fanowski',
    imageSrc: '/assets/images/characters/gojo.png',
    audioId: 'audio-gojo',
    audioSrc: '/assets/audio/dubbing/gojo.mp3',
    videos: [
      { type: 'youtube', id: 'DyOUaGDTsKU', label: 'Part 1' },
      { type: 'youtube', id: 'brbcpU6WcRk', label: 'Part 2' },
    ],
  },
  {
    id: 'char-morrison',
    name: 'Morrison',
    source: 'Devil May Cry',
    badge: 'fan',
    badgeLabel: 'Fanowski',
    imageSrc: '/assets/images/characters/morrison.png',
    audioId: 'audio-morrison',
    audioSrc: '/assets/audio/dubbing/morrison.mp3',
    videos: [{ type: 'youtube', id: 'TKFx0FZtH-0' }],
  },
  {
    id: 'char-valentino',
    name: 'Valentino',
    source: 'Hazbin Hotel',
    badge: 'fan',
    badgeLabel: 'Fanowski',
    imageSrc: '/assets/images/characters/valentino2.png',
    audioId: 'audio-valentino',
    audioSrc: '/assets/audio/dubbing/valentino.mp3',
    videos: [
      { type: 'youtube', id: '-MjS9PWLr-M' },
      { type: 'tiktok', id: '7583728825956060438' },
    ],
  },
  {
    id: 'char-mordecai',
    name: 'Mordecai',
    source: 'Lackadaisy',
    badge: 'fan',
    badgeLabel: 'Fanowski',
    imageSrc: '/assets/images/characters/mordecai2.png',
    audioId: 'audio-mordecai',
    audioSrc: '/assets/audio/dubbing/mordecai.mp3',
    videos: [{ type: 'youtube', id: 'aoeAhg-DvZU' }],
  },
  {
    id: 'char-tails',
    name: 'Tails',
    source: 'Sonic the Hedgehog',
    badge: 'fan',
    badgeLabel: 'Fanowski',
    imageSrc: '/assets/images/characters/tails.png',
    audioId: 'audio-tails',
    audioSrc: '/assets/audio/dubbing/tails.mp3',
    videos: [{ type: 'youtube', id: '2y0xoPQxdEQ' }],
  },
];
