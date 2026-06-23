import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'Rich energy',
    name: ' Rich energy',
    price: 799,
    originalPrice: 1499,
    description: 'A glowing, dreamy nude pink base loaded with our signature high-shine pearl chrome glaze. Designed to catch light with every gesture, this minimalist luxury set elevates any outfit with its chic, subtle opulence.',
    features: [
      'Genuine professional salon chrome powder overlay',
      'Ultra-glossy dual gel top coat protection',
      'Perfect for daily wear and corporate styling',
      'Extremely versatile nude hue that mimics natural healthy beds'
    ],
    images: [
      'https://i.ibb.co/ymrYZpmL/b5bb5bdd-94c5-4223-a99a-3a6024d5ff5e.jpg',
      // 'blob:https://web.whatsapp.com/b5bb5bdd-94c5-4223-a99a-3a6024d5ff5e',
      // 'blob:https://web.whatsapp.com/b5bb5bdd-94c5-4223-a99a-3a6024d5ff5e'
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
    price: 999,
    originalPrice: 1499,
    description: 'Our crown jewel design crafted for brides and festive events. Featuring custom hand-molded 3D rose petals in acrylic, set alongside genuine flat-back Swarowski replica crystals and luxury delicate gold foliage on a translucent high-gloss pink base.',
    features: [
      'Individually sculpted 3D acrylic flower petals',
      'Micro-pave stone placements secured with heavy-duty charm gel',
      'Premium rose-gold and gold-foil flakes',
      'Completely waterproof, durable, and event-ready'
    ],
    images: [
      'https://i.ibb.co/vCm4F0Kd/a4b63b93-2aa9-4f91-92d9-7e875c35d22e.jpg',
      // 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop'
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
    price: 799,
    originalPrice: 1099,
    description: 'The epitome of high-class sophistication. Designed with a flawless custom pale blush-beige foundation and finished with razor-sharp micro lines in custom off-white. This classic French Tip looks so neat and clean that nobody will think they are press-ons.',
    features: [
      'Hand-painted precision tip outlines',
      'Natural-looking pink-to-nude nail bed camouflage',
      'Tapered custom structure for a modern sleek silhouette',
      '100% scratch-resistant UV gloss sealer'
    ],
    images: [
      'https://i.ibb.co/1YP2XLPc/7efc3ac0-86c3-4f0a-a31a-85c0696bcdf7.jpg',
      // 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=600&auto=format&fit=crop'
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
    price: 799,
    originalPrice: 1099,
    description: 'An otherworldly, hypnotic set containing deep intergalactic purple gel bases magnet-pulled to create a velvet satin reflection. Watch the dust shift from a dusty orchid-pink to deep star-cloud violet depending on your movement and illumination.',
    features: [
      'Premium Japanese magnetic velvet cat-eye gel system',
      'Mesmerizing holographic multi-dimensional shift',
      'Reinforced core layer for ultra-durable wear',
      'High-gloss salon finish that does not chip or wash off'
    ],
    images: [
      'https://i.ibb.co/5WwYs2Nr/4afa9bfc-e4b7-4fe6-8418-83a75513dfa8.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop'
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
    price: 749,
    originalPrice: 1199,
    description: 'Deep, luxurious emerald jade green coupled with metallic gold veins hand-painted on key accent nails. Infused with a micro-fine golden cat-eye aura that glows with an organic, gemstone-like depth.',
    features: [
      'True velvet cat-eye shimmer embedded within real gel layers',
      'Elegant textured metallic gold veins that feel raised to touch',
      'Stunning jewel-toned design optimized for festive events and evenings',
      'Handcrafted using 4-step professional high-build overlay'
    ],
    images: [
      'https://i.ibb.co/9mkV1sZC/81617dd2-8c2a-4fe4-9454-f508d8a55369.jpg',
      // 'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop'
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
    price: 799,
    originalPrice: 1099,
    description: 'Delectable shades of coffee, cream, caramel and rich cocoa swirled together into a bespoke marble design. Highlighted with luxury high-gloss brown French arches and pinned with mini organic freshwater-style cream nail pearls.',
    features: [
      'Nude caramel base with multi-toned espresso swirls',
      'Carefully secured micro pearls that do not snag hair or fabric',
      'Exquisite luxury modern design for fashion curation',
      'Individually structured using hard-gel reinforcement'
    ],
    images: [
      'https://i.ibb.co/qF9wnpNM/ee1f5a78-eb14-45f0-8f91-2163b6d8e3b0.jpg',
      // 'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop'
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
    price: 799,
    originalPrice: 1099,
    description: 'A soothing, understated lavender-indigo hue blended with cool milk-white clouds. Half-velvent matte and half ultra-glossy finishes play together to give this modern set a super-smooth minimalist tactile sensory feel.',
    features: [
      'Sleek modern muted lilac pastel tones',
      'Hand-blended micro cloud smoke design',
      'Soft-touch premium coating that does not collect scuffs',
      'Perfect for daily casual outfits or casual dating'
    ],
    images: [
      'https://i.ibb.co/jk4hJbB4/c285a921-347f-4f82-a756-7261a60603df.jpg',
      // 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
    id: 'Party vibes',
    name: 'Party vibes',
    price: 799,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/Kj9kqmH4/566bf088-f133-4d0e-a703-86cc39495c4f.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  },
  {
  id: 'Beach nails',
    name: 'Beach nails',
    price: 799,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/ksHTqL6b/c7c7920c-6670-4de4-8640-2faca3f483b2.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'statement-art',
    shape: 'Coffin',
    length: 'Medium',
    color: ['White', 'Gold', 'Grey'],
    occasion: ['Festival', 'Party', 'Bridal'],
    rating: 4.9,
    reviewsCount: 15,
    badges: ['Best Seller'],
    sizes: ['XS', 'S', 'M', 'L', 'Custom'],
    isAvailable: true
  }
  ,
   {
  id: 'Soft summer set',
    name: 'Soft summer set',
    price: 799,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/5xBbH6xb/0834c078-78c9-48c5-8e2e-b8794cabe394.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Premium cateye',
    name: 'Premium cateye',
    price: 799,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/cSgjH2QM/cfe594f5-2a57-467f-9dc2-b9e1f6eb8aa3.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Bold shades',
    name: 'Bold shades',
    price: 749,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/LzsQPnMk/d9e87cb1-f4a4-489c-89a2-0ee4609abdf0.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Classy white with gold chrome',
    name: 'Classy white with gold chrome',
    price: 699,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/XrRykQQt/2d21fa32-ddb8-4cc5-a5e9-ebce0583b73f.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Spider nails',
    name: 'Spider nails',
    price: 799,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/Dg17CrJH/82b2fcb4-d77f-4d40-b007-1b5477b67cf5.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Summer vibes',
    name: 'Summer vibes',
    price: 749,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/VFLC3YD/ead25afa-349b-48a2-ae31-927593bb4f3b.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  , 
  {
  id: 'Summer nails',
    name: 'Summer nails',
    price: 899,
    originalPrice: 1149,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/DDH2y1Gf/1b329673-e5e6-43e8-aa01-6d48baea924c.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Cherry noir',
    name: 'Cherry noir',
    price: 849,
    originalPrice: 949,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/xKBjNVD4/70c89c12-d447-413c-bcb3-70f8ddbf2b83.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Baddie vibes',
    name: 'Baddie vibes',
    price: 799,
    originalPrice: 1199,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/7tBKTC17/be151e5b-45b3-4fdd-82f1-62483dbe29b4.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Summer nails',
    name: 'Summer nails',
    price: 1199,
    originalPrice: 1549,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/S4QGxvCL/90dbcf67-4fe8-4eda-b06b-4f2286d6e54d.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Cherry noir',
    name: 'Cherry noir',
    price: 849,
    originalPrice: 999,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/Jj7MDFXk/26f7b166-08fc-4cc3-a24c-04cf72982114.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Summer nails',
    name: 'Summer nails',
    price: 899,
    originalPrice: 999,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/DDH2y1Gf/1b329673-e5e6-43e8-aa01-6d48baea924c.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Vintage bloom',
    name: 'Vintage bloom',
    price: 799,
    originalPrice: 999,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/tpZdkKSh/15fb44e1-c45b-4928-bf78-a9fdf7d33bc4.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Beach nails',
    name: 'Beach nails',
    price: 999,
    originalPrice: 1299,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/Mx57qNXY/367059a1-2161-4c1a-ab3d-a129250783a0.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Summer nails',
    name: 'Summer nails',
    price: 1499,
    originalPrice: 1849,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/Z638WDJC/0b15a7a6-cc1b-4c9a-ab72-30f0ef45da6c.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Celestial clover',
    name: 'Celestial clover',
    price: 749,
    originalPrice: 999,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/3mKNGKdn/431163b2-ab74-4e45-adad-258ac990d373.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Bold cateye with chrome',
    name: 'Bold cateye with chrome',
    price: 699,
    originalPrice: 1049,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/WWCMJC5C/ca79502e-2b3c-43f8-8b55-49dd1de87788.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Baddie vibes',
    name: 'Baddie vibes',
    price: 799,
    originalPrice: 899,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/SDVqgwKG/2725c6d8-b9f6-4a45-bc9b-7fdb1c9a53c6.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Beach nails',
    name: 'Beach nails',
    price: 749,
    originalPrice: 1049,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/KpMLky0S/75c99e7b-8fe1-4c94-8423-69d1fef094b5.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
   {
  id: 'Soft pastel color set',
    name: 'Soft pastel color set',
    price: 899,
    originalPrice: 1100,
    description: 'A genuine luxury statement set inspired by premium Calacatta gold veins. High-gloss pristine milky white is combined with smoky grey quartz marbling, embellished with real gold foil sheets and metallic outlines.',
    features: [
      'Complex custom hand-drawn marble ribbons',
      'Genuine 24K color gold-leaf flake layers under the gel',
      'Reinforced acrylic core with premium glass-like glow',
      'Highly requested for cocktail functions and family events'
    ],
    images: [
      'https://i.ibb.co/FL2WKYL0/222dfed8-cfe0-442b-a2f6-bcbb4d737c75.jpg',
      // 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
      // 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop'
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
  ,
];
