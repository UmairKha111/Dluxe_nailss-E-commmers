import React, { useState } from 'react';
import { MessageCircle, Instagram, MapPin, Mail, Phone, Clock, Send, Sparkles, AlertCircle, Check } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inspiration, setInspiration] = useState('Pinterest Custom Request');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compose custom consultation WhatsApp pre-fill text
    const textMsg = `Hi D Luxe Nails! 💅 I would love to start a custom manicure design consultation with you!\n\n` +
      `👤 *My Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🎨 *Preferred style:* ${inspiration}\n` +
      `📋 *Notes/Ideas:* ${notes || 'Not specified'}\n\n` +
      `_I am sending this from your online boutique and have my reference design screenshots ready to share on WhatsApp!_`;

    const encoded = encodeURIComponent(textMsg);
    window.open(`${siteConfig.whatsappUrlPrefix}?text=${encoded}`, '_blank');
    setSubmitted(true);
    setName('');
    setPhone('');
    setNotes('');
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-bold">Get In Touch</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-luxury-charcoal tracking-wide">
          Talk Beauty With Us
        </h1>
        <div className="w-12 h-[1px] bg-luxury-gold mx-auto" />
        <p className="text-xs text-stone-605 leading-relaxed">
          Need structural advice, sizing millimeter validation, or want to paint custom Pinterest coordinates? Tap into our channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: INFORMATION & STUDIO INFO (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-luxury-beige-200 rounded p-6 shadow-xs space-y-6">
            <h3 className="font-serif font-semibold text-lg text-luxury-charcoal border-b border-stone-100 pb-3">
              Direct Channels
            </h3>

            <div className="space-y-4">
              {/* WhatsApp Row */}
              <a
                href={`${siteConfig.whatsappUrlPrefix}?text=Hi D Luxe Nails! I would like to order / inquire about customized nails!`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3.5 p-3 border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 rounded transition-all group"
              >
                <span className="p-2.5 bg-emerald-600 rounded-full text-white group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle size={18} />
                </span>
                <div className="text-left text-xs">
                  <strong className="block text-emerald-800">Support & Design on WhatsApp</strong>
                  <span className="text-[11px] text-stone-500 font-mono">{siteConfig.whatsappNumber}</span>
                </div>
              </a>

              {/* Instagram Row */}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3.5 p-3 border border-pink-100 bg-pink-50/20 hover:bg-pink-50/50 rounded transition-all group"
              >
                <span className="p-2.5 bg-luxury-rosegold text-white rounded-full group-hover:scale-105 transition-transform shrink-0">
                  <Instagram size={18} />
                </span>
                <div className="text-left text-xs">
                  <strong className="block text-pink-850">Follow @{siteConfig.instagramUsername}</strong>
                  <span className="text-[11px] text-stone-500 font-mono">D Luxe Nails Direct Portfolio</span>
                </div>
              </a>
            </div>

            {/* Flat text info grids */}
            <div className="space-y-4 pt-4 border-t border-stone-100 text-xs">
              <div className="flex items-start space-x-3 text-stone-650">
                <MapPin size={15} className="text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <strong>Studio Workshop Hub</strong>
                  <p className="text-[11px] text-stone-550 mt-0.5">Navsari, Gujarat, India (Pan-India delivery maps)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-stone-650">
                <Mail size={15} className="text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <strong>Email Coordination</strong>
                  <p className="text-[11px] text-stone-550 mt-0.5">{siteConfig.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-stone-650">
                <Clock size={15} className="text-luxury-gold shrink-0 mt-0.5" />
                <div>
                  <strong>Active Consulting Hours</strong>
                  <p className="text-[11px] text-stone-550 mt-0.5">Monday – Sunday · 10:00 AM – 8:00 PM IST</p>
                </div>
              </div>
            </div>

          </div>

          {/* POLICY SHORT GUIDE BOX */}
          <div className="bg-luxury-beige-200 border border-luxury-beige-300 rounded p-5 text-center space-y-2 text-xs">
            <span className="p-2 bg-white rounded-full inline-block text-luxury-gold mb-1">
              <Sparkles size={16} />
            </span>
            <strong className="block text-luxury-charcoal">Design Customizations:</strong>
            <p className="text-[11px] text-stone-605 max-w-sm mx-auto leading-relaxed">
              We translate any screenshot files or sketches from Pinterest directly into custom orders. Standard dispatch spans 3-5 craft days.
            </p>
          </div>
        </div>

        {/* RIGHT: CONSULTATION & CUSTOM FORM (Col span 7) */}
        <div className="lg:col-span-7 bg-white border border-luxury-beige-200 rounded p-6 md:p-8 space-y-6">
          <h2 className="font-serif font-bold text-base text-luxury-charcoal border-b border-stone-200 pb-3 flex items-center space-x-2">
            <Sparkles size={15} className="text-luxury-gold" />
            <span>Style Consultation Form</span>
          </h2>

          <form onSubmit={handleConsultSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5Col-span-2">
                <label htmlFor="ref-name" className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Name *</label>
                <input
                  id="ref-name"
                  type="text"
                  required
                  placeholder="Ritu Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition font-sans"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="ref-phone" className="text-[10px] uppercase font-mono font-bold text-stone-400 block">WhatsApp Number *</label>
                <input
                  id="ref-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
                />
              </div>

              {/* Inspiration */}
              <div className="space-y-1.5">
                <label htmlFor="ref-source" className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Inspiration Source *</label>
                <select
                  id="ref-source"
                  value={inspiration}
                  onChange={(e) => setInspiration(e.target.value)}
                  className="w-full bg-stone-55 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:border-luxury-gold focus:bg-white"
                >
                  <option value="Pinterest Custom Request">Pinterest Custom Design</option>
                  <option value="Bridal Custom Coordinate">Bridal Custom Suit Match</option>
                  <option value="Instagram Selected Post">Selected @dluxe_nailss Post</option>
                  <option value="Minimal modification list">Minor Detail Modification</option>
                </select>
              </div>

            </div>

            {/* Custom Notes */}
            <div className="space-y-1.5">
              <label htmlFor="ref-desc" className="text-[10px] uppercase font-mono font-bold text-stone-400 block">Design Notes & Sizing metrics</label>
              <textarea
                id="ref-desc"
                rows={4}
                required
                placeholder="e.g. Please design a velvet chrome magnetic tip set with mini pearls. My custom millimeter measurements are 15, 11, 12, 11, 9mm."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white font-mono leading-normal"
              />
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3.5 flex items-center space-x-2 text-[11px] text-emerald-800 animate-pulse">
                <Check size={14} className="text-emerald-600" />
                <span>Consultation receipt generated! Launching WhatsApp thread to chat with our artist...</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-luxury-charcoal hover:bg-stone-850 text-white rounded py-3.5 text-xs font-bold uppercase tracking-wider transition-all shadow flex items-center justify-center space-x-1.5"
            >
              <Send size={12} />
              <span>Launch WhatsApp Consultation</span>
            </button>

          </form>
        </div>

      </div>

      {/* 3. MAP SEGMENT MOCKUP (GEOLOCATION VISUAL) */}
      <section className="bg-white border border-luxury-beige-200 rounded p-6 md:p-8 space-y-6">
        <div className="space-y-1 text-center">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-bold block">Physical Base</span>
          <h3 className="font-serif font-bold text-lg text-luxury-charcoal">The Navsari Curation Studio</h3>
          <p className="text-xs text-stone-550">Mailing coordinates and secure shipping origin based in Navsari, Gujarat, India.</p>
        </div>

        {/* MAP MOCKUP GRAPHIC */}
        <div className="relative h-64 md:h-80 rounded overflow-hidden shadow-inner border border-luxury-beige-300 bg-luxury-beige-200 flex flex-col items-center justify-center text-center p-6 space-y-3">
          {/* Subtle grid pattern background mockup */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1c1917_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          
          <span className="p-3 bg-white rounded-full text-luxury-gold shadow-md text-red-500 scale-110">
            <MapPin size={28} className="fill-red-200 animate-bounce" />
          </span>

          <div className="z-10 text-xs text-stone-700 max-w-sm space-y-1">
            <strong className="block text-sm font-serif font-bold text-luxury-charcoal">D Luxe Nails Studio Hub</strong>
            <p className="font-mono text-[11px] text-stone-500">Maku fied Coordinates: Navsari, Gujarat, India - 396445</p>
            <p className="text-[10px] text-stone-400">Standard direct pan-India shipping via reliable courier channels (DTDC, Bluedart, Speed Post).</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs text-[9.5px] uppercase font-mono text-luxury-gold-dark font-bold px-3 py-1 rounded border border-luxury-gold/20 select-none">
            📍 Mapping active: pan-india express courier routing
          </div>
        </div>
      </section>

    </div>
  );
};
