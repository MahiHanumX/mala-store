export interface MalaProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'Tulsi' | 'Rudraksha' | 'Sandalwood' | 'Sphatik' | 'Kamal Gatta';
  intention: string;
  beadCount: number;
  beadSize: string;
  price: number;
  originalPrice?: number;
  priceFormatted: string;
  originalPriceFormatted?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  mantra: string;
  element: string;
  chakra: string;
  inStock: boolean;
  isBestSeller?: boolean;
  colorHex: string;
  editorialSubtitle: string;
  tagline: string;
  keywords: string;
  quote: string;
  benefits: string[];
}

export const MALA_PRODUCTS: MalaProduct[] = [
  {
    id: 'tulsi-108',
    name: 'Tulsi Mala',
    subtitle: '108 Hand-Carved Vrindavan Tulsi Wood Beads',
    category: 'Tulsi',
    intention: 'Devotion & Purity',
    beadCount: 108,
    beadSize: '8mm',
    price: 1499,
    originalPrice: 1999,
    priceFormatted: '₹1,499',
    originalPriceFormatted: '₹1,999',
    rating: 4.98,
    reviewsCount: 240,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    description: 'Hand-knotted with 108 authentic Vrindavan Holy Basil (Tulsi) wood beads. Tulsi is sacred to Lord Vishnu & Krishna, known to purify spiritual energy, quiet mental chatter, and foster deep emotional peace during daily japa.',
    mantra: 'Om Namo Bhagavate Vasudevaya (ॐ नमो भगवते वासुदेवाय)',
    element: 'Ether & Earth',
    chakra: 'Anahata (Heart Chakra)',
    inStock: true,
    isBestSeller: true,
    colorHex: '#c49a6c',
    editorialSubtitle: 'Rooted in tradition.',
    tagline: 'Natural beads. 108 sacred pieces.',
    keywords: 'PURITY • DEVOTION • PEACE',
    quote: '"Sacred Purity of Vrindavan"',
    benefits: [
      'Purifies energetic body & mind',
      'Quiets mental noise & stress',
      'Fosters divine emotional peace during prayer',
      'Good for Vishnu, Krishna & general Japa',
    ],
  },
  {
    id: 'rudraksha-108',
    name: 'Rudraksha Mala',
    subtitle: '108 Sacred 5-Faced Himalayan Rudraksha Seeds',
    category: 'Rudraksha',
    intention: 'Protection & Meditation',
    beadCount: 108,
    beadSize: '8mm',
    price: 1999,
    originalPrice: 2499,
    priceFormatted: '₹1,999',
    originalPriceFormatted: '₹2,499',
    rating: 4.99,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=1000&q=85',
    description: 'Harvested high in the Himalayas, these 5-faced (Panchmukhi) Rudraksha beads carry deep natural grooves and grounding electromagnetic vibrations. Energized with Vedic chants in Rishikesh.',
    mantra: 'Om Namah Shivaya (ॐ नमः शिवाय)',
    element: 'Fire & Earth',
    chakra: 'Agnya & All 7 Chakras',
    inStock: true,
    isBestSeller: true,
    colorHex: '#6b2d18',
    editorialSubtitle: 'Raw texture.',
    tagline: 'Natural character. Sacred shield.',
    keywords: 'STRENGTH • PROTECTION • FOCUS',
    quote: '"Shield of Sacred Consciousness"',
    benefits: [
      'Emits grounding vibrational frequencies',
      'Shields energetic aura field',
      'Deepens Japa meditation & inner focus',
      'Good for Shiva mantras & spiritual strength',
    ],
  },
  {
    id: 'sandalwood-108',
    name: 'Sandalwood Mala',
    subtitle: '108 Pure Mysore Fragrant Chandan Beads',
    category: 'Sandalwood',
    intention: 'Tranquility & Peace',
    beadCount: 108,
    beadSize: '8mm',
    price: 1799,
    originalPrice: 2299,
    priceFormatted: '₹1,799',
    originalPriceFormatted: '₹2,299',
    rating: 4.96,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    description: 'Crafted from pure fragrant Mysore Sandalwood. Releases a subtle, soothing natural aroma that stills the breath during pranayama, soothing the nervous system and inviting serene stillness.',
    mantra: 'So Hum (सोऽहम् - I Am That)',
    element: 'Earth & Air',
    chakra: 'Muladhara (Root Chakra)',
    inStock: true,
    colorHex: '#d9a768',
    editorialSubtitle: 'Warm.',
    tagline: 'Smooth. Timeless fragrant wood.',
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
    id: 'sphatik-108',
    name: 'Sphatik Mala',
    subtitle: '108 Faceted Pure Crystal Gemstone Beads',
    category: 'Sphatik',
    intention: 'Amplification & Purity',
    beadCount: 108,
    beadSize: '8mm',
    price: 2499,
    originalPrice: 2999,
    priceFormatted: '₹2,499',
    originalPriceFormatted: '₹2,999',
    rating: 4.97,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85',
    description: 'Carved from natural high-clarity Quartz Crystal (Sphatik). Cool to the touch, it dissipates body heat, clears stagnant energetic noise, and amplifies focus for deep meditation.',
    mantra: 'Om Sri Durgaye Namaha (ॐ श्री दुर्गाय नमः)',
    element: 'Light & Water',
    chakra: 'Sahasrara (Crown Chakra)',
    inStock: true,
    colorHex: '#e2f1f8',
    editorialSubtitle: 'Clear.',
    tagline: 'Reflective. Refined crystal radiance.',
    keywords: 'CLARITY • HEALING • PROSPERITY',
    quote: '"A clearer mind leads to a brighter life"',
    benefits: [
      'Brings mental clarity and peace',
      'Helps in healing and emotional balance',
      'Attracts prosperity and success',
      'Good for Goddess Durga, Lakshmi or all mantras',
    ],
  },
  {
    id: 'kamal-gatta-108',
    name: 'Kamal Gatta Mala',
    subtitle: '108 Organic Lotus Seed Mala Beads',
    category: 'Kamal Gatta',
    intention: 'Abundance & Wealth',
    beadCount: 108,
    beadSize: '9mm',
    price: 1599,
    originalPrice: 1999,
    priceFormatted: '₹1,599',
    originalPriceFormatted: '₹1,999',
    rating: 4.94,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    description: 'Naturally dried lotus seeds gathered from sacred waters. Revered in ancient tradition for invoking Lakshmi standard blessings of financial abundance, inner resilience, and spiritual fertility.',
    mantra: 'Om Shreem Mahalakshmiyei Namaha (ॐ श्रीं महालक्ष्म्यै नमः)',
    element: 'Water & Earth',
    chakra: 'Manipura (Solar Plexus)',
    inStock: true,
    colorHex: '#3b2518',
    editorialSubtitle: 'Earthy.',
    tagline: 'Organic. Sacred lotus seeds.',
    keywords: 'STABILITY • WEALTH • SPIRITUAL POWER',
    quote: '"Rooted in nature. Guided by positivity"',
    benefits: [
      'Brings stability and self-discipline',
      'Helps in attracting wealth and success',
      'Enhances spiritual power',
      'Good for Lakshmi, Saraswati or general mantras',
    ],
  }
];
