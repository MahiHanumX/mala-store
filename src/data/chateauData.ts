export interface MalaItem {
  id: string;
  type: 'tulsi' | 'rudraksha' | 'sandalwood' | 'sphatik';
  name: string;
  watermark: string;
  subtitle: string;
  description: string;
  image: string;
  price: number;
  priceFormatted: string;
  beadCount: number;
  mantra: string;
  keywords: string;
  quote: string;
  benefits: string[];
}

export const GRADIENTS: Record<string, string> = {
  tulsi: 'radial-gradient(circle at center, #F4FCE3 0%, #C0E862 45%, #5B8C16 100%)',
  rudraksha: 'radial-gradient(circle at center, #FFF4EC 0%, #F5B088 45%, #C85A28 100%)',
  sandalwood: 'radial-gradient(circle at center, #FFFBF0 0%, #F5D7A1 45%, #C88A32 100%)',
  sphatik: 'radial-gradient(circle at center, #F0F9FF 0%, #BAE6FD 45%, #38BDF8 100%)',
};

export const THEME_COLORS: Record<
  string,
  { isDark: boolean; text: string; watermarkText: string; accent: string; particleColor: string }
> = {
  tulsi: {
    isDark: false,
    text: '#2A4206',
    watermarkText: 'rgba(42, 66, 6, 0.10)',
    accent: '#5B8C16',
    particleColor: '#8CBF26',
  },
  rudraksha: {
    isDark: false,
    text: '#4D1C08',
    watermarkText: 'rgba(77, 28, 8, 0.10)',
    accent: '#C85A28',
    particleColor: '#F58A54',
  },
  sandalwood: {
    isDark: false,
    text: '#4A3008',
    watermarkText: 'rgba(74, 48, 8, 0.10)',
    accent: '#C88A32',
    particleColor: '#E6B055',
  },
  sphatik: {
    isDark: false,
    text: '#0C4A6E',
    watermarkText: 'rgba(12, 74, 110, 0.10)',
    accent: '#0284C7',
    particleColor: '#7DD3FC',
  },
};

export const MALAS: MalaItem[] = [
  {
    id: 'tulsi',
    type: 'tulsi',
    name: 'TULSI',
    watermark: 'TULSI',
    subtitle: 'Sacred Purity.\nTimeless Devotion.',
    description:
      'Handcrafted Tulsi beads with a naturally\ncalm and devotional character.\n\nA traditional mala for prayer, meditation,\nand spiritual practice.',
    image: '/images/tulsi-mala.jpg',
    price: 1499,
    priceFormatted: '₹1,499',
    beadCount: 108,
    mantra: 'Om Namo Bhagavate Vasudevaya (ॐ नमो भगवते वासुदेवाय)',
    keywords: 'PURITY • DEVOTION • PEACE',
    quote: '"Sacred Purity of Vrindavan"',
    benefits: [
      'Purifies energetic body & mind',
      'Quiets mental noise & stress',
      'Fosters divine emotional peace during prayer',
      'Good for Krishna, Vishnu & general Japa',
    ],
  },
  {
    id: 'rudraksha',
    type: 'rudraksha',
    name: 'RUDRAKSHA',
    watermark: 'RUDRAKSHA',
    subtitle: 'Ancient Energy.\nPowerful Presence.',
    description:
      'Authentic Rudraksha beads with a\nraw, natural texture and sacred heritage.\n\nA timeless symbol of meditation,\ndiscipline, and devotion.',
    image: '/images/rudraksha-mala.jpg',
    price: 1999,
    priceFormatted: '₹1,999',
    beadCount: 108,
    mantra: 'Om Namah Shivaya (ॐ नमः शिवाय)',
    keywords: 'STRENGTH • PROTECTION • FOCUS',
    quote: '"Shield of Sacred Consciousness"',
    benefits: [
      'Emits grounding vibrational frequencies',
      'Shields energetic aura field',
      'Deepens Japa meditation & focus',
      'Good for Shiva mantras & inner strength',
    ],
  },
  {
    id: 'sandalwood',
    type: 'sandalwood',
    name: 'SANDALWOOD',
    watermark: 'CHÂTEAU',
    subtitle: 'Earthy Warmth.\nQuiet Serenity.',
    description:
      'Smooth sandalwood beads with a\nwarm natural tone and subtle character.\n\nCrafted for peaceful meditation,\nprayer, and mindful moments.',
    image: '/images/sandalwood-mala.jpg',
    price: 1799,
    priceFormatted: '₹1,799',
    beadCount: 108,
    mantra: 'So Hum (सोऽहम् - I Am That)',
    keywords: 'CALMNESS • WISDOM • POSITIVITY',
    quote: '"Good Thoughts, Good Life"',
    benefits: [
      'Keeps the mind calm',
      'Enhances focus and clarity',
      'Attracts positive energy',
      'Good for mantras and meditation',
    ],
  },
  {
    id: 'sphatik',
    type: 'sphatik',
    name: 'SPHATIK',
    watermark: 'SPHATIK',
    subtitle: 'Crystal Clarity.\nPure Elegance.',
    description:
      'Naturally translucent Sphatik beads\nwith a refined crystalline appearance.\n\nA beautiful companion for meditation,\nprayer, and spiritual practice.',
    image: '/images/sphatik-mala.jpg',
    price: 2499,
    priceFormatted: '₹2,499',
    beadCount: 108,
    mantra: 'Om Sri Durgaye Namaha (ॐ श्री दुर्गाय नमः)',
    keywords: 'CLARITY • HEALING • PROSPERITY',
    quote: '"A clearer mind leads to a brighter life"',
    benefits: [
      'Brings mental clarity and peace',
      'Helps in healing and emotional balance',
      'Attracts prosperity and success',
      'Good for Goddess Durga, Lakshmi or all mantras',
    ],
  },
];
