import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Check,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Receipt,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';
 
export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    total,
    discountAmount,
    shippingCharge,
    activeCoupon,
    clearCart,
  } = useCart();
 
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Gujarat');
  const [pincode, setPincode] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'WhatsApp' | 'COD' | 'UPI'>('WhatsApp');
 
  // Mobile: toggle invoice panel visibility on small screens
  const [invoiceOpen, setInvoiceOpen] = useState(false);
 
  // Success state
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    waUrl: string;
  } | null>(null);
 
  // ── Empty cart ──────────────────────────────────────────
  if (cart.length === 0 && !orderDetails) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="text-center space-y-5 max-w-xs w-full mx-auto">
          <span className="bg-luxury-beige-200 text-luxury-gold p-5 rounded-full inline-flex items-center justify-center">
            <ShoppingBag size={24} />
          </span>
          <h2 className="font-serif text-lg font-bold leading-snug">
            Checkout is locked
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Your luxury bag contains no press-on items. Please select styling
            coordinates before visiting checkout.
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
 
  // ── Submit ──────────────────────────────────────────────
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    const orderId = `DLN-${Math.floor(100000 + Math.random() * 900000)}`;
 
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `\n🛒 *${index + 1}. ${item.product.name}*\n`;
      itemsText += `   · Shape: _${item.selectedShape || item.product.shape}_\n`;
      itemsText += `   · Length: _${item.selectedLength || item.product.length}_\n`;
      itemsText += `   · Box Size: _Size ${item.selectedSize}_\n`;
      itemsText += `   · Quantity: _${item.quantity}_\n`;
      itemsText += `   · Unit Price: _₹${item.product.price}_\n`;
    });
 
    const whatsappMessage =
      `✨ *D LUXE NAILS - PRESTIGE ORDER REQUEST* ✨\n\n` +
      `*Order reference ID:* ${orderId}\n` +
      `📅 *Date:* ${new Date().toLocaleString()}\n` +
      `-------------------------------------------\n\n` +
      `👤 *CUSTOMER INFORMATION:*\n` +
      `· *Name:* ${fullName}\n` +
      `· *Phone:* ${phone}\n` +
      `· *Email:* ${email}\n\n` +
      `📍 *DELIVERY COORDINATES:*\n` +
      `· *Address:* ${address}\n` +
      `· *City / Pincode:* ${city} - ${pincode}\n` +
      `· *State:* ${stateName}\n\n` +
      `💅 *CUSTOMIZATION SPECIFICATIONS:*` +
      `${itemsText}\n` +
      `📋 *SPECIAL SIZING & NOTES:*\n` +
      `_${specialNotes || 'No custom millimeter notes provided (Using standard box proportions)'}_\n\n` +
      `-------------------------------------------\n` +
      `💳 *PRICING & PAYMENTS OVERVIEW:*\n` +
      `· *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      `${discountAmount > 0 ? `· *Coupon Applied:* ${activeCoupon?.code} (-₹${discountAmount})\n` : ''}` +
      `· *Courier Shipping:* ${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}\n` +
      `💰 *Grand Order Value:* *₹${total.toLocaleString('en-IN')}*\n` +
      `· *Preferred Transaction:* _${
        paymentMethod === 'WhatsApp'
          ? 'Bespoke Artist Verification'
          : paymentMethod === 'COD'
          ? 'Cash on Delivery (COD)'
          : 'Express UPI Scan Code'
      }_\n\n` +
      `-------------------------------------------\n` +
      `💅 _Thank you for choosing high-speed nail luxury. Navsari Gujarat manual workshop will begin painting your sets immediately!_`;
 
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919023437319?text=${encodedMessage}`;
 
    setOrderDetails({ orderId, waUrl: whatsappUrl });
    window.open(whatsappUrl, '_blank');
  };
 
  const handleDoneReset = () => {
    clearCart();
    navigate('/');
  };
 
  // ── Success Screen ──────────────────────────────────────
  if (orderDetails) {
    return (
      <div className="w-full px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-luxury-beige-300 rounded p-6 sm:p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-luxury-rosegold to-luxury-gold" />
 
            {/* Check icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
              <Check size={28} />
            </div>
 
            {/* Heading */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-[0.2em] font-bold block">
                Order Dispatched to Artist
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-luxury-charcoal tracking-wide leading-snug">
                Your nail card is generated!
              </h1>
              <p className="font-mono text-stone-500 text-[10px] sm:text-[11px] break-all">
                ORDER REFERENCE: {orderDetails.orderId}
              </p>
            </div>
 
            {/* Info box */}
            <div className="bg-luxury-beige-100 p-4 sm:p-5 rounded border border-luxury-beige-300 text-xs text-left text-stone-700 leading-relaxed space-y-3">
              <p className="font-semibold text-center italic text-luxury-gold-dark text-[12px] sm:text-[13px] border-b border-stone-200 pb-2">
                Next Action: Talk with our Nail Artist on WhatsApp!
              </p>
              <p>
                We have automatically generated a comprehensive receipt with your
                custom shape, length, size, and address parameters. This receipt
                has been queued to open under WhatsApp.
              </p>
              <p>
                <strong>If WhatsApp did not open automatically:</strong> Please
                tap the button below to send your invoice manually.
              </p>
            </div>
 
            {/* Action buttons — stack on mobile */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={orderDetails.waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-4 rounded text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle size={15} />
                <span>Retry Send on WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>
 
              <button
                onClick={handleDoneReset}
                className="w-full border border-luxury-beige-300 hover:bg-stone-50 text-luxury-charcoal px-6 py-4 rounded text-xs font-bold uppercase tracking-wider transition font-mono"
              >
                Back to Store Home
              </button>
            </div>
 
            <div className="border-t border-stone-100 pt-4 text-[10px] text-stone-400 font-mono">
              Direct coordination dispatch by D Luxe Nails · Navsari, Gujarat
            </div>
          </div>
        </div>
      </div>
    );
  }
 
  // ── Grand Total helper ──────────────────────────────────
  const grandTotal = total + (paymentMethod === 'COD' ? 50 : 0);
 
  // ── Main Checkout ───────────────────────────────────────
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto space-y-8">
 
        {/* Page heading */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-bold block">
            Prosthetic Sizing
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-luxury-charcoal tracking-wide leading-tight">
            Bespoke Dispatch Checkout
          </h1>
          <div className="w-12 h-[1px] bg-luxury-gold" />
        </div>
 
        {/* ── Mobile-only: collapsible invoice summary ── */}
        <div className="lg:hidden border border-luxury-beige-200 rounded bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => setInvoiceOpen(!invoiceOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-serif font-bold text-luxury-charcoal"
          >
            <span className="flex items-center gap-2">
              <Receipt size={15} className="text-luxury-gold" />
              Order Summary · ₹{grandTotal.toLocaleString('en-IN')}
            </span>
            {invoiceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
 
          {invoiceOpen && (
            <div className="px-4 pb-4 space-y-4 border-t border-stone-100">
              {/* Cart items */}
              <div className="space-y-3 pt-3">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                    className="flex items-start gap-3 text-xs"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded object-cover border border-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="font-serif font-bold text-luxury-charcoal truncate text-[11px]">
                        {item.product.name}
                      </h4>
                      <p className="text-[9px] text-stone-400 font-mono leading-relaxed">
                        Qty: {item.quantity} · Size: {item.selectedSize}
                        <br />
                        {item.selectedShape} · {item.selectedLength}
                      </p>
                    </div>
                    <span className="font-mono font-semibold text-stone-700 text-[11px] flex-shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
 
              {/* Pricing lines */}
              <div className="space-y-1.5 pt-2 text-xs border-t border-stone-100">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Saving</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {shippingCharge === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingCharge}`
                    )}
                  </span>
                </div>
                {paymentMethod === 'COD' && (
                  <div className="flex justify-between text-stone-600">
                    <span>COD Fee</span>
                    <span className="font-mono">₹50</span>
                  </div>
                )}
                <div className="border-t border-stone-200 pt-2 flex justify-between font-serif font-bold text-luxury-charcoal">
                  <span>Total Payable</span>
                  <span className="font-mono text-sm text-luxury-gold-dark">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
 
              <Link
                to="/cart"
                className="inline-flex items-center gap-1 text-[11px] text-luxury-gold hover:underline"
              >
                <ArrowLeft size={10} /> Edit bag
              </Link>
            </div>
          )}
        </div>
 
        {/* ── Main grid: form + desktop invoice ── */}
        {/*
          On mobile: single column (form first, invoice hidden above as collapsible)
          On desktop: form left (7 cols) + invoice sticky right (5 cols)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
 
          {/* ── LEFT: Form ── */}
          <form
            onSubmit={handleOrderSubmit}
            className="lg:col-span-7 bg-white border border-luxury-beige-200 rounded p-5 sm:p-6 md:p-8 space-y-6"
          >
            <h2 className="font-serif font-bold text-sm text-luxury-charcoal border-b border-stone-200 pb-3 flex items-center gap-2">
              <Receipt size={15} className="text-luxury-gold flex-shrink-0" />
              <span>Shipping &amp; Sizing Coordinates</span>
            </h2>
 
            <div className="space-y-4">
 
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-fullname"
                  className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                >
                  Full Name *
                </label>
                <input
                  id="checkout-fullname"
                  type="text"
                  required
                  placeholder="Pooja Sen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
                />
              </div>
 
              {/* Phone + Email — side by side on sm+, stacked on xs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-phone"
                    className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                  >
                    WhatsApp Number *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
                  />
                  <span className="text-[9px] text-stone-400 leading-tight block">
                    Must match WhatsApp for photo coordination
                  </span>
                </div>
 
                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-email"
                    className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                  >
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    placeholder="pooja@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
                  />
                </div>
              </div>
 
              {/* Full Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-address"
                  className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                >
                  Complete Address *
                </label>
                <textarea
                  id="checkout-address"
                  required
                  rows={3}
                  placeholder="Apartment 4B, Golden Crest, opposite Central Garden"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition resize-none"
                />
              </div>
 
              {/* City + Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-city"
                    className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                  >
                    City / Town *
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
                  />
                </div>
 
                <div className="space-y-1.5">
                  <label
                    htmlFor="checkout-pincode"
                    className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                  >
                    Pincode (6-digit) *
                  </label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    placeholder="400001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
                  />
                </div>
              </div>
 
              {/* State */}
              <div className="space-y-1.5">
                <label
                  htmlFor="checkout-state"
                  className="text-[10px] uppercase font-mono font-bold text-stone-500 block"
                >
                  State / Region *
                </label>
                <select
                  id="checkout-state"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-3 text-xs cursor-pointer focus:outline-none focus:border-luxury-gold focus:bg-white transition appearance-none"
                >
                  {[
                    'Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat',
                    'Haryana','Karnataka','Kerala','Madhya Pradesh',
                    'Maharashtra','Punjab','Rajasthan','Tamil Nadu',
                    'Telangana','Uttar Pradesh','West Bengal',
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
 
              {/* Special sizing notes */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="checkout-sizing-notes"
                    className="text-[10px] uppercase font-mono font-bold text-stone-600 flex items-center gap-1"
                  >
                    <Sparkles size={11} className="text-luxury-gold" />
                    Custom Mm / Special Sizing Notes
                  </label>
                  <Link
                    to="/about"
                    className="text-[10px] text-luxury-gold font-semibold hover:underline"
                  >
                    View measuring guide
                  </Link>
                </div>
                <textarea
                  id="checkout-sizing-notes"
                  rows={3}
                  placeholder="e.g. Left hand (thumb-pinky): 16mm, 12mm, 13mm, 12mm, 10mm. Slightly shorter almond preferred."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full border-2 border-luxury-beige-300 rounded px-3 py-3 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white font-mono leading-normal transition resize-none"
                />
                <span className="text-[10px] text-stone-400 italic leading-relaxed block">
                  Required if you ordered a "Custom" size pack. Otherwise, add
                  any length preferences here.
                </span>
              </div>
            </div>
 
            {/* Payment method */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block">
                Preferred Payment Option
              </span>
 
              {/* Stack all 3 on mobile, row on md+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    {
                      value: 'WhatsApp' as const,
                      title: 'Pre-pay WhatsApp',
                      sub: 'Quick artist chat validation',
                    },
                    {
                      value: 'UPI' as const,
                      title: 'UPI (GPay / PhonePe)',
                      sub: 'Instant secure scanner code',
                    },
                    {
                      value: 'COD' as const,
                      title: 'Cash on Delivery',
                      sub: 'Pay at door (+₹50 COD charge)',
                    },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={`border rounded p-3.5 flex items-start gap-2.5 cursor-pointer transition ${
                      paymentMethod === opt.value
                        ? 'border-luxury-gold bg-luxury-beige-100'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMode"
                      checked={paymentMethod === opt.value}
                      onChange={() => setPaymentMethod(opt.value)}
                      className="mt-0.5 accent-luxury-gold flex-shrink-0"
                    />
                    <span className="text-xs">
                      <strong className="block text-luxury-charcoal text-[11px]">
                        {opt.title}
                      </strong>
                      <span className="text-[10px] text-stone-500 leading-tight block mt-0.5">
                        {opt.sub}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
 
            {/* Info block */}
            <div className="bg-luxury-beige-200/50 p-4 border border-luxury-beige-300 rounded text-[11px] space-y-2 leading-relaxed text-stone-700">
              <p className="font-serif italic font-semibold text-luxury-gold-dark text-center text-xs">
                💖 How Our Boutique Ordering Works
              </p>
              <p>
                D Luxe Nails is a specialized direct-to-consumer cosmetic
                service. Submitting this form compiles your custom order and
                launches our WhatsApp portal — no credit card needed.
              </p>
            </div>
 
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-luxury-charcoal hover:bg-stone-800 text-white rounded py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <MessageCircle size={15} />
              <span>Generate &amp; Send Order on WhatsApp</span>
            </button>
          </form>
 
          {/* ── RIGHT: Desktop-only invoice (hidden on mobile) ── */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-white border border-luxury-beige-200 rounded p-5 space-y-5 sticky top-28 shadow-sm">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <h2 className="font-serif font-bold text-sm text-luxury-charcoal">
                  Invoice Details
                </h2>
                <Link
                  to="/cart"
                  className="text-[11px] text-luxury-gold hover:underline flex items-center gap-1"
                >
                  <ArrowLeft size={10} />
                  Edit bag
                </Link>
              </div>
 
              {/* Cart items */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                    className="flex items-start gap-3 text-xs"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover border border-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-serif font-bold text-luxury-charcoal truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-stone-400 font-mono leading-relaxed">
                        Qty: {item.quantity} · Size: {item.selectedSize}
                        <br />
                        {item.selectedShape} (Shape) · {item.selectedLength} (Length)
                      </p>
                    </div>
                    <span className="font-mono font-semibold text-stone-700 flex-shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
 
              {/* Measurement alert */}
              <div className="bg-amber-50/60 p-3 border border-amber-200 rounded flex items-start gap-2 text-[10.5px] leading-relaxed text-stone-600">
                <AlertCircle
                  size={13}
                  className="text-amber-500 flex-shrink-0 mt-0.5"
                />
                <span>
                  <strong>Sizing Reminder:</strong> If you selected "Custom" box
                  size, fill in your mm dimensions in the special notes field.
                </span>
              </div>
 
              {/* Pricing breakdown */}
              <div className="space-y-2 pt-2 text-xs border-t border-stone-100">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
 
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Saving</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
 
                <div className="flex justify-between text-stone-600">
                  <span>Prep Kit</span>
                  <span className="text-emerald-600 font-medium">FREE included</span>
                </div>
 
                <div className="flex justify-between text-stone-600">
                  <span>Courier Shipping</span>
                  <span className="font-mono">
                    {shippingCharge === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingCharge}`
                    )}
                  </span>
                </div>
 
                {paymentMethod === 'COD' && (
                  <div className="flex justify-between text-stone-600">
                    <span>COD Convenience Fee</span>
                    <span className="font-mono">₹50</span>
                  </div>
                )}
 
                <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-serif font-bold text-luxury-charcoal">
                  <span>Final Payable</span>
                  <span className="font-mono text-base text-luxury-gold-dark">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
 
              <div className="text-[10px] text-center text-stone-400 font-mono">
                Handcrafted with 🤍 in Gujarat · Pan-India Dispatch
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
};
 




