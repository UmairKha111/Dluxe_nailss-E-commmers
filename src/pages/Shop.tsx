import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sliders, X, Sparkles, Filter, Heart, HeartOff } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/products/ProductCard';
import { useCart } from '../context/CartContext';

export const Shop: React.FC = () => {
  const { wishlist } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Filter States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeShape, setActiveShape] = useState<string>('all');
  const [activeLength, setActiveLength] = useState<string>('all');
  const [activeOccasion, setActiveOccasion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [activeColor, setActiveColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('best-seller');
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Parse query parameters
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setActiveCategory(catParam);
    } else {
      setActiveCategory('all');
    }

    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    const filterParam = searchParams.get('filter');
    if (filterParam === 'wishlist') {
      setShowWishlistOnly(true);
    } else {
      setShowWishlistOnly(false);
    }
  }, [searchParams, location]);

  const uniqueShapes = ['Almond', 'Square', 'Coffin', 'Stiletto', 'Round', 'Oval'];
  const uniqueLengths = ['Short', 'Medium', 'Long'];
  const uniqueOccasions = ['Bridal', 'Casual', 'Festival', 'Party'];
  const uniqueColors = ['Nude', 'Gold', 'White', 'Pink', 'Lavender', 'Brown', 'Purple', 'Chrome', 'Grey', 'Green'];

  // Filter & Sort Computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category constraint
        if (activeCategory !== 'all' && product.category !== activeCategory && product.id !== activeCategory) {
          // Fallback if matching slug
          const catObj = categories.find((c) => c.slug === activeCategory || c.id === activeCategory);
          if (!catObj || product.category !== catObj.slug) {
            return false;
          }
        }

        // Shape constraint
        if (activeShape !== 'all' && product.shape !== activeShape) {
          return false;
        }

        // Length constraint
        if (activeLength !== 'all' && product.length !== activeLength) {
          return false;
        }

        // Occasion constraint
        if (activeOccasion !== 'all' && !product.occasion.includes(activeOccasion)) {
          return false;
        }

        // Color constraint
        if (activeColor !== 'all' && !product.color.includes(activeColor)) {
          return false;
        }

        // Wishlist constraint
        if (showWishlistOnly && !wishlist.includes(product.id)) {
          return false;
        }

        // Price constraint
        if (product.price > maxPrice) {
          return false;
        }

        // Search constraint
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchColor = product.color.some((c) => c.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchColor) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest') {
          return a.price - b.price;
        }
        if (sortBy === 'highest') {
          return b.price - a.price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'newest') {
          const aNew = a.badges?.includes('New') ? 1 : 0;
          const bNew = b.badges?.includes('New') ? 1 : 0;
          return bNew - aNew;
        }
        // Default best-seller
        const aBest = a.badges?.includes('Best Seller') ? 1 : 0;
        const bBest = b.badges?.includes('Best Seller') ? 1 : 0;
        return bBest - aBest;
      });
  }, [activeCategory, activeShape, activeLength, activeOccasion, searchQuery, maxPrice, activeColor, sortBy, showWishlistOnly, wishlist]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveShape('all');
    setActiveLength('all');
    setActiveOccasion('all');
    setSearchQuery('');
    setMaxPrice(2500);
    setActiveColor('all');
    setSortBy('best-seller');
    setShowWishlistOnly(false);
    setSearchParams({});
  };

  return (
    <div id="shop-page-wrapper" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
      
      {/* HEADER HERO */}
      <div className="text-center bg-luxury-beige-200 border border-luxury-beige-300 rounded p-8 md:p-12 space-y-3 relative overflow-hidden">
        <div className="absolute top-3 right-3 text-luxury-gold animate-bounce">
          <Sparkles size={18} />
        </div>
        <span className="text-[10px] uppercase font-mono text-luxury-gold-dark tracking-widest font-bold">The Luxury Gallery</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-luxury-charcoal tracking-wide">
          Shop Handcrafted Nails
        </h1>
        <p className="text-xs text-stone-605 max-w-xl mx-auto leading-relaxed">
          Select or custom-fit our high-shine gel combinations. Every standard set includes a complete preparation toolkit free.
        </p>
      </div>

      {/* FILTER & COUNT BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-luxury-beige-300 pb-4 space-y-3.5 md:space-y-0 text-xs">
        <div className="flex items-center space-x-3 text-stone-500 font-medium">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center space-x-1 border border-luxury-beige-300 rounded px-3 py-2 bg-white text-luxury-charcoal"
          >
            <SlidersHorizontal size={13} />
            <span>Filters</span>
          </button>
          <span>Showing {filteredProducts.length} Premium results</span>
        </div>

        {/* Wishlist Isolation button */}
        <div className="flex items-center space-x-3.5 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded transition font-medium border ${
              showWishlistOnly
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-white text-stone-600 border-luxury-beige-300 hover:bg-stone-50'
            }`}
          >
            <Heart size={13} className={showWishlistOnly ? 'fill-red-500 text-red-500' : ''} />
            <span>{showWishlistOnly ? 'Favorites Isolated' : 'My Favorites'}</span>
          </button>

          {/* Sort selection drop dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className="text-stone-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-luxury-beige-300 rounded px-2.5 py-1.5 text-stone-700 font-semibold focus:outline-none focus:border-luxury-gold focus:ring-0 cursor-pointer"
            >
              <option value="best-seller">Best Selling</option>
              <option value="newest">New Releases</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTERS (Lg only) */}
        <aside className="hidden lg:block space-y-6 bg-white/50 border border-luxury-beige-200 p-6 rounded-xs h-fit self-start sticky top-28">
          <div className="flex items-center justify-between border-b border-luxury-beige-300 pb-3">
            <h3 className="font-serif font-bold text-sm flex items-center space-x-1">
              <Filter size={14} className="text-luxury-gold" />
              <span>Customize Nails</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[9.5px] uppercase font-mono font-bold text-stone-400 hover:text-luxury-charcoal transition"
            >
              Reset All
            </button>
          </div>

          {/* Search bar inside sidebar */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">Search design</span>
            <div className="relative">
              <input
                type="text"
                placeholder="Nudes, pearls, gold..."
                value={searchQuery}
                aria-label="Search items"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-luxury-beige-300 rounded text-xs px-2.5 py-2 pr-8 focus:outline-none focus:border-luxury-gold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2.5 text-stone-400 hover:text-luxury-charcoal"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          </div>

          {/* Category List */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">Collection family</span>
            <div className="space-y-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-2 py-1.5 text-xs rounded transition ${
                  activeCategory === 'all'
                    ? 'bg-luxury-beige-200 text-luxury-charcoal font-semibold'
                    : 'text-stone-605 hover:bg-stone-50'
                }`}
              >
                All Families
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-2 py-1.5 text-xs rounded transition flex justify-between items-center ${
                    activeCategory === cat.id || activeCategory === cat.slug
                      ? 'bg-luxury-beige-200 text-luxury-charcoal font-semibold'
                      : 'text-stone-605 hover:bg-stone-100/40'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sizing helpers: Shape */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">Preferred Shape</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveShape('all')}
                className={`text-[10px] font-medium px-2.5 py-1 rounded border transition ${
                  activeShape === 'all'
                    ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                }`}
              >
                All Shapes
              </button>
              {uniqueShapes.map((shape) => (
                <button
                  key={shape}
                  onClick={() => setActiveShape(shape)}
                  className={`text-[10px] font-medium px-2.5 py-1 rounded border transition ${
                    activeShape === shape
                      ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing helpers: Length */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">Preferred Length</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveLength('all')}
                className={`text-[10px] font-medium px-2.5 py-1 rounded border transition ${
                  activeLength === 'all'
                    ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                }`}
              >
                All Lengths
              </button>
              {uniqueLengths.map((len) => (
                <button
                  key={len}
                  onClick={() => setActiveLength(len)}
                  className={`text-[10px] font-medium px-2.5 py-1 rounded border transition ${
                    activeLength === len
                      ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-luxury-beige-400'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Selection */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">Occasion setting</span>
            <div className="space-y-1">
              <button
                onClick={() => setActiveOccasion('all')}
                className={`w-full text-left px-2 py-1 text-xs rounded transition ${
                  activeOccasion === 'all' ? 'text-luxury-gold font-bold' : 'text-stone-605'
                }`}
              >
                All Occasions
              </button>
              {uniqueOccasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setActiveOccasion(occ)}
                  className={`w-full text-left px-2 py-1 text-xs rounded transition flex items-center justify-between ${
                    activeOccasion === occ ? 'text-luxury-charcoal font-bold' : 'text-stone-605 hover:text-luxury-gold'
                  }`}
                >
                  <span>{occ}</span>
                  {activeOccasion === occ && <span className="w-1 h-1 bg-luxury-gold rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Color filter buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">Esthetic tones</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveColor('all')}
                className={`text-[9.5px] px-2.5 py-0.5 rounded border ${
                  activeColor === 'all' ? 'bg-luxury-beige-400 text-luxury-charcoal font-bold' : 'bg-white hover:bg-stone-50'
                }`}
              >
                All Tones
              </button>
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setActiveColor(color)}
                  className={`text-[9.5px] px-2 py-0.5 rounded border transition ${
                    activeColor === color
                      ? 'bg-luxury-beige-400 text-luxury-charcoal font-bold border-luxury-gold'
                      : 'bg-white text-stone-600 border-stone-150 hover:border-luxury-beige-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <div className="flex justify-between items-center text-[10px] font-semibold text-stone-400 font-mono uppercase">
              <span>Max Price</span>
              <span className="font-bold text-luxury-charcoal">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="900"
              max="2500"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Price Filter Slider Range"
              className="w-full h-1 bg-luxury-beige-300 rounded cursor-pointer accent-luxury-gold focus:outline-none"
            />
            <div className="flex justify-between text-[9px] text-stone-400 font-mono">
              <span>₹900</span>
              <span>₹2,500</span>
            </div>
          </div>

          {/* Flat policy notes helper */}
          <div className="bg-luxury-beige-100/80 border border-luxury-beige-300 rounded p-3 text-[10px] text-stone-500 leading-relaxed">
            ✨ Free pan-India courier delivery kicks in automated at checkout for orders above <strong>₹1,499</strong>. Need style support? Tap the WhatsApp helper.
          </div>
        </aside>

        {/* EXQUISITE PRODUCT RESULTS GRID */}
        <main className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white border border-luxury-beige-200 rounded">
              <span className="bg-luxury-beige-200/50 p-6 rounded-full inline-block text-stone-400">
                <HeartOff size={32} />
              </span>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h3 className="font-serif text-lg font-bold">No custom designs match the parameters</h3>
                <p className="text-xs text-stone-500">
                  Try resetting your active shapes, colors, or price selections. Alternatively, chat directly with us to paint your custom Pinterest design!
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-luxury-charcoal hover:bg-stone-850 text-white text-xs px-6 py-2.5 font-bold uppercase tracking-wider rounded transition"
              >
                Show All Available Sets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE COLLAPSIBLE FILTER PANEL */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setMobileFiltersOpen(false)} />
          
          <div className="relative w-80 max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h3 className="font-serif text-base font-bold text-luxury-charcoal">Filters & Customizers</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-stone-500 hover:text-stone-800 transition">
                <X size={20} />
              </button>
            </div>

            {/* Sizing helpers: Shape */}
            <div className="space-y-4">
              {/* Category selector */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">Category Family</span>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-luxury-beige-300 rounded text-xs p-2 focus:outline-none"
                >
                  <option value="all">All Families</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Shapes */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">Preferred Shape</span>
                <div className="flex flex-wrap gap-1">
                  {['all', ...uniqueShapes].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setActiveShape(shape)}
                      className={`text-[10px] px-2 py-1 rounded border ${
                        activeShape === shape ? 'bg-luxury-gold text-white border-luxury-gold font-bold' : 'bg-white border-stone-200'
                      }`}
                    >
                      {shape === 'all' ? 'All' : shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lengths */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Preferred Length</span>
                <div className="flex flex-wrap gap-1">
                  {['all', ...uniqueLengths].map((len) => (
                    <button
                      key={len}
                      onClick={() => setActiveLength(len)}
                      className={`text-[10px] px-2.5 py-1 rounded border ${
                        activeLength === len ? 'bg-luxury-gold text-white border-luxury-gold font-bold' : 'bg-white border-stone-200'
                      }`}
                    >
                      {len === 'all' ? 'All' : len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color list */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">Esthetic Tones</span>
                <div className="flex flex-wrap gap-1">
                  {['all', ...uniqueColors].map((col) => (
                    <button
                      key={col}
                      onClick={() => setActiveColor(col)}
                      className={`text-[9px] px-2 py-0.5 rounded border ${
                        activeColor === col ? 'bg-luxury-beige-400 text-luxury-charcoal font-bold' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      {col === 'all' ? 'All Tones' : col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range input */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-stone-400 font-mono uppercase">
                  <span>Max Budget Price</span>
                  <span className="text-luxury-charcoal">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="900"
                  max="2500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Price range filter slider"
                  className="w-full accent-luxury-gold"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => {
                    handleResetFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="flex-1 border text-xs py-2 rounded text-stone-500 text-center"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-luxury-charcoal text-white text-xs py-2 rounded text-center font-bold uppercase tracking-wider"
                >
                  Apply Filters
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
