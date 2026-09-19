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
  tulsi: 'radial-gradient(circle at center, #E8F5D0 0%, #78934A 45%, #18240D 100%)',
  rudraksha: 'radial-gradient(circle at center, #8B5A35 0%, #3A2115 50%, #100806 100%)',
  sandalwood: 'radial-gradient(circle at center, #F4D9A6 0%, #B47A3C 45%, #3A2115 100%)',
  sphatik: 'radial-gradient(circle at center, #F5FAFF 0%, #B8D7E8 45%, #526D7A 100%)',
};

export const THEME_COLORS: Record<
  string,
  { isDark: boolean; text: string; watermarkText: string; accent: string; particleColor: string }
> = {
  tulsi: {
    isDark: false,
    text: '#2A1810',
    watermarkText: 'rgba(42, 24, 16, 0.08)',
    accent: '#4C6B28',
    particleColor: '#567A36',
  },
  rudraksha: {
    isDark: true,
    text: '#FFFFFF',
    watermarkText: 'rgba(255, 255, 255, 0.08)',
    accent: '#E5A96A',
    particleColor: '#D97706',
  },
  sandalwood: {
    isDark: false,
    text: '#2A1810',
    watermarkText: 'rgba(42, 24, 16, 0.08)',
    accent: '#8C521F',
    particleColor: '#B47A3C',
  },
  sphatik: {
    isDark: false,
    text: '#2A1810',
    watermarkText: 'rgba(42, 24, 16, 0.08)',
    accent: '#2B5A75',
    particleColor: '#B8D7E8',
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
