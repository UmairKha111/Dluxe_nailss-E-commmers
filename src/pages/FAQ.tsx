import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, Sparkles, Sliders, ArrowUpRight, HelpCircle as HelpIcon, MessageCircle } from 'lucide-react';
import { faqs } from '../data/faqs';
import { siteConfig } from '../data/siteConfig';

export const FAQ: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const uniqueCategories = ['general', 'sizing', 'application', 'shipping'];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      // Category lock
      if (activeCategory !== 'all' && faq.category !== activeCategory) {
        return false;
      }
      
      // Search tag lock
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const questionMatch = faq.question.toLowerCase().includes(query);
        const answerMatch = faq.answer.toLowerCase().includes(query);
        if (!questionMatch && !answerMatch) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div id="faq-page-wrapper" className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-bold">Frequently Asked Questions</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-luxury-charcoal tracking-wide">
          Help & Sizing FAQ
        </h1>
        <div className="w-12 h-[1px] bg-luxury-gold mx-auto" />
      </div>

      {/* SEARCH AND FILTER CLIPS */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search questions about sizing, wear time, application..."
            value={searchQuery}
            aria-label="Search FAQs"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-luxury-beige-300 rounded px-4 py-3 pl-10 text-xs focus:outline-none focus:border-luxury-gold"
          />
          <Search size={14} className="absolute left-4 top-3.5 text-stone-400" />
        </div>

        {/* Categories clips row */}
        <div className="flex flex-wrap justify-center gap-1.5 text-[10.5px]">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded transition font-medium border uppercase tracking-wider font-mono ${
              activeCategory === 'all'
                ? 'bg-luxury-charcoal text-white border-luxury-charcoal shadow-sm'
                : 'bg-white text-stone-600 border-luxury-beige-300 hover:bg-stone-50'
            }`}
          >
            All Questions
          </button>
          {uniqueCategories.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setActiveCategory(catKey)}
              className={`px-3.5 py-1.5 rounded transition font-semibold border uppercase tracking-wider font-mono ${
                activeCategory === catKey
                  ? 'bg-luxury-charcoal text-white border-luxury-charcoal shadow-sm'
                  : 'bg-white text-stone-600 border-luxury-beige-300 hover:bg-stone-50'
              }`}
            >
              {catKey === 'sizing' && 'Sizing Guides'}
              {catKey === 'application' && 'Application & removal'}
              {catKey === 'shipping' && 'Logistics & Shipping'}
              {catKey === 'general' && 'General benefits'}
            </button>
          ))}
        </div>
      </div>

      {/* ACCORDION CONTAINER */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-xs text-stone-500 font-mono border border-luxury-beige-200 rounded bg-white">
            No FAQ entries match your active searching key words.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-luxury-beige-200 rounded overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveFaqId(isOpen ? null : faq.id);
                  }}
                  className="w-full text-left p-4 md:p-5 flex justify-between items-start bg-white hover:bg-stone-50 font-serif font-bold text-xs md:text-sm text-luxury-charcoal tracking-wide transition"
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-luxury-gold text-lg shrink-0 -mt-1 font-mono">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out bg-luxury-beige-100/30 border-t border-luxury-beige-200/50 ${
                    isOpen ? 'max-h-72 p-4 md:p-5' : 'max-h-0 overflow-hidden py-0'
                  }`}
                >
                  <p className="text-xs text-stone-650 leading-relaxed md:text-stone-750">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* BESPOKE REDIRECT BANNER */}
      <div className="bg-luxury-beige-200 border border-luxury-beige-350 rounded p-6 md:p-8 text-center space-y-4 max-w-2xl mx-auto">
        <span className="p-3 bg-white rounded-full inline-block text-luxury-gold shadow-sm">
          <HelpIcon size={20} />
        </span>
        <h3 className="font-serif italic text-lg font-bold text-luxury-charcoal">Still have custom sizing or application doubts?</h3>
        <p className="text-xs text-stone-650 max-w-md mx-auto leading-relaxed">
          We want to make sure your handmade press-on nails feel like second nature. Text us directly on WhatsApp with your questions, and our artist will reply with instructions.
        </p>
        <button
          onClick={() => {
            const msg = encodeURIComponent('Hi D Luxe Nails! I had a few questions about custom sizing / application procedures!');
            window.open(`${siteConfig.whatsappUrlPrefix}?text=${msg}`, '_blank');
          }}
          className="bg-luxury-charcoal hover:bg-stone-850 text-white text-xs px-6 py-2.5 rounded font-bold uppercase tracking-wider transition shadow flex items-center space-x-1.5 mx-auto"
        >
          <MessageCircle size={14} />
          <span>Tap to Chat with Artist</span>
          <ArrowUpRight size={12} />
        </button>
      </div>

    </div>
  );
};
