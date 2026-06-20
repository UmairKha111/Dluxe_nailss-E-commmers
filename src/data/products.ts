import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod-glazed-marshmallow',
    name: 'Glazed Marshmallow Solitaire',
    price: 1199,
    originalPrice: 1499,
    description: 'A glowing, dreamy nude pink base loaded with our signature high-shine pearl chrome glaze. Designed to catch light with every gesture, this minimalist luxury set elevates any outfit with its chic, subtle opulence.',
    features: [
      'Genuine professional salon chrome powder overlay',
      'Ultra-glossy dual gel top coat protection',
      'Perfect for daily wear and corporate styling',
      'Extremely versatile nude hue that mimics natural healthy beds'
    ],
    images: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'nudes',
    shape: 'Almond',
    length: 'Medium',
    color: ['Nude', 'Pink', 'Chrome'],
    occasion: ['Casual', 'Party', 'Bridal'],
    rating: 4.9,
    reviewsCount: 42,
    badges: ['Best Seller'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-rose-petal-bridal',
    name: 'Ethereal Rose Petal Bridal',
    price: 1899,
    originalPrice: 2499,
    description: 'Our crown jewel design crafted for brides and festive events. Featuring custom hand-molded 3D rose petals in acrylic, set alongside genuine flat-back Swarowski replica crystals and luxury delicate gold foliage on a translucent high-gloss pink base.',
    features: [
      'Individually sculpted 3D acrylic flower petals',
      'Micro-pave stone placements secured with heavy-duty charm gel',
      'Premium rose-gold and gold-foil flakes',
      'Completely waterproof, durable, and event-ready'
    ],
    images: [
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'bridal',
    shape: 'Almond',
    length: 'Long',
    color: ['Pink', 'Gold', 'White', 'Rose Gold'],
    occasion: ['Bridal', 'Festival', 'Party'],
    rating: 5.0,
    reviewsCount: 28,
    badges: ['New', 'Limited Edition'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-minimalist-french',
    name: 'Classic Minimalist French Tip',
    price: 999,
    originalPrice: 1299,
    description: 'The epitome of high-class sophistication. Designed with a flawless custom pale blush-beige foundation and finished with razor-sharp micro lines in custom off-white. This classic French Tip looks so neat and clean that nobody will think they are press-ons.',
    features: [
      'Hand-painted precision tip outlines',
      'Natural-looking pink-to-nude nail bed camouflage',
      'Tapered custom structure for a modern sleek silhouette',
      '100% scratch-resistant UV gloss sealer'
    ],
    images: [
      'https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'french',
    shape: 'Square',
    length: 'Short',
    color: ['Nude', 'White'],
    occasion: ['Casual', 'Party'],
    rating: 4.8,
    reviewsCount: 65,
    badges: ['Trending'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-cat-eye-cosmo',
    name: 'Cat-Eye Velvet Cosmo',
    price: 1399,
    originalPrice: 1799,
    description: 'An otherworldly, hypnotic set containing deep intergalactic purple gel bases magnet-pulled to create a velvet satin reflection. Watch the dust shift from a dusty orchid-pink to deep star-cloud violet depending on your movement and illumination.',
    features: [
      'Premium Japanese magnetic velvet cat-eye gel system',
      'Mesmerizing holographic multi-dimensional shift',
      'Reinforced core layer for ultra-durable wear',
      'High-gloss salon finish that does not chip or wash off'
    ],
    images: [
      'https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'cat-eye',
    shape: 'Coffin',
    length: 'Long',
    color: ['Purple', 'Lilac', 'Chrome'],
    occasion: ['Party', 'Festival'],
    rating: 4.9,
    reviewsCount: 31,
    badges: ['Limited Edition'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-emerald-jade-chrome',
    name: 'Emerald Jade Chrome Velvet',
    price: 1499,
    originalPrice: 1899,
    description: 'Deep, luxurious emerald jade green coupled with metallic gold veins hand-painted on key accent nails. Infused with a micro-fine golden cat-eye aura that glows with an organic, gemstone-like depth.',
    features: [
      'True velvet cat-eye shimmer embedded within real gel layers',
      'Elegant textured metallic gold veins that feel raised to touch',
      'Stunning jewel-toned design optimized for festive events and evenings',
      'Handcrafted using 4-step professional high-build overlay'
    ],
    images: [
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'cat-eye',
    shape: 'Coffin',
    length: 'Medium',
    color: ['Green', 'Gold'],
    occasion: ['Festival', 'Party', 'Bridal'],
    rating: 4.7,
    reviewsCount: 19,
    badges: ['Trending'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-espresso-swirl',
    name: 'Espresso Swirl & Pearl',
    price: 1299,
    originalPrice: 1699,
    description: 'Delectable shades of coffee, cream, caramel and rich cocoa swirled together into a bespoke marble design. Highlighted with luxury high-gloss brown French arches and pinned with mini organic freshwater-style cream nail pearls.',
    features: [
      'Nude caramel base with multi-toned espresso swirls',
      'Carefully secured micro pearls that do not snag hair or fabric',
      'Exquisite luxury modern design for fashion curation',
      'Individually structured using hard-gel reinforcement'
    ],
    images: [
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'statement-art',
    shape: 'Oval',
    length: 'Medium',
    color: ['Brown', 'Nude', 'White'],
    occasion: ['Casual', 'Party'],
    rating: 5.0,
    reviewsCount: 14,
    badges: ['New'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-lavender-cloud',
    name: 'Muted Lavender Cloud Gloss',
    price: 1099,
    originalPrice: 1399,
    description: 'A soothing, understated lavender-indigo hue blended with cool milk-white clouds. Half-velvent matte and half ultra-glossy finishes play together to give this modern set a super-smooth minimalist tactile sensory feel.',
    features: [
      'Sleek modern muted lilac pastel tones',
      'Hand-blended micro cloud smoke design',
      'Soft-touch premium coating that does not collect scuffs',
      'Perfect for daily casual outfits or casual dating'
    ],
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'nudes',
    shape: 'Round',
    length: 'Short',
    color: ['Lavender', 'White'],
    occasion: ['Casual'],
    rating: 4.6,
    reviewsCount: 22,
    badges: ['Sale'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  },
  {
    id: 'prod-gold-flakes-marble',
    name: 'Opulent Golden Flakes & Marble',
    price: 1599,
    originalPrice: 2199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'statement-art',
    shape: 'Coffin',
    length: 'Medium',
    color: ['White', 'Gold', 'Grey'],
    occasion: ['Festival', 'Party', 'Bridal'],
    rating: 4.9,
    reviewsCount: 50,
    badges: ['Best Seller'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  }
];
