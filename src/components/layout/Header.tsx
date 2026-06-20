import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Trash2, Plus, Minus, Check, MessageCircle, HelpCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../data/siteConfig';
import { offerBanners } from '../../data/offers';

export const Header: React.FC = () => {
  const { cart, wishlist, removeFromCart, updateQuantity, subtotal, total, shippingCharge, discountAmount, activeCoupon, applyCoupon, removeCoupon } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);
  
  // Rotating offer marquee
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interval for changing promo banner
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % offerBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Close drawers on path change
  useEffect(() => {
    setIsCartOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    setCouponMessage({ text: res.message, error: !res.success });
    setTimeout(() => setCouponMessage(null), 5000);
    setCouponCode('');
  };

  return (
    <>
      {/* Top Banner Announcement Marquee */}
      <div id="offer-promo-marquee" className="bg-luxury-charcoal text-luxury-beige-100 text-xs py-2 px-4 transition-all duration-500 relative flex justify-center items-center font-mono">
        <div className="text-center flex items-center space-x-1 tracking-wide animate-fade-in">
          <span>{offerBanners[activeBannerIdx].text}</span>
          {offerBanners[activeBannerIdx].linkUrl && (
            <Link to={offerBanners[activeBannerIdx].linkUrl!} className="underline hover:text-luxury-gold transition ml-2">
              {offerBanners[activeBannerIdx].linkText} &rarr;
            </Link>
          )}
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="luxury-sticky-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-luxury-beige-200 py-2'
            : 'bg-luxury-beige-100/90 border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-hamburger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 text-luxury-charcoal hover:text-luxury-gold md:hidden transition"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Left: Navigation links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700">
            <Link to="/" className={`hover:text-luxury-charcoal tracking-wide transition ${location.pathname === '/' ? 'text-luxury-gold font-semibold underline underline-offset-4' : ''}`}>
              Home
            </Link>
            <Link to="/shop" className={`hover:text-luxury-charcoal tracking-wide transition ${location.pathname === '/shop' ? 'text-luxury-gold font-semibold underline underline-offset-4' : ''}`}>
              Shop All
            </Link>
            <Link to="/about" className={`hover:text-luxury-charcoal tracking-wide transition ${location.pathname === '/about' ? 'text-luxury-gold font-semibold underline underline-offset-4' : ''}`}>
              Sizing & Craft
            </Link>
            <Link to="/faq" className={`hover:text-luxury-charcoal tracking-wide transition ${location.pathname === '/faq' ? 'text-luxury-gold font-semibold underline underline-offset-4' : ''}`}>
              FAQs
            </Link>
          </nav>

          {/* Center Brand Identity Logo */}
          <div className="text-center flex flex-col items-center">
            <Link to="/" className="group flex flex-col items-center">
              <span className="font-serif italic text-2xl md:text-3xl font-semibold tracking-wider text-luxury-charcoal group-hover:text-luxury-gold transition duration-300">
                {siteConfig.brandName}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-luxury-gold font-mono -mt-1 font-medium">
                Handmade Press-Ons
              </span>
            </Link>
          </div>

          {/* Right Section: Search form, Wishlist, Cart */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search Input inline desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search luxury designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-luxury-beige-200/50 hover:bg-luxury-beige-200/80 focus:bg-white text-xs text-luxury-charcoal px-3 py-1.5 pr-8 rounded-full border border-luxury-beige-300 focus:outline-none focus:border-luxury-gold w-48 transition"
              />
              <button type="submit" className="absolute right-2.5 text-stone-500 hover:text-luxury-gold transition">
                <Search size={14} />
              </button>
            </form>

            <Link to="/faq" className="hidden sm:inline-flex text-stone-500 hover:text-luxury-gold transition" title="Help & Customization">
              <HelpCircle size={19} />
            </Link>

            {/* Wishlist Link Button */}
            <Link
              to="/shop?filter=wishlist"
              className="p-1 text-stone-600 hover:text-red-500 transition relative"
              title="View Wishlist"
            >
              <Heart size={20} className={wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button Drawer Trigger */}
            <button
              id="header-cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="p-1 text-stone-700 hover:text-luxury-gold-dark transition relative flex items-center"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-luxury-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer Cart */}
      {isCartOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop screen */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsCartOpen(false)}
          />

          <div
            id="cart-drawer-sidebar"
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-up"
          >
            {/* Header */}
            <div className="p-5 border-b border-luxury-beige-200 flex items-center justify-between bg-luxury-beige-100">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={20} className="text-luxury-gold" />
                <h2 className="text-base font-serif font-semibold tracking-wide">Your Luxury Box ({cartItemsCount})</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-stone-400 hover:text-luxury-charcoal transition"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart list content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <span className="bg-luxury-beige-200/50 p-6 rounded-full text-luxury-gold animate-bounce">
                    <ShoppingBag size={32} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold">Your box is empty</h3>
                    <p className="text-xs text-stone-500 mt-1 max-w-[250px] mx-auto">
                      Each and every set is hand-crafted with luxury salon gels. Explore our collections to start customization.
                    </p>
                  </div>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block bg-luxury-charcoal text-white text-xs px-6 py-2.5 font-medium uppercase tracking-wider hover:bg-stone-800 transition"
                  >
                    Shop Collections
                  </Link>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${index}`}
                    className="flex items-start space-x-3 p-3 border border-lucky-beige-200 rounded hover:border-luxury-beige-300 bg-luxury-beige-100/30 transition-all"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded bg-stone-100 text-[10px]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-serif font-semibold truncate hover:text-luxury-gold pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-stone-400 hover:text-red-500 p-0.5 transition"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mt-1 text-[10px] text-stone-500">
                        <span className="bg-luxury-beige-200 px-1.5 py-0.5 rounded uppercase font-mono font-medium">
                          Size {item.selectedSize}
                        </span>
                        {item.selectedShape && (
                          <span className="bg-luxury-beige-200 px-1.5 py-0.5 rounded font-mono">
                            {item.selectedShape}
                          </span>
                        )}
                        {item.selectedLength && (
                          <span className="bg-luxury-beige-200 px-1.5 py-0.5 rounded font-mono">
                            {item.selectedLength}
                          </span>
                        )}
                      </div>

                      {/* Quantity Editor */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-luxury-beige-300 rounded overflow-hidden h-6 bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="p-1 hover:bg-stone-50 text-stone-600 transition"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="p-1 hover:bg-stone-50 text-stone-600 transition"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-xs font-mono font-semibold text-luxury-charcoal">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary of Cart Panel */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-luxury-beige-200 bg-luxury-beige-100 flex flex-col space-y-4">
                {/* Coupon application panel */}
                <div>
                  {activeCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 rounded p-2 text-[11px]">
                      <div className="flex items-center space-x-1">
                        <Check size={12} className="text-emerald-600" />
                        <span>Code <strong>{activeCoupon.code}</strong> applied!</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-stone-700 underline font-mono text-[9px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCouponApply} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="ENTER COUPON CODE"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-white border border-luxury-beige-300 rounded px-2.5 py-1 text-xs uppercase tracking-wider focus:outline-none focus:border-luxury-gold font-mono"
                      />
                      <button
                        type="submit"
                        className="bg-luxury-charcoal text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded hover:bg-stone-800 transition"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMessage && (
                    <p className={`text-[10px] mt-1 ${couponMessage.error ? 'text-red-500' : 'text-emerald-600'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                {/* Pricing Summary lines */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({activeCoupon?.code})</span>
                      <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Handmade Prep Kit</span>
                    <span className="text-emerald-600">FREE included</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Pan-India Shipping</span>
                    <span className="font-mono">
                      {shippingCharge === 0 ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        `₹${shippingCharge}`
                      )}
                    </span>
                  </div>

                  {shippingCharge > 0 && (
                    <p className="text-[10px] text-luxury-gold italic text-right">
                      Add ₹{(1499 - subtotal).toLocaleString('en-IN')} more for FREE shipping!
                    </p>
                  )}

                  <div className="border-t border-stone-200 my-2 pt-2 flex justify-between text-sm font-semibold text-luxury-charcoal">
                    <span>Total Order Value</span>
                    <span className="font-mono text-base font-bold text-luxury-gold-dark">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="border border-luxury-charcoal text-luxury-charcoal text-center text-xs font-semibold py-2.5 uppercase tracking-wider hover:bg-luxury-beige-200 transition"
                  >
                    View Bag
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="bg-luxury-charcoal text-white text-center text-xs font-semibold py-2.5 uppercase tracking-wider hover:bg-stone-800 transition"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sidebar Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-overlay" className="fixed inset-0 z-50 overflow-hidden flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-72 max-w-sm bg-luxury-beige-100 h-full shadow-2xl flex flex-col p-6 animate-fade-in">
            <div className="flex items-center justify-between pb-6 border-b border-luxury-beige-200">
              <span className="font-serif italic text-lg font-semibold text-luxury-charcoal">
                {siteConfig.brandName}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-800 transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 py-6 space-y-4 flex flex-col justify-between">
              <div className="flex flex-col space-y-3.5 text-sm font-semibold text-stone-700">
                <Link to="/" className="hover:text-luxury-gold transition p-1">Home</Link>
                <Link to="/shop" className="hover:text-luxury-gold transition p-1">Shop All</Link>
                <Link to="/about" className="hover:text-luxury-gold transition p-1">Sizing & Process</Link>
                <Link to="/faq" className="hover:text-luxury-gold transition p-1">FAQs</Link>
                
                <div className="border-t border-luxury-beige-300 pt-4 mt-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Categories</span>
                  <Link to="/shop?category=nudes" className="block text-xs font-medium py-1.5 hover:text-luxury-gold">Nudes & Cushions</Link>
                  <Link to="/shop?category=bridal" className="block text-xs font-medium py-1.5 hover:text-luxury-gold">Bridal & RSVP Glam</Link>
                  <Link to="/shop?category=french" className="block text-xs font-medium py-1.5 hover:text-luxury-gold">French Manicures</Link>
                  <Link to="/shop?category=cat-eye" className="block text-xs font-medium py-1.5 hover:text-luxury-gold">Velvet & Cat-Eye</Link>
                </div>
              </div>

              {/* Contact info card on bottom of drawer */}
              <div className="bg-white border border-luxury-beige-200 rounded p-4 text-xs space-y-2">
                <p className="font-serif italic text-stone-700 font-semibold text-center text-luxury-gold">Pan-India Delivery</p>
                <p className="text-[10px] text-stone-500 text-center">Handcrafted in Navsari, Gujarat</p>
                <a
                  href={`${siteConfig.whatsappUrlPrefix}?text=Hello, I want to inquire about custom press-on designs!`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded py-2 text-center text-[11px] font-bold mt-2"
                >
                  <MessageCircle size={14} />
                  <span>Tap to Chat with Artist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
