import React from 'react';
import { Sparkles, MessageCircle, Ruler, Box, Check, RefreshCw, Layers, ShieldCheck, Heart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const About: React.FC = () => {
  return (
    <div id="about-page-container" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16">
      
      {/* 1. BRAND STORY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-luxury-beige-200 rounded p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-beige-200/50 rounded-bl-full pointer-events-none" />
        
        {/* Left Column Text details */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] uppercase font-mono text-luxury-gold-dark tracking-widest font-bold block">Since 2024</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-luxury-charcoal tracking-wide leading-tight">
            Our Story: <br />
            Meet <span className="italic text-luxury-gold">D Luxe Nails</span>
          </h1>
          <div className="w-12 h-1 bg-luxury-gold" />
          
          <p className="text-xs md:text-sm text-stone-650 leading-relaxed">
            {siteConfig.aboutText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            <div className="space-y-1">
              <strong className="text-xs uppercase tracking-wide font-serif text-luxury-charcoal">Our Mission</strong>
              <p className="text-[11px] text-stone-500 leading-relaxed">{siteConfig.mission}</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs uppercase tracking-wide font-serif text-luxury-charcoal">Our Vision</strong>
              <p className="text-[11px] text-stone-500 leading-relaxed">{siteConfig.vision}</p>
            </div>
          </div>
        </div>

        {/* Right Column visual cosmetic illustration card */}
        <div className="lg:col-span-5 bg-luxury-beige-200 border-2 border-dashed border-luxury-beige-400 p-6 md:p-8 rounded space-y-4">
          <span className="p-3 bg-white rounded-full inline-block text-luxury-gold">
            <Sparkles size={20} className="animate-pulse" />
          </span>
          <h3 className="font-serif italic font-bold text-base text-luxury-charcoal">The Handmade Prestige</h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            Every set is constructed on durable full-coverage acrylic base structures, coated with premium gel primers, double encapsulated to avoid chrome flaking, and sanitarily wrapped inside private client kits.
          </p>
          <div className="bg-white p-3 rounded text-[10px] font-mono text-stone-500 flex items-center justify-between">
            <span>STUDIO ORIGIN:</span>
            <span className="font-bold text-luxury-charcoal">Navsari, Gujarat</span>
          </div>
        </div>
      </section>

      {/* 2. HANDCRAFTED MANUAL STEPS */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold block">Craft Step-By-Step</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">The Curing Process</h2>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {siteConfig.handmadeProcess.map((step, idx) => {
            const [title, desc] = step.split(': ');
            return (
              <div
                key={idx}
                className="bg-white border border-luxury-beige-200 rounded p-5 space-y-3 shadow-xs hover:-translate-y-1 transition-transform"
              >
                <span className="text-2xl text-luxury-gold font-serif italic block">0{idx + 1}</span>
                <h4 className="font-serif font-bold text-xs text-luxury-charcoal">{title}</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SIZING GUIDE SECTION (THE HOLY GRAIL OF PRESS-ON STORE) */}
      <section id="sizing-guide" className="bg-luxury-beige-200 border border-luxury-beige-300 rounded p-6 md:p-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="p-2.5 bg-white rounded text-luxury-gold inline-block">
              <Ruler size={20} />
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-luxury-charcoal tracking-wide leading-tight">
              Sizing Helper Guide
            </h2>
            <p className="text-xs text-stone-705 leading-relaxed">
              Finding your size is simple! Correct press-ons depend entirely on the millimeter width across the widest parts of your natural nail plates. Follow our flat-ruler layout below to establish your coordinates.
            </p>

            <div className="bg-white p-4 rounded border border-luxury-beige-300 space-y-3.5 text-xs">
              <strong className="block text-luxury-charcoal uppercase tracking-wider text-[10px] font-mono">How to measure:</strong>
              <div className="space-y-2 font-light leading-relaxed">
                <p>
                  <strong>Steps:</strong> Take a piece of clear household sticky tape. Place it flat across the widest point of your natural nail plate, pressing into the side walls.
                </p>
                <p>
                  Mark the left and right boundaries with a fine pen. Peel the tape and place it flat alongside a standard school scale / ruler to read the width in millimeters (mm).
                </p>
                <p>
                  Perform this on all ten fingers. If they match our standard XS, S, M, or L models, you are set! If they diverge, choose <strong>"Custom" Sizing</strong> and write individual measures in checkout notes.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-5 md:p-8 rounded-lg shadow-sm border border-luxury-beige-300 space-y-6">
            <h3 className="font-serif font-bold text-sm text-luxury-charcoal pb-2 border-b border-stone-150">
              Millimeters Proportion Matrix
            </h3>

            {/* Sizes matrix row tables */}
            <div className="space-y-4">
              {[
                { size: 'XS (Extra Small)', thumb: '14mm', index: '10mm', middle: '11mm', ring: '10mm', pinky: '8mm' },
                { size: 'S (Small)', thumb: '15mm', index: '11mm', middle: '12mm', ring: '11mm', pinky: '9mm' },
                { size: 'M (Medium - Fits 75% of users)', thumb: '16mm', index: '12mm', middle: '13mm', ring: '12mm', pinky: '10mm' },
                { size: 'L (Large)', thumb: '18mm', index: '13mm', middle: '14mm', ring: '13mm', pinky: '11mm' }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2 text-xs border-b border-stone-105/55 pb-3">
                  <div className="md:col-span-2 font-semibold text-luxury-charcoal">{row.size}</div>
                  <div className="grid grid-cols-5 gap-1 md:col-span-4 font-mono text-[10.5px] text-stone-500">
                    <div className="text-center">T: {row.thumb}</div>
                    <div className="text-center">I: {row.index}</div>
                    <div className="text-center font-bold text-luxury-gold-dark">M: {row.middle}</div>
                    <div className="text-center">R: {row.ring}</div>
                    <div className="text-center">P: {row.pinky}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-stone-400 italic font-mono space-y-1">
              <p>* T = Thumb, I = Index, M = Middle, R = Ring, P = Pinky fingers.</p>
              <p>* For Custom packs, specify sizes in order: Thumb - pinky (e.g., L: 16-12-13-11-10 / R: 16-12-13-11-10).</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PREP KIT INCLUDE DETAIL */}
      <section id="preparation-kit" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Prep kit images */}
        <div className="lg:col-span-5 bg-stone-50 border border-luxury-beige-200 rounded p-6 text-center space-y-4">
          <span className="p-3 bg-luxury-beige-250/50 rounded-full inline-block text-luxury-gold">
            <Box size={24} />
          </span>
          <h3 className="font-serif italic font-bold text-lg text-luxury-charcoal">The 6-Piece Prep Kit</h3>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            Every set of handcrafted press-on nails purchased arrives wrapped alongside our luxury styling toolkit. No extra purchases required.
          </p>
          <div className="border border-luxury-gold/20 p-2 text-[9.5px] font-mono text-emerald-600 bg-emerald-50 rounded">
            ✨ Free standard box inclusion
          </div>
        </div>

        {/* List coordinates */}
        <div className="lg:col-span-7 space-y-4 text-xs">
          <span className="text-[10px] uppercase font-mono text-luxury-gold font-bold tracking-widest block">Everything Inside</span>
          <h3 className="font-serif font-bold text-xl text-luxury-charcoal">What arrives inside your luxe box:</h3>
          <div className="w-12 h-[1px] bg-luxury-gold" />
          
          <ul className="space-y-2.5">
            {siteConfig.prepKitIncludes.map((kitItem, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-stone-650 leading-relaxed md:text-stone-700">
                <Check size={14} className="text-emerald-600 shrink-0" />
                <span>{kitItem}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

    </div>
  );
};
