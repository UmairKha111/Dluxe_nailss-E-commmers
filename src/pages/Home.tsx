import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Heart, ArrowRight, ArrowLeft, Instagram, Sparkles, MessageCircle, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import { siteConfig } from '../data/siteConfig';
import { faqs } from '../data/faqs';
import { categories } from '../data/categories';
import { ProductCard } from '../components/products/ProductCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  // Take first 4 products for Featured, and next 4 for Trending
  const featuredProducts = products.filter(p => p.badges?.includes('Best Seller') || p.badges?.includes('New')).slice(0, 4);
  const trendingProducts = products.filter(p => p.badges?.includes('Trending') || p.badges?.includes('Limited Edition')).slice(0, 4);

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % testimonials.length);
  };
  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx(activeFaqIdx === idx ? null : idx);
  };

  const handleWhatsappBespoke = () => {
    const customText = encodeURIComponent(
      'Hi D Luxe Nails! I am visiting your website and would love to design a completely bespoke press-on set with you! Here is my idea: '
    );
    window.open(`${siteConfig.whatsappUrlPrefix}?text=${customText}`, '_blank');
  };

  return (
    <div id="home-page-container" className="space-y-16 md:space-y-24 bg-luxury-beige-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-luxury-beige-200 to-luxury-beige-100 py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center space-x-1 bg-white border border-luxury-gold/30 px-3.5 py-1 rounded-full text-[10px] font-semibold text-luxury-gold-dark uppercase tracking-[0.2em] font-mono shadow-xs">
              <Sparkles size={11} className="animate-spin text-luxury-gold" />
              <span>Premium Pan-India Nail Boutique</span>
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-luxury-charcoal leading-tight tracking-wide">
              Luxury Handmade <br className="hidden md:inline" />
              <span className="italic font-medium text-luxury-gold-dark">Press-On Nails</span>
            </h1>
            
            <p className="text-sm text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Custom crafted, professional salon-grade gel nail designs for every occasion. Reusable, double-coated, and ready to apply in 10 minutes from Navsari, Gujarat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-luxury-charcoal text-white hover:bg-stone-850 px-8 py-3.5 rounded text-xs font-bold uppercase tracking-wider transition text-center flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <ShoppingBag size={14} />
                <span>Shop Collection</span>
              </Link>
              
              <button
                onClick={handleWhatsappBespoke}
                className="w-full sm:w-auto border border-luxury-charcoal text-luxury-charcoal bg-white/50 hover:bg-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-wider transition text-center flex items-center justify-center space-x-2"
              >
                <MessageCircle size={14} className="text-emerald-600fill-emerald-600" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-sm mx-auto lg:mx-0 text-center border-t border-luxury-beige-300">
              <div>
                <span className="block font-serif text-lg font-bold text-luxury-gold-dark">100%</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">Handpainted</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-luxury-gold-dark">Re-use</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">Up to 8x</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-bold text-luxury-gold-dark">10 Min</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">Application</span>
              </div>
            </div>
          </div>

          {/* Hero Right Banner Image */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-luxury-beige-300 rounded-lg transform rotate-2 -z-10 scale-[1.01]" />
            <div className="relative overflow-hidden rounded-lg shadow-2xl border border-luxury-beige-300 bg-stone-100">
              <img
                src="/src/assets/images/d_luxe_nails_hero_banner_1781850750589.jpg"
                alt="D Luxe Nails Exquisite Manicure Display Banner"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover min-h-[300px] md:min-h-[450px]"
              />
              
              {/* Overlaid caption badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded shadow border border-luxury-beige-300/40 max-w-[220px]">
                <p className="font-serif italic text-xs font-bold text-luxury-charcoal">"Custom fits so perfect people won't believe they are false."</p>
                <span className="block text-[8px] uppercase tracking-widest text-luxury-gold font-mono text-right mt-1 font-semibold">— @dluxe_nailss</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CHOOSE BY CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold">Exquisite Designs</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">Browse Collections</h2>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group relative h-48 md:h-60 rounded overflow-hidden border border-luxury-beige-200 bg-stone-200"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3.5" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 text-white text-left">
                <h3 className="font-serif italic text-sm font-semibold tracking-wide group-hover:text-luxury-beige-300 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[8px] uppercase tracking-widest font-mono text-luxury-gold/90 mt-0.5 block group-hover:underline">
                  View sets &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-luxury-beige-300 pb-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-mono font-semibold text-luxury-gold tracking-widest">Handmade Best Sellers</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">The Signature Edits</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase font-mono font-bold text-luxury-gold-dark hover:text-luxury-charcoal transition tracking-widest flex items-center space-x-1.5 mt-2 sm:mt-0"
          >
            <span>View All Collections</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US (LUXURY INFOGRAPHICS) */}
      <section className="bg-luxury-beige-200 py-16 md:py-20 px-4 md:px-8 border-y border-luxury-beige-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase font-mono text-luxury-gold-dark tracking-widest font-bold block">The Craft Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-charcoal tracking-wide">
              Salon Caliber, <br />
              In Ten Minutes flat.
            </h2>
            <div className="w-12 h-1 bg-luxury-gold" />
            <p className="text-xs text-stone-605 leading-relaxed">
              Every coordinate of D Luxe Nails is meticulously painted layer-by-layer using genuine salon UV-cured gel colors. They feature thickness comparable to premium salon-installed acrylics but hold zero chemicals, retaining the healthy integrity of your natural nail foundation.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-xs leading-relaxed">
                <span className="p-1 bg-white rounded text-luxury-gold mt-0.5">
                  <RefreshCw size={14} />
                </span>
                <div>
                  <strong className="text-luxury-charcoal block">Infinite Reusability</strong>
                  <span className="text-stone-500">Carefully remove them with warm soapy-water and use our replacement tabs to style them over and over up to 8 times!</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs leading-relaxed">
                <span className="p-1 bg-white rounded text-luxury-gold mt-0.5">
                  <ShieldCheck size={14} />
                </span>
                <div>
                  <strong className="text-luxury-charcoal block">Zero Nail Bed Damage</strong>
                  <span className="text-stone-500">Unlike heavy filing and toxic monomers at brick salons, our adhesive tabs provide damage-free, clean luxury.</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs leading-relaxed">
                <span className="p-1 bg-white rounded text-luxury-gold mt-0.5">
                  <Layers size={14} />
                </span>
                <div>
                  <strong className="text-luxury-charcoal block">Reinforced Apex Structure</strong>
                  <span className="text-stone-500">Cured under professional-grade LED lamps for heavy strength, preventing tips from breaking or splitting.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 bg-white rounded-lg p-6 md:p-8 border border-luxury-beige-300 grid grid-cols-1 md:grid-cols-2 gap-6 relative shadow-lg">
            <div className="absolute top-4 right-4 text-[10px] uppercase font-mono font-bold text-luxury-gold">Active Crafting Studio</div>
            <div className="space-y-4">
              <span className="text-3xl text-luxury-gold font-serif italic">01</span>
              <h3 className="text-sm font-bold font-serif text-luxury-charcoal mb-1">Tailored To Your Size</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                We design press-ons to fit your unique millimeter proportions (XS, S, M, L or custom millimeter measures), avoiding standard generic fits that pinch your nail edges.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-3xl text-luxury-gold font-serif italic">02</span>
              <h3 className="text-sm font-bold font-serif text-luxury-charcoal mb-1">The 6-Piece Prep Kit</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Every luxury order arrives inside an organic premium box complete with liquid holding glue, dual tab adhesives, buffers, and orange sticks.
              </p>
            </div>
            <div className="space-y-4 border-t border-stone-100 pt-6">
              <span className="text-3xl text-luxury-gold font-serif italic">03</span>
              <h3 className="text-sm font-bold font-serif text-luxury-charcoal mb-1">Bespoke Whatsapp Inquiries</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Spotted a Pinterest design or Instagram tip you loved? Text us! We translate your screen goals directly into custom hand-painted press-ons.
              </p>
            </div>
            <div className="space-y-4 border-t border-stone-100 pt-6">
              <span className="text-3xl text-luxury-gold font-serif italic">04</span>
              <h3 className="text-sm font-bold font-serif text-luxury-charcoal mb-1">Curated From Gujarat</h3>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Hand-painted, packaged, and shipped directly from our private wellness-prepped studio space based in Navsari with pan-India express packaging.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TRENDING NAILS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold">Active Trend Radar</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">The Cat-Eye & Art Series</h2>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto" />
          <p className="text-xs text-stone-500 leading-relaxed">
            These designs are currently going viral on Instagram. Secure yours before materials sell out.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {trendingProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. VERIFIED REVIEWS CAROUSEL */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold block">Client Endorsements</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">What D Luxe Club Says</h2>
        </div>

        <div id="reviews-carousel" className="relative bg-white border border-luxury-beige-200/80 rounded-sm py-12 px-6 md:px-12 shadow-sm">
          {/* Quick quote indicator */}
          <span className="absolute top-4 left-6 text-5xl font-serif text-luxury-beige-300 italic">“</span>
          
          <div className="space-y-4 animate-fade-in" key={activeReviewIdx}>
            {/* Stars */}
            <div className="flex justify-center text-amber-400">
              {Array.from({ length: testimonials[activeReviewIdx].rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400" />
              ))}
            </div>

            <p className="text-sm md:text-base font-serif italic text-stone-800 leading-relaxed">
              "{testimonials[activeReviewIdx].comment}"
            </p>

            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-luxury-charcoal">
                {testimonials[activeReviewIdx].name}
              </h4>
              <p className="text-[10px] text-stone-400 font-mono flex items-center justify-center space-x-1">
                <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Verified Club Buyer · {testimonials[activeReviewIdx].date}</span>
              </p>
              {testimonials[activeReviewIdx].productName && (
                <span className="inline-block bg-luxury-beige-200 text-luxury-gold-dark text-[9px] font-mono px-2 py-0.5 mt-1">
                  Ordered: {testimonials[activeReviewIdx].productName}
                </span>
              )}
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              onClick={prevReview}
              className="w-10 h-10 border border-luxury-beige-300 rounded-full hover:bg-stone-50 text-luxury-charcoal flex items-center justify-center transition"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 border border-luxury-beige-300 rounded-full hover:bg-stone-50 text-luxury-charcoal flex items-center justify-center transition"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM GALLERY CURATE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold flex items-center justify-center space-x-1">
            <Instagram size={11} className="text-luxury-rosegold-dark" />
            <span>@dluxe_nailss</span>
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">The Gram Curation</h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto" />
          <p className="text-xs text-stone-500">
            Real clients, real manicures, real aesthetic luxury. Mention us on Instagram to be featured!
          </p>
        </div>

        {/* Curation photos grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[
            { img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=500', href: siteConfig.instagramUrl },
            { img: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=500', href: siteConfig.instagramUrl },
            { img: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=500', href: siteConfig.instagramUrl },
            { img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=500', href: siteConfig.instagramUrl },
            { img: 'https://images.unsplash.com/photo-1629191122116-378345781a98?q=80&w=500', href: siteConfig.instagramUrl },
            { img: 'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=500', href: siteConfig.instagramUrl }
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square block overflow-hidden bg-stone-100 rounded border border-luxury-beige-200"
            >
              <img
                src={item.img}
                alt="Instagram Client Nail Art manicured showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-luxury-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2 bg-white rounded-full text-luxury-charcoal shadow-lg hover:scale-115 transition duration-300">
                  <Instagram size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 8. MINI FAQ HIGHLIGHT ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-semibold">Any Ambiguity?</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">Help & Core FAQs</h2>
          <div className="w-12 h-[1px] bg-luxury-gold mx-auto" />
        </div>

        <div className="space-y-2">
          {faqs.slice(0, 4).map((faq, idx) => (
            <div
              key={faq.id}
              className="bg-white border border-luxury-beige-200 rounded overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 md:p-5 flex justify-between items-center bg-white hover:bg-stone-50 font-serif font-semibold text-xs md:text-sm text-luxury-charcoal tracking-wide transition"
              >
                <span>{faq.question}</span>
                <span className="text-luxury-gold text-lg">{activeFaqIdx === idx ? '−' : '+'}</span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out bg-luxury-beige-100/30 border-t border-luxury-beige-200/50 ${
                  activeFaqIdx === idx ? 'max-h-56 p-4 md:p-5' : 'max-h-0 overflow-hidden py-0'
                }`}
              >
                <p className="text-xs text-stone-605 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/faq"
            className="text-xs font-semibold text-luxury-gold-dark hover:text-luxury-charcoal transition underline"
          >
            View all frequently asked questions &rarr;
          </Link>
        </div>
      </section>

      {/* 9. EXQUISITE CONTACT BANNER ROW */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-luxury-beige-300 rounded overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-luxury-beige-400 p-8 md:p-12 gap-8 items-center relative">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal leading-tight">
              Looking for a custom sizing guide or bespoke handpainted Pinterest design?
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed max-w-xl">
              We love chatting and designing custom orders! Simply tap our artist WhatsApp link below, explain your custom size parameters or share screenshots of any reference designs, and we will build you a personalized box.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <button
              onClick={() => {
                const prompt = encodeURIComponent('Hi D Luxe Nails, I am on your home design gallery page and want to enquire about styling a custom request! 💅');
                window.open(`${siteConfig.whatsappUrlPrefix}?text=${prompt}`, '_blank');
              }}
              className="bg-luxury-charcoal text-white hover:bg-stone-850 px-8 py-4 rounded text-xs font-bold uppercase tracking-wider transition shadow flex items-center space-x-2"
            >
              <MessageCircle size={15} />
              <span>Tap to Chat with Artist</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
