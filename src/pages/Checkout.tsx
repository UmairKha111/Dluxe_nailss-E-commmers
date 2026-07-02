import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ArrowUpRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
 
// Your WhatsApp business number (no + or spaces)
const WHATSAPP_NUMBER = '919023437319';
 
export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
 
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const hasRedirected = useRef(false);
 
  // ── Empty cart ──────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="text-center space-y-5 max-w-xs w-full mx-auto">
          <span className="bg-luxury-beige-200 text-luxury-gold p-5 rounded-full inline-flex items-center justify-center">
            <ShoppingBag size={24} />
          </span>
          <h2 className="font-serif text-lg font-bold leading-snug">
            Your bag is empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Please add a design from our collection before heading to WhatsApp.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto bg-luxury-charcoal text-white hover:bg-stone-800 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition"
          >
            Explore Collections
          </button>
        </div>
      </div>
    );
  }
 
  // ── Build WhatsApp message from cart + auto-redirect on mount ──
  useEffect(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
 
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `\n🛒 *${index + 1}. ${item.product.name}*\n`;
      itemsText += `   · Price: _₹${item.product.price}_\n`;
    });
 
    const whatsappMessage =
      `✨ *D LUXE NAILS* ✨\n\n` +
      `Hi! I wanted to order:\n` +
      `${itemsText}\n` +
      `💰 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n\n` +
      `Could you please help me with sizing, customization, and next steps? 🙏`;
 
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
 
    setWaUrl(url);
    window.open(url, '_blank');
  }, [cart, subtotal]);
 
  const handleDoneReset = () => {
    clearCart();
    navigate('/');
  };
 
  // ── Redirect confirmation screen ─────────────────────────
  return (
    <div className="w-full px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-luxury-beige-300 rounded p-6 sm:p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-luxury-rosegold to-luxury-gold" />
 
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
            <Check size={28} />
          </div>
 
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-[0.2em] font-bold block">
              Taking You to WhatsApp
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide leading-snug">
              Let's finish this on WhatsApp
            </h1>
            <p className="font-mono text-stone-500 text-[10px] sm:text-[11px]">
              We've prepared your order details for our nail artist.
            </p>
          </div>
 
          <div className="bg-luxury-beige-100 p-4 sm:p-5 rounded border border-luxury-beige-300 text-xs text-left text-stone-700 leading-relaxed space-y-3">
            <p className="font-semibold text-center italic text-luxury-gold-dark text-[12px] sm:text-[13px] border-b border-stone-200 pb-2">
              Almost there!
            </p>
            <p>
              A WhatsApp chat should have opened automatically with your
              selected design(s) and price. We'll personally confirm sizing,
              customization, pricing, and delivery with you there.
            </p>
            <p>
              <strong>If WhatsApp didn't open automatically:</strong> tap the
              button below to start the chat manually.
            </p>
          </div>
 
          <div className="flex flex-col gap-3 pt-2">
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-4 rounded text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle size={15} />
                <span>💬 Order via WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>
            )}
 
            <button
              onClick={handleDoneReset}
              className="w-full border border-luxury-beige-300 hover:bg-stone-50 text-luxury-charcoal px-6 py-4 rounded text-xs font-bold uppercase tracking-wider transition font-mono"
            >
              Back to Store Home
            </button>
          </div>
 
          <div className="border-t border-stone-100 pt-4 text-[10px] text-stone-400 font-mono">
            Handcrafted with 🤍 by D Luxe Nails · Navsari, Gujarat
          </div>
        </div>
      </div>
    </div>
  );
};