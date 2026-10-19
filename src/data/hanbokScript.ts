import { Beat } from '../types';

export const INITIAL_BEATS: Beat[] = [
  {
    id: 1,
    label: '0-6s',
    startTime: 0,
    endTime: 6,
    title: 'The Hook & Reimagining Hanbok',
    // 12 words (<= 12 max). Friendly, contractions: "Hanbok's", "It's". Explains Hanbok: "Korea's traditional outfit".
    narration: "Think Hanbok's just Korea's traditional outfit? It's actually way deeper than that.",
    wordCount: 12,
    subtitles: [
      {
        id: 'sub-1a',
        startTime: 0,
        endTime: 6,
        lines: [
          "Think Hanbok's just Korea's traditional outfit?",
          "It's actually way deeper than that."
        ]
      }
    ],
    visualDirection: 'Hook shot: An international university student at a campus crossroads in Seoul, adjusting a contemporary silk collar with a knowing smile toward the camera, transitioning into a slow-motion silhouette.',
    cameraMovement: 'Fast push-in starting from a bustling Seoul street to a close-up profile, followed by a dramatic soft-focus tilt.',
    onScreenStickers: ['MORE THAN JUST CLOTHES ✨', 'HANBOK DECODED 🇰🇷'],
    audioCue: 'Gentle vinyl crackle breaking into a rhythmic modern Gayageum beat.',
    culturalFact: "Hanbok (한복) literally translates to 'Korean clothing'. But historically, it was never treated as a costume—it was a philosophy of lifestyle, dignity, and bodily freedom.",
    sceneTheme: 'intro'
  },
  {
    id: 2,
    label: '6-12s',
    startTime: 6,
    endTime: 12,
    title: 'The Philosophy of Flowing Curves',
    // 12 words (<= 12 max). Friendly, contractions: "aren't", "they're", "nature's".
    narration: "The loose curves aren't restrictive—they're shaped to move with nature's breeze.",
    wordCount: 12,
    subtitles: [
      {
        id: 'sub-2a',
        startTime: 6,
        endTime: 12,
        lines: [
          "The loose curves aren't restrictive—",
          "they're shaped to move with nature's breeze."
        ]
      }
    ],
    visualDirection: 'Macro slow-motion detail of the sleeve (Baerae) billowing gently in the Seoul wind. The garment creates air pockets rather than clinging to the skin, showing natural ease and breathability.',
    cameraMovement: 'Smooth gliding orbit around the billowing silk chima skirt as sunlight filters through the translucent fabric layers.',
    onScreenStickers: ['NATURE IN MOTION 🍃', 'ZERO RESTRICTION ☁️'],
    audioCue: 'Soft wind chime breath layered with an organic acoustic bass drop.',
    culturalFact: "Unlike historical European corsetry or tight tailored garments, Hanbok creates generous volume. Its signature curved lines (Baerae) mimic the gentle slopes of Korean mountain ridges and traditional Hanok roof eaves.",
    sceneTheme: 'palace'
  },
  {
    id: 3,
    label: '12-18s',
    startTime: 12,
    endTime: 18,
    title: 'Color as Philosophy: Obangsaek',
    // 12 words (<= 12 max).
    narration: "Each color tells a story, balancing five natural elements and personal harmony.",
    wordCount: 12,
    subtitles: [
      {
        id: 'sub-3a',
        startTime: 12,
        endTime: 18,
        lines: [
          'Each color tells a story,',
          'balancing five natural elements and harmony.'
        ]
      }
    ],
    visualDirection: 'Vibrant color montage showing the five fundamental hues (Obangsaek): deep indigo blue, crimson red, radiant yellow, pure white, and jet black, overlaid with silk embroidery textures.',
    cameraMovement: 'Quick dynamic whip-pans between different jewel-toned fabric bolts and delicate norigae tassel ornaments.',
    onScreenStickers: ['5 ELEMENTS OF NATURE 🎨', 'COLORS HAVE MEANING 🔮'],
    audioCue: 'Crisp string pluck resonance climbing up the pentatonic scale.',
    culturalFact: "Traditional Korean color theory (Obangsaek) links blue (wood/east), red (fire/south), yellow (earth/center), white (metal/west), and black (water/north). Wearing them represented harmony with the universe and protection.",
    sceneTheme: 'rental'
  },
  {
    id: 4,
    label: '18-24s',
    startTime: 18,
    endTime: 24,
    title: 'Modern Campus Life & Living Culture',
    // 12 words (<= 12 max).
    narration: "Students wear modernized styles today to connect heritage with everyday campus life.",
    wordCount: 12,
    subtitles: [
      {
        id: 'sub-4a',
        startTime: 18,
        endTime: 24,
        lines: [
          'Students wear modernized styles today',
          'to connect heritage with everyday life.'
        ]
      }
    ],
    visualDirection: 'Real university campus scene (Sinchon / Anam): students in modern cropped Hanbok jackets (Jeogori) paired with denim, stylish sneakers, and laptop tote bags, walking between university lecture halls and coffee shops.',
    cameraMovement: 'Casual handheld tracking shot keeping pace with laughing students walking together on campus.',
    onScreenStickers: ['MODERN DAILY HANBOK 👟', 'CAMPUS STREET STYLE 📚'],
    audioCue: 'Upbeat lo-fi drum groove kicks in with energetic modern snare.',
    culturalFact: "Modern Hanbok (생활한복, Saenghwal Hanbok) is a booming trend among Korean youth and university students, blending traditional overlap collars and knot buttons with machine-washable cotton and modern streetwear cuts.",
    sceneTheme: 'friends'
  },
  {
    id: 5,
    label: '24-30s',
    startTime: 24,
    endTime: 30,
    title: 'The Belonging Call to Action',
    // 11 words (<= 12 max). Friendly, contractions: "won't", "you'll".
    narration: "When you study here, you won't just wear it—you'll belong.",
    wordCount: 11,
    subtitles: [
      {
        id: 'sub-5a',
        startTime: 24,
        endTime: 30,
        lines: [
          "When you study here, you won't just wear it—",
          "you'll truly belong."
        ]
      }
    ],
    visualDirection: 'Golden sunset over Seoul skyline: an international student stands with friends in Hanbok laughing warmly, looking directly into the camera with an open, welcoming gesture as the city lights illuminate.',
    cameraMovement: 'Cinematic pull-back crane movement revealing the harmony of historical Bukchon rooftops and modern Seoul skyscrapers.',
    onScreenStickers: ['YOUR SEOUL STORY 🇰🇷', 'YOU BELONG HERE 🌸'],
    audioCue: 'Uplifting warm acoustic crescendo resolving on a resonant harmonic chord.',
    culturalFact: "Korean culture warmly welcomes international students who participate in Hanbok traditions. Palaces offer 100% free admission to anyone wearing Hanbok, and universities hold cross-cultural exchange festivals celebrating this shared pride.",
    sceneTheme: 'adventure'
  }
];

