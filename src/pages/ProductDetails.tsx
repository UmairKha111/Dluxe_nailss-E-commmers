import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Layers, Check, Sparkles, MessageCircle, ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ProductCard } from '../components/products/ProductCard';
 
export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, addToRecentlyViewed, recentlyViewed } = useCart();
 
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'application' | 'shipping'>('details');
 
  // ✅ FIX: Only 'id' in dependency array — addToRecentlyViewed removed
  // Previously, addToRecentlyViewed was listed as a dependency. Every time cart
  // updated (e.g. on addToCart), CartProvider re-rendered and created a new
  // addToRecentlyViewed reference, which triggered this useEffect again,
  // resetting product state and interrupting navigation to /checkout.
  useEffect(() => {
    if (id) {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setActiveImageIdx(0);
        setSelectedSize('M');
        setSelectedShape(found.shape);
        setSelectedLength(found.length);
        setQuantity(1);
        setJustAdded(false);
        addToRecentlyViewed(found.id);
      } else {
        setProduct(products[0]);
      }
    }
  }, [id]); // ✅ Only 'id' here — stable now
 
  if (!product) {
    return (
      <div className="py-24 text-center text-xs text-stone-500 font-mono">
        Loading luxury product records...
      </div>
    );
  }
 
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedShape, selectedLength);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2500);
  };
 
  // ✅ This now works correctly — cart updates, but useEffect no longer re-runs
  // so product state is NOT reset and navigate('/checkout') executes cleanly
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedShape, selectedLength);
    navigate('/checkout');
  };
 
  // Filter recently viewed ids to actual products, excluding active
  const recentProductsList = recentlyViewed
    .map((rvId) => products.find((p) => p.id === rvId))
    .filter((p): p is Product => p !== undefined && p.id !== product.id)
    .slice(0, 4);
 
  // Filter related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
 
  const isWishlisted = wishlist.includes(product.id);
 
  return (
    <div id="product-details-container" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-16">
      
      {/* Back button */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-stone-500 hover:text-luxury-charcoal transition"
        >
          <ArrowLeft size={13} />
          <span>Back to All Collections</span>
        </Link>
      </div>
 
      {/* CORE INFO COLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Col: Image Gallery (Span 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square overflow-hidden bg-luxury-beige-100 border border-luxury-beige-300 rounded shadow-xs">
            
            {/* Wishlist Heart action button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white text-stone-500 hover:text-red-500 hover:scale-105 active:scale-95 shadow-md transition-all"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
            </button>
 
            {/* Badges overlay */}
            {product.badges && product.badges.length > 0 && (
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className="bg-luxury-charcoal text-white text-[9px] uppercase tracking-[0.2em] font-mono font-bold px-2.5 py-1 rounded shadow"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
 
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover text-[10px]"
            />
          </div>
 
          {/* Gallery Thumbnails List */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`w-16 h-16 rounded overflow-hidden border-2 transition ${
                  idx === activeImageIdx ? 'border-luxury-gold bg-stone-50 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`thumbnail ${idx}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
 
          <div className="bg-luxury-beige-200/60 border border-luxury-beige-300 rounded p-4 flex items-center space-x-3 text-xs tracking-wide">
            <span className="p-2 bg-white rounded-full text-luxury-gold">
              <Sparkles size={16} />
            </span>
            <p className="text-stone-700 leading-normal">
              <strong>Premium Artist Box</strong>: Each set includes raw structural acrylic tips, curated double-layer base coatings, custom detail paints, and a 6-pc preparation toolkit free.
            </p>
          </div>
        </div>
 
        {/* Right Col: Customizer Details (Span 6) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-[0.25em] block">
              {product.category} Series
            </span>
            <h1 className="text-2xl md:text-3.5xl font-serif font-bold text-luxury-charcoal leading-tight tracking-wide">
              {product.name}
            </h1>
 
            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-200'}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-stone-500">
                {product.rating} / 5.0 ({product.reviewsCount} customer reviews)
              </span>
            </div>
          </div>
 
          {/* Price Box */}
          <div className="bg-luxury-beige-200/50 p-4 border border-luxury-beige-300 rounded flex items-baseline space-x-3">
            <span className="text-3xl font-mono font-bold text-luxury-charcoal">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through text-stone-400 font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-xs text-red-650 bg-red-50 border border-red-105 px-2 py-0.5 rounded font-mono font-bold">
                SAVE ₹{product.originalPrice - product.price} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
              </span>
            )}
          </div>
 
          <p className="text-xs text-stone-605 leading-relaxed">
            {product.description}
          </p>
 
          {/* CUSTOMIZER SELECTIONS Grid */}
          <div className="space-y-4 pt-4 border-t border-stone-200/75">
            {/* Shapes selection slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span>1. Customize Shape:</span>
                <span className="text-luxury-gold font-mono uppercase text-[10px]">{selectedShape} Shape</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Almond', 'Square', 'Coffin', 'Stiletto', 'Round', 'Oval'].map((shapeOpt) => (
                  <button
                    key={shapeOpt}
                    onClick={() => setSelectedShape(shapeOpt)}
                    className={`text-[11px] font-medium px-4 py-1.5 rounded-full border transition ${
                      selectedShape === shapeOpt
                        ? 'bg-luxury-charcoal text-white border-luxury-charcoal shadow-sm'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                    }`}
                  >
                    {shapeOpt}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Length selectors */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span>2. Customize Length:</span>
                <span className="text-luxury-gold font-mono uppercase text-[10px]">{selectedLength} length</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Short', 'Medium', 'Long', 'Extra Long'].map((lenOpt) => (
                  <button
                    key={lenOpt}
                    onClick={() => setSelectedLength(lenOpt)}
                    className={`text-[11px] font-medium px-4 py-1.5 rounded-full border transition ${
                      selectedLength === lenOpt
                        ? 'bg-luxury-charcoal text-white border-luxury-charcoal shadow-sm'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                    }`}
                  >
                    {lenOpt}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Standard Sizes parameters with prompt size chart helper link */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="flex items-center space-x-1">
                  <span>3. Choose Sizing Box:</span>
                  <Link to="/about" className="text-[10px] text-luxury-gold hover:underline font-mono">
                    (Millimeter charts)
                  </Link>
                </span>
                <span className="text-stone-500 font-mono text-[10px]">Active Box: {selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes?.map((szOpt) => (
                  <button
                    key={szOpt}
                    onClick={() => setSelectedSize(szOpt)}
                    className={`w-12 h-9 text-xs font-bold rounded font-mono border transition ${
                      selectedSize === szOpt
                        ? 'bg-luxury-gold text-white border-luxury-gold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-650 hover:border-luxury-beige-400'
                    }`}
                  >
                    {szOpt}
                  </button>
                ))}
              </div>
              <div className="bg-luxury-beige-100 p-2.5 rounded border border-luxury-beige-200 text-[10px] text-stone-500 italic mt-2 font-mono">
                {selectedSize === 'XS' && 'Fits: Thumb 14mm · Index 10mm · Middle 11mm · Ring 10mm · Pinky 8mm'}
                {selectedSize === 'S' && 'Fits: Thumb 15mm · Index 11mm · Middle 12mm · Ring 11mm · Pinky 9mm'}
                {selectedSize === 'M' && 'Fits: Thumb 16mm · Index 12mm · Middle 13mm · Ring 12mm · Pinky 10mm'}
                {selectedSize === 'L' && 'Fits: Thumb 18mm · Index 13mm · Middle 14mm · Ring 13mm · Pinky 11mm'}
                {selectedSize === 'Custom' && 'Choose "Custom" if you do not fit standard boxes. Tape natural nails, mark widest points with a standard ruler in millimeters and write those measures at checkout order details note!'}
              </div>
            </div>
          </div>
 
          {/* QUANTITY AND ADDTOCART CTAs */}
          <div className="pt-6 border-t border-stone-200/75 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-semibold">Quantity:</span>
              <div className="flex items-center border border-luxury-beige-300 rounded overflow-hidden h-10 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 hover:bg-stone-50 text-stone-600 h-full transition"
                >
                  -
                </button>
                <span className="px-5 text-xs font-mono font-bold leading-none">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 hover:bg-stone-50 text-stone-600 h-full transition"
                >
                  +
                </button>
              </div>
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`w-full py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border-2 border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-beige-200'
                }`}
              >
                {justAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                <span>{justAdded ? 'Added to Luxury Bag!' : 'Add to Bag'}</span>
              </button>
 
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-luxury-charcoal hover:bg-stone-850 text-white py-3.5 rounded font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Express Buy Now</span>
              </button>
            </div>
          </div>
 
          {/* TRUSTED DELIVERY BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 border-y border-stone-100">
            <div className="flex items-center space-x-2 text-stone-500 font-mono text-[10px]">
              <Truck size={14} className="text-luxury-gold" />
              <span>Ships in 3-5 days</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-500 font-mono text-[10px]">
              <Layers size={14} className="text-luxury-gold" />
              <span>100% handmade gel</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-500 font-mono text-[10px]">
              <RefreshCw size={14} className="text-luxury-gold" />
              <span>Reusable & sturdy</span>
            </div>
          </div>
 
        </div>
 
      </div>
 
      {/* CORE SPECIFICATIONS TABS */}
      <section className="bg-white border border-luxury-beige-200 rounded p-6 md:p-8 space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-luxury-beige-200 text-xs md:text-sm font-semibold space-x-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3.5 transition-all relative ${
              activeTab === 'details' ? 'text-luxury-gold-dark font-bold border-b-2 border-luxury-gold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Nail Details & Features
          </button>
          <button
            onClick={() => setActiveTab('application')}
            className={`pb-3.5 transition-all relative ${
              activeTab === 'application' ? 'text-luxury-gold-dark font-bold border-b-2 border-luxury-gold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            How to Apply & Remove
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3.5 transition-all relative ${
              activeTab === 'shipping' ? 'text-luxury-gold-dark font-bold border-b-2 border-luxury-gold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Shipping & Return policies
          </button>
        </div>
 
        {/* Tab Panels */}
        <div className="text-xs text-stone-650 leading-relaxed md:text-stone-700">
          
          {activeTab === 'details' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-sm text-luxury-charcoal">Design Integrity Specifications</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-4 font-normal">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
                <li>Entirely handcrafted from start to finish by master artists using premium full-cover tips (no thin plastics).</li>
                <li>Multiple coats of Japanese builder gel and non-wipe scratch-resistant gloss coatings applied to secure structural apex depth.</li>
                <li>Washed, sterilized, pre-conditioned with medical pads, and packaged inside our signature rustic-beige gift boxes.</li>
                <li>Custom configurations for shape (6 options) and length (4 options) fully respected.</li>
              </ul>
            </div>
          )}
 
          {activeTab === 'application' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <span className="font-serif font-bold italic text-luxury-gold text-lg">01. PREPARATION</span>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    Push your cuticles back gently using the wooden cuticle orange stick. Gently buff the surface of your natural nails to remove oils and moisture, then wipe clean with our medical sterile isopropyl alcohol prep pad. Let dry fully.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-serif font-bold italic text-luxury-gold text-lg">02. LONG WEAR (2-3 WEEKS)</span>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    Apply a mini drop of premium liquid nail glue to the back of the press-on nail, and another drop to your natural nail. Press firmly at a 45-degree angle starting from the cuticle line, holding for 30 seconds continuously with firm weight. Avoid water for 2 hours.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-serif font-bold italic text-luxury-gold text-lg">03. SHORT WEAR (1-3 DAYS)</span>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    Perfect for temporary events! Select high-strength double-sided adhesive tabs matching your nail coordinates. Peel tab, place directly on your natural nail, smooth flat, remove protective liner, and press nail down with firm weight for 30 seconds.
                  </p>
                </div>
              </div>
 
              <div className="bg-amber-50 border border-amber-200 rounded p-4 flex items-start space-x-2">
                <AlertCircle size={15} className="text-amber-600 mt-0.5 shrink-0" />
                <div className="text-[11px] leading-normal text-stone-650">
                  <strong>Damage-Free Removal Tutorial:</strong> Soak hands in clean warm water topped with soap baby-oil (or cuticle drops) for 10-15 minutes. Gently insert the wooden cuticle stick under the side edges to leverage, sliding the tips off smoothly. Never pry or force them off, as this stretches your natural keratin layers. Clean residue from backs of press-ons with a buffer and store back safely for future wear!
                </div>
              </div>
            </div>
          )}
 
          {activeTab === 'shipping' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold flex items-center space-x-1.5 text-luxury-charcoal pr-2">
                  <Truck size={14} className="text-luxury-gold" />
                  <span>Preparing & Shipping Estimates</span>
                </h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  We hand-paint every single press-on set to order in Navsari, Gujarat. Sizing coordinates and shapes dictate individual curing steps. Please allow <strong>3 to 5 business days</strong> for hand-painting preparation. Shipping transit takes an additional 3-5 days depending on location. Tracking coordinates are dispatched to your WhatsApp dynamically.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold flex items-center space-x-1.5 text-luxury-charcoal">
                  <RefreshCw size={14} className="text-luxury-gold" />
                  <span>Sanitary Refund & Return Policy</span>
                </h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Due to strictly cosmetic and intimate sanitary hygiene standardizations, completely handcrafted press-on nails cannot be returned or refunded once manufactured to your custom parameters. We highly encourage measuring natural widths using our millimeter guidelines before submitting orders.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
 
      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold block">Stylized Matches</span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide">Matches from same category</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
 
      {/* RECENTLY VIEWED ROW */}
      {recentProductsList.length > 0 && (
        <section className="space-y-6 border-t border-luxury-beige-300 pt-12">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold block">Inspire Radar</span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide">Recently Viewed Sets</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recentProductsList.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
 
    </div>
  );
};