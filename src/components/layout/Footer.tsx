import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Send, Mail, MapPin, Phone, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-luxury-charcoal text-luxury-beige-100 border-t-2 border-luxury-gold pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Feature highlights: free prep kits, pan-india shipping, reusable, handcrafted */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-stone-800 text-xs tracking-wider">
          <div className="flex items-start space-x-3">
            <span className="p-2 bg-stone-900 rounded text-luxury-gold">
              <Sparkles size={16} />
            </span>
            <div>
              <h4 className="font-semibold uppercase text-[10px]">100% Handcrafted</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Custom professional salon-grade premium gels.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="p-2 bg-stone-900 rounded text-luxury-gold">
              <Truck size={16} />
            </span>
            <div>
              <h4 className="font-semibold uppercase text-[10px]">Pan-India Shipping</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Reliable custom courier transit from Gujarat.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="p-2 bg-stone-900 rounded text-luxury-gold">
              <ShieldCheck size={16} />
            </span>
            <div>
              <h4 className="font-semibold uppercase text-[10px]">Premium Prep Kit Included</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Super liquid glue and dual adhesive tabs free.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="p-2 bg-stone-900 rounded text-luxury-gold">
              <RefreshCw size={16} />
            </span>
            <div>
              <h4 className="font-semibold uppercase text-[10px]">Fully Reusable</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">Wear, carefully peel off, and re-apply years down.</p>
            </div>
          </div>
        </div>

        {/* Main Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif italic text-2xl font-bold tracking-wider text-white hover:text-luxury-gold transition">
                {siteConfig.brandName}
              </span>
              <span className="block text-[8px] uppercase tracking-[0.3em] text-luxury-gold font-mono">
                Luxury Press-On Nails
              </span>
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-xs">
              Meticulously painted, double gel top-coated reusable press-ons designed for every occasion. Curating high-speed salon elegance to your doorstep.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 text-stone-400 hover:text-luxury-rosegold hover:bg-stone-800 flex items-center justify-center transition"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`${siteConfig.whatsappUrlPrefix}?text=Hello, I want to talk about press-on designs!`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 text-stone-400 hover:text-emerald-500 hover:bg-stone-800 flex items-center justify-center transition"
                aria-label="Direct WhatsApp Message"
              >
                <Phone size={14} />
              </a>
            </div>
          </div>

          {/* Quick shop Links Col */}
          <div className="space-y-4">
            <h4 className="font-serif italic font-semibold text-white tracking-wide text-sm">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/shop?category=nudes" className="hover:text-luxury-gold transition block py-0.5">
                  Luxury Nudes & Cushions
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bridal" className="hover:text-luxury-gold transition block py-0.5">
                  Bridal & RSVP Glam
                </Link>
              </li>
              <li>
                <Link to="/shop?category=french" className="hover:text-luxury-gold transition block py-0.5">
                  Modern French & Solitaires
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cat-eye" className="hover:text-luxury-gold transition block py-0.5">
                  Velvet & Magnetic Cat-Eye
                </Link>
              </li>
              <li>
                <Link to="/shop?category=statement-art" className="hover:text-luxury-gold transition block py-0.5">
                  Hand-painted Statement Art
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Info Links Col */}
          <div className="space-y-4">
            <h4 className="font-serif italic font-semibold text-white tracking-wide text-sm">Customer Care</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/about" className="hover:text-luxury-gold transition block py-0.5">
                  Sizing Guide Helper
                </Link>
              </li>
              <li>
                <Link to="/about#preparation-kit" className="hover:text-luxury-gold transition block py-0.5">
                  Whats inside Prep-Kit?
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-luxury-gold transition block py-0.5">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about#shipping-returns" className="hover:text-luxury-gold transition block py-0.5">
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-luxury-gold transition block py-0.5">
                  Bespoke WhatsApp Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-4">
            <h4 className="font-serif italic font-semibold text-white tracking-wide text-sm">Join the Club</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe to unlock drop alerts of handmade collections and secret 15% discount codes.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="flex items-center relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-900 text-white placeholder-stone-500 rounded text-xs px-3 py-2 pr-10 border border-stone-800 focus:outline-none focus:border-luxury-gold w-full transition"
                />
                <button type="submit" className="absolute right-2 text-stone-400 hover:text-luxury-gold transition">
                  <Send size={14} />
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-emerald-400 animate-pulse">
                  ✨ Welcome to luxury. Check your inbox soon!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Address and location marker bottom segment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-stone-800 py-6 text-[11px] text-stone-500">
          <div className="flex items-center space-x-1.5 justify-center md:justify-start">
            <MapPin size={12} className="text-luxury-gold" />
            <span>Navsari, Gujarat, India</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-center">
            <Mail size={12} className="text-luxury-gold" />
            <span>{siteConfig.email}</span>
          </div>
          <div className="flex items-center space-x-1.5 justify-center md:justify-end">
            <Phone size={12} className="text-luxury-gold" />
            <span>Support: WhatsApp Chat</span>
          </div>
        </div>

        {/* Made by section */}
       {/* Made by section */}
<div className="border-t border-stone-800/50 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-600 font-mono">

  <p>
    &copy; 2026 {siteConfig.brandName}. All rights reserved.
  </p>

  <p className="mt-1 sm:mt-0 flex flex-wrap items-center justify-center gap-1 text-center">

    <span>Handcrafted with 🤍 in Navsari · </span>

    <a
      href="https://umanztechnology.in"
      target="_blank"
      rel="noopener noreferrer"
      className="text-luxury-gold hover:text-luxury-rosegold hover:underline transition duration-300 font-semibold"
    >
     Crafted by  Umanz Technology
    </a>

  </p>

</div>

      </div>
    </footer>
  );
};