export const PHILOSOPHY_SECTIONS = [
  {
    title: 'Form Follows Nature (자연주의)',
    korean: '자연의 곡선',
    summary: 'The human body is never forced to fit the garment; the garment breathes with the body.',
    description: 'Unlike western historical tailoring which used stays and corsets to reshape the silhouette, Hanbok embraces flat-plane tailoring (평면재단) that drapes organically. The curved Baerae sleeves echo the gentle ridgelines of Korean mountains and Hanok roof tiles.'
  },
  {
    title: 'The Five Elements (오방색, Obangsaek)',
    korean: '오방색의 지혜',
    summary: 'Colors are not mere decorations—they are symbolic wishes for cosmic balance.',
    description: 'Rooted in Yin-Yang and the Five Elements theory: Blue represents Wood, East, and Spring; Red represents Fire, South, and Passion; Yellow represents Earth, Center, and Sovereignty; White represents Metal, West, and Purity; Black represents Water, North, and Wisdom.'
  },
  {
    title: 'Saenghwal Hanbok: A Living Tradition',
    korean: '생활한복과 청춘',
    summary: 'Not a museum artifact, but an evolving medium of daily youth identity.',
    description: 'Korean university campuses frequently see students styling casual jeogori jackets over turtlenecks, or pleated chima skirts with Doc Martens. It represents a proud, effortless bridge between ancestral heritage and modern youth fashion.'
  },
  {
    title: 'Universal Welcome & Palace Privilege',
    korean: '모두를 위한 한복',
    summary: 'Anyone of any background who wears Hanbok is welcomed as part of the cultural tapestry.',
    description: "Seoul's grand palaces (Gyeongbokgung, Changdeokgung, Deoksugung, Changgyeonggung) grant free admission to anyone wearing Hanbok. Locals genuinely celebrate foreigners who wear it with respect and joy."
  }
];
