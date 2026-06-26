import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Heart, ShoppingBag, Truck, ShieldCheck,
  RefreshCw, Layers, Check, Sparkles, MessageCircle,
  ArrowLeft, BookOpen, AlertCircle,
} from 'lucide-react';
import { products } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ProductCard } from '../components/products/ProductCard';
 
export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart, wishlist, toggleWishlist,
    addToRecentlyViewed, recentlyViewed,
  } = useCart();
 
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'application' | 'shipping'>('details');
 
  // ✅ Only 'id' in deps — stable, no re-render loop
  useEffect(() => {
    if (id) {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setActiveImageIdx(0);
        setQuantity(1);
        setJustAdded(false);
        addToRecentlyViewed(found.id);
      } else {
        setProduct(products[0]);
      }
    }
  }, [id]);
 
  if (!product) {
    return (
      <div className="py-24 text-center text-xs text-stone-500 font-mono">
        Loading luxury product records...
      </div>
    );
  }
 
  // Default size 'M', shape & length taken from product data
  const handleAddToCart = () => {
    addToCart(product, quantity, 'M', product.shape, product.length);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };
 
  const handleBuyNow = () => {
    addToCart(product, quantity, 'M', product.shape, product.length);
    navigate('/checkout');
  };
 
  const recentProductsList = recentlyViewed
    .map((rvId) => products.find((p) => p.id === rvId))
    .filter((p): p is Product => p !== undefined && p.id !== product.id)
    .slice(0, 4);
 
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
 
  const isWishlisted = wishlist.includes(product.id);
 
  return (
    <div
      id="product-details-container"
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-16"
    >
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
 
      {/* ── MAIN GRID ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
 
        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square overflow-hidden bg-luxury-beige-100 border border-luxury-beige-300 rounded shadow-xs">
 
            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white text-stone-500 hover:text-red-500 hover:scale-105 active:scale-95 shadow-md transition-all"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
            </button>
 
            {/* Badges */}
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
 
          {/* Thumbnails */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`w-16 h-16 rounded overflow-hidden border-2 transition ${
                  idx === activeImageIdx
                    ? 'border-luxury-gold bg-stone-50 shadow-md'
                    : 'border-stone-200 opacity-70 hover:opacity-100'
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
 
          {/* Premium box banner */}
          <div className="bg-luxury-beige-200/60 border border-luxury-beige-300 rounded p-4 flex items-center space-x-3 text-xs tracking-wide">
            <span className="p-2 bg-white rounded-full text-luxury-gold">
              <Sparkles size={16} />
            </span>
            <p className="text-stone-700 leading-normal">
              <strong>Premium Artist Box</strong>: Each set includes raw structural
              acrylic tips, curated double-layer base coatings, custom detail
              paints, and a 6-pc preparation toolkit free.
            </p>
          </div>
        </div>
 
        {/* RIGHT: Product Info */}
        <div className="lg:col-span-6 space-y-6">
 
          {/* Name & rating */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-[0.25em] block">
              {product.category} Series
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal leading-tight tracking-wide">
              {product.name}
            </h1>
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
 
          {/* Price */}
          <div className="bg-luxury-beige-200/50 p-4 border border-luxury-beige-300 rounded flex items-baseline space-x-3">
            <span className="text-3xl font-mono font-bold text-luxury-charcoal">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm line-through text-stone-400 font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded font-mono font-bold">
                  SAVE ₹{product.originalPrice - product.price} (
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100,
                  )}
                  % OFF)
                </span>
              </>
            )}
          </div>
 
          {/* Description */}
          <p className="text-xs text-stone-600 leading-relaxed">{product.description}</p>
 
          {/* ── WHATSAPP SIZE HELP ONLY ─────────────────────
           *   Removed:
           *   • Customize Shape (Almond / Square / Coffin…)
           *   • Customize Length (Short / Medium / Long…)
           *   • Choose Sizing Box (XS / S / M / L / Custom)
           *   Kept:
           *   • WhatsApp "Discuss Size" button ✅
           * ──────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-stone-200/75">
            <a
              href={`https://wa.me/${siteConfig.whatsapp || siteConfig.phone}?text=${encodeURIComponent(
                'Hi! I need help choosing the right sizing box for my press-on nails.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-semibold px-4 py-2 rounded-full transition shadow-sm"
            >
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.847L.057 23.571a.75.75 0 00.921.921l5.724-1.469A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.952-1.355l-.355-.211-3.669.941.957-3.556-.231-.366A9.722 9.722 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              <span>Discuss Size on WhatsApp</span>
            </a>
          </div>
 
          {/* ── QUANTITY + ADD TO CART + BUY NOW ────────── */}
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
 
          {/* Delivery badges */}
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
 
      {/* ── TABS ────────────────────────────────────────── */}
      <section className="bg-white border border-luxury-beige-200 rounded p-6 md:p-8 space-y-6">
        <div className="flex border-b border-luxury-beige-200 text-xs md:text-sm font-semibold space-x-6">
          {(['details', 'application', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3.5 transition-all relative capitalize ${
                activeTab === tab
                  ? 'text-luxury-gold-dark font-bold border-b-2 border-luxury-gold'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {tab === 'details' && 'Nail Details & Features'}
              {tab === 'application' && 'How to Apply & Remove'}
              {tab === 'shipping' && 'Shipping & Return Policies'}
            </button>
          ))}
        </div>
 
        <div className="text-xs text-stone-650 leading-relaxed md:text-stone-700">
 
          {activeTab === 'details' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-sm text-luxury-charcoal">
                Design Integrity Specifications
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-4 font-normal">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
                <li>Entirely handcrafted from start to finish by master artists using premium full-cover tips.</li>
                <li>Multiple coats of Japanese builder gel and non-wipe scratch-resistant gloss coatings.</li>
                <li>Washed, sterilized, pre-conditioned with medical pads, and packaged inside our signature gift boxes.</li>
              </ul>
            </div>
          )}
 
          {activeTab === 'application' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <span className="font-serif font-bold italic text-luxury-gold text-lg">01. PREPARATION</span>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    Push your cuticles back gently using the wooden cuticle orange stick. Buff the surface of your natural nails to remove oils, then wipe clean with the medical sterile isopropyl alcohol prep pad. Let dry fully.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-serif font-bold italic text-luxury-gold text-lg">02. LONG WEAR (2-3 WEEKS)</span>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    Apply a mini drop of premium liquid nail glue to the back of the press-on nail and to your natural nail. Press firmly at a 45-degree angle from the cuticle line, holding for 30 seconds. Avoid water for 2 hours.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-serif font-bold italic text-luxury-gold text-lg">03. SHORT WEAR (1-3 DAYS)</span>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    Select high-strength double-sided adhesive tabs. Peel tab, place on your natural nail, smooth flat, remove protective liner, and press the nail down firmly for 30 seconds.
                  </p>
                </div>
              </div>
 
              <div className="bg-amber-50 border border-amber-200 rounded p-4 flex items-start space-x-2">
                <AlertCircle size={15} className="text-amber-600 mt-0.5 shrink-0" />
                <div className="text-[11px] leading-normal text-stone-650">
                  <strong>Damage-Free Removal:</strong> Soak hands in warm soapy water with baby oil for 10–15 minutes. Gently insert the wooden cuticle stick under the side edges to leverage the tips off. Never pry or force them off. Clean residue from backs with a buffer and store for future wear!
                </div>
              </div>
            </div>
          )}
 
          {activeTab === 'shipping' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold flex items-center space-x-1.5 text-luxury-charcoal">
                  <Truck size={14} className="text-luxury-gold" />
                  <span>Preparing & Shipping Estimates</span>
                </h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  We hand-paint every single press-on set to order. Please allow <strong>3 to 5 business days</strong> for preparation. Shipping transit takes an additional 3–5 days depending on location. Tracking details are dispatched to your WhatsApp.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold flex items-center space-x-1.5 text-luxury-charcoal">
                  <RefreshCw size={14} className="text-luxury-gold" />
                  <span>Sanitary Refund & Return Policy</span>
                </h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Due to cosmetic and sanitary hygiene standardizations, handcrafted press-on nails cannot be returned or refunded once manufactured to your custom parameters. We encourage measuring natural widths using our millimeter guidelines before ordering.
                </p>
              </div>
            </div>
          )}
 
        </div>
      </section>
 
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold block">
              Stylized Matches
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide">
              Matches from same category
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
 
      {/* Recently viewed */}
      {recentProductsList.length > 0 && (
        <section className="space-y-6 border-t border-luxury-beige-300 pt-12">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold block">
              Inspire Radar
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide">
              Recently Viewed Sets
            </h2>
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
