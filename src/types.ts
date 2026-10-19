export interface SubtitleCard {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  lines: [string] | [string, string]; // Max two lines per card as required
}

export interface Beat {
  id: number;
  label: string; // e.g., "0-6s"
  startTime: number;
  endTime: number;
  title: string;
  narration: string; // Friendly spoken English with contractions, max 12 words
  wordCount: number;
  subtitles: SubtitleCard[];
  visualDirection: string;
  cameraMovement: string;
  onScreenStickers: string[];
  audioCue: string;
  culturalFact: string;
  sceneTheme: 'intro' | 'palace' | 'rental' | 'friends' | 'adventure';
}

export type SocialPlatform = 'tiktok' | 'reels' | 'shorts';
export type ViewTab = 'player' | 'storyboard' | 'editor' | 'guide';
