import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Heart, Star, Sparkles, Check, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../data/siteConfig';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();

  // If there's no active product selected, return null
  if (!quickViewProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAddedFeedback, setJustAddedFeedback] = useState(false);

  // Sync state whenever the product changes
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize('M');
    setSelectedShape(quickViewProduct.shape);
    setSelectedLength(quickViewProduct.length);
    setQuantity(1);
    setJustAddedFeedback(false);
  }, [quickViewProduct]);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedShape, selectedLength);
    setJustAddedFeedback(true);
    setTimeout(() => {
      setJustAddedFeedback(false);
    }, 2500);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedShape, selectedLength);
    setQuickViewProduct(null);
    navigate('/checkout');
  };

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-4xl rounded shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 my-8 animate-slide-up z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-luxury-charcoal transition bg-stone-50 rounded-full"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden bg-luxury-beige-100 rounded border border-luxury-beige-200">
            <img
              src={quickViewProduct.images[activeImageIdx]}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover text-[10px]"
            />
            {quickViewProduct.badges && quickViewProduct.badges.includes('Best Seller') && (
              <span className="absolute top-3 left-3 bg-luxury-gold text-white font-mono text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded shadow">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 py-1 overflow-x-auto">
            {quickViewProduct.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`w-14 h-14 rounded overflow-hidden border-2 transition ${
                  idx === activeImageIdx ? 'border-luxury-gold bg-stone-50' : 'border-stone-200 opacity-70 hover:opacity-100'
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
        </div>

        {/* Right Column: Customizer Details */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] uppercase font-mono font-bold text-luxury-gold tracking-widest">
              {quickViewProduct.category} Collection
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide mt-1">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(quickViewProduct.rating) ? 'fill-amber-400' : 'text-stone-200'}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-stone-500">
                {quickViewProduct.rating} / 5.0 ({quickViewProduct.reviewsCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2.5 mt-3.5 pb-4 border-b border-stone-100">
              <span className="text-2xl font-mono font-bold text-luxury-charcoal">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm line-through text-stone-400 font-mono">
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {quickViewProduct.originalPrice && (
                <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded font-mono font-bold">
                  SAVE {Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mt-4">
              {quickViewProduct.description}
            </p>
          </div>

          {/* CUSTOMIZERS GRID */}
          <div className="space-y-3 pt-2">
            {/* Shapes selection slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                <span>1. Nail Shape:</span>
                <span className="text-luxury-gold font-mono uppercase text-[10px]">{selectedShape}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Almond', 'Square', 'Coffin', 'Stiletto', 'Round', 'Oval'].map((side) => (
                  <button
                    key={side}
                    onClick={() => setSelectedShape(side)}
                    className={`text-[11px] font-medium px-3 py-1 rounded-full border transition ${
                      selectedShape === side
                        ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                    }`}
                  >
                    {side}
                  </button>
                ))}
              </div>
            </div>

            {/* Length selectors */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                <span>2. Nail Length:</span>
                <span className="text-luxury-gold font-mono uppercase text-[10px]">{selectedLength}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Short', 'Medium', 'Long'].map((len) => (
                  <button
                    key={len}
                    onClick={() => setSelectedLength(len)}
                    className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all ${
                      selectedLength === len
                        ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Sizes */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                <span className="flex items-center space-x-1">
                  <span>3. Custom Box Size:</span>
                  <Link to="/about" onClick={() => setQuickViewProduct(null)} className="text-[10px] text-luxury-gold hover:underline">
                    (How to measure?)
                  </Link>
                </span>
                <span className="text-stone-500 font-mono text-[10px]">Active: Size {selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickViewProduct.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-8 text-xs font-semibold rounded font-mono border transition ${
                      selectedSize === sz
                        ? 'bg-luxury-gold text-white border-luxury-gold'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <span className="block text-[9.5px] text-stone-500 italic mt-1 font-sans">
                {selectedSize === 'XS' && 'Fits Thumb 14mm, Index 10mm, Middle 11mm, Ring 10mm, Pinky 8mm'}
                {selectedSize === 'S' && 'Fits Thumb 15mm, Index 11mm, Middle 12mm, Ring 11mm, Pinky 9mm'}
                {selectedSize === 'M' && 'Fits Thumb 16mm, Index 12mm, Middle 13mm, Ring 12mm, Pinky 10mm'}
                {selectedSize === 'L' && 'Fits Thumb 18mm, Index 13mm, Middle 14mm, Ring 13mm, Pinky 11mm'}
                {selectedSize === 'Custom' && 'Please specify your individual natural measures at checkout under Notes!'}
              </span>
            </div>
          </div>

          {/* QUANTITY AND ADDTOCART CTAs */}
          <div className="pt-4 border-t border-stone-100 flex flex-col space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-semibold">Quantity:</span>
              <div className="flex items-center border border-luxury-beige-300 rounded overflow-hidden h-9 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 hover:bg-stone-50 text-stone-600 h-full transition"
                >
                  -
                </button>
                <span className="px-4 text-xs font-mono font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 hover:bg-stone-50 text-stone-600 h-full transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  toggleWishlist(quickViewProduct.id);
                }}
                className={`p-2 border rounded-full transition ${
                  isWishlisted ? 'border-red-200 text-red-500 bg-red-50' : 'border-stone-200 text-stone-500 hover:bg-stone-50'
                }`}
                title={isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              >
                <Heart size={16} className={isWishlisted ? 'fill-red-500' : ''} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleAddToCart}
                disabled={justAddedFeedback}
                className={`w-full py-2.5 rounded font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  justAddedFeedback
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border-2 border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-beige-200'
                }`}
              >
                {justAddedFeedback ? <Check size={14} /> : <ShoppingBag size={14} />}
                <span>{justAddedFeedback ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-luxury-charcoal hover:bg-stone-850 text-white py-2.5 rounded font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
              >
                <span>Buy Now Express</span>
              </button>
            </div>

            {/* Quick specifications text banner */}
            <div className="bg-luxury-beige-100 flex items-center justify-around rounded p-2.5 text-[9px] text-stone-500 text-center tracking-wide font-medium">
              <span className="flex items-center space-x-1">
                <Check size={10} className="text-emerald-600" />
                <span>Navsari Prep Studio</span>
              </span>
              <span>·</span>
              <span className="flex items-center space-x-1">
                <Check size={10} className="text-emerald-600" />
                <span>Double Gel Cured</span>
              </span>
              <span>·</span>
              <span className="flex items-center space-x-1">
                <Check size={10} className="text-emerald-600" />
                <span>Includes 6-Pc Kit</span>
              </span>
            </div>

            <div className="flex justify-center">
              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-xs text-luxury-gold hover:text-luxury-charcoal transition underline font-semibold flex items-center space-x-1"
              >
                <Eye size={12} />
                <span>Explore Full Details, Reviews & Application Manual &rarr;</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
