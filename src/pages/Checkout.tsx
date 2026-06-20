import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Check, MessageCircle, AlertCircle, Sparkles, Receipt, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, total, discountAmount, shippingCharge, activeCoupon, clearCart } = useCart();

  // Shipping Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Gujarat');
  const [pincode, setPincode] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'WhatsApp' | 'COD' | 'UPI'>('WhatsApp');
  
  // Success state
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    waMessage: string;
    waUrl: string;
  } | null>(null);

  if (cart.length === 0 && !orderDetails) {
    return (
      <div className="py-24 text-center space-y-4 max-w-sm mx-auto px-4">
        <span className="bg-luxury-beige-200 text-luxury-gold p-5 rounded-full inline-block">
          <ShoppingBag size={24} />
        </span>
        <h2 className="font-serif text-lg font-bold">Checkout is locked</h2>
        <p className="text-xs text-stone-500">Your luxury bag contains no press-on items. Please select styling coordinates before visiting checkout.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-luxury-charcoal text-white hover:bg-stone-850 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider uppercase"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = `DLN-${Math.floor(100000 + Math.random() * 900000)}`;

    // Compile items text list
    let itemsText = '';
    cart.forEach((item, index) => {
      itemsText += `\n🛒 *${index + 1}. ${item.product.name}*\n`;
      itemsText += `   · Shape: _${item.selectedShape || item.product.shape}_\n`;
      itemsText += `   · Length: _${item.selectedLength || item.product.length}_\n`;
      itemsText += `   · Box Size: _Size ${item.selectedSize}_\n`;
      itemsText += `   · Quantity: _${item.quantity}_\n`;
      itemsText += `   · Unit Price: _₹${item.product.price}_\n`;
    });

    // Compose cohesive WhatsApp Order Text
    const whatsappMessage = `✨ *D LUXE NAILS - PRESTIGE ORDER REQUEST* ✨\n\n` +
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
      `📋 *SPECIAL SIZING & NOTES:* \n` +
      `_${specialNotes || 'No custom millimeter notes provided (Using standard box proportions)_'}\n\n` +
      `-------------------------------------------\n` +
      `💳 *PRICING & PAYMENTS OVERVIEW:*\n` +
      `· *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      `${discountAmount > 0 ? `· *Coupon Applied:* ${activeCoupon?.code} (-₹${discountAmount})\n` : ''}` +
      `· *Courier Shipping:* ${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}\n` +
      `💰 *Grand Order Value:* *₹${total.toLocaleString('en-IN')}*\n` +
      `· *Preferred Transaction:* _${paymentMethod === 'WhatsApp' ? 'Bespoke Artist Verification' : paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Express UPI Scan Code'}_\n\n` +
      `-------------------------------------------\n` +
      `💅 _Thank you for choosing high-speed nail luxury. Navsari Gujarat manual workshop will begin painting your sets immediately!_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/916391157751?text=${encodedMessage}`;

    // Record states to view success details
    setOrderDetails({
      orderId,
      waMessage: whatsappMessage,
      waUrl: whatsappUrl
    });

    // Open WhatsApp URL instantly in a new window/tab
    window.open(whatsappUrl, '_blank');
  };

  const handleDoneReset = () => {
    clearCart();
    navigate('/');
  };

  // If order was successfully submitted, show success page
  if (orderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-8 animate-slide-up">
        
        {/* Success greeting card layout */}
        <div className="bg-white border border-luxury-beige-300 rounded p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-luxury-rosegold to-luxury-gold" />
          
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-bounce border border-emerald-100">
            <Check size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-[0.2em] font-bold block">Order Dispatched to Artist</span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-luxury-charcoal tracking-wide">
              Your nail card is generated!
            </h1>
            <p className="font-mono text-stone-500 text-[11px]">ORDER REFERENCE: {orderDetails.orderId}</p>
          </div>

          <div className="bg-luxury-beige-100 p-5 rounded border border-luxury-beige-300 text-xs text-left text-stone-700 leading-relaxed max-w-xl mx-auto space-y-3">
            <p className="font-semibold text-center italic text-luxury-gold-dark text-[13px] border-b border-stone-200 pb-2">
              Next Action: Talk with our Nail Artist on WhatsApp!
            </p>
            <p>
              We have automatically generated a comprehensive receipt with your custom shape, length, size, and address parameters. This receipt has been copied to your browser and queued to open under WhatsApp.
            </p>
            <p>
              <strong>If the WhatsApp tab did not open automatically:</strong> Please click the gold button below to send your invoice manually, request UPI scan sheets, or establish custom millimeters.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a
              href={orderDetails.waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 rounded text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-md"
            >
              <MessageCircle size={15} />
              <span>Retry Send on WhatsApp</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={handleDoneReset}
              className="w-full sm:w-auto border border-luxury-beige-300 hover:bg-stone-50 text-luxury-charcoal px-8 py-4 rounded text-xs font-bold uppercase tracking-wider transition font-mono"
            >
              Back to Store Home
            </button>
          </div>

          <div className="border-t border-stone-100 pt-5 text-[10px] text-stone-400 font-mono">
            Direct coordination dispatch by D Luxe Nails · Navsari, Gujarat
          </div>
        </div>

      </div>
    );
  }

  return (
    <div id="checkout-page-container" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12">
      
      {/* Title */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-bold block">Prosthetic Sizing</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-luxury-charcoal tracking-wide">
          Bespoke Dispatch checkout
        </h1>
        <div className="w-12 h-[1px] bg-luxury-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: DELIVERY & NOTES FORM (Col span 7) */}
        <form onSubmit={handleOrderSubmit} className="lg:col-span-7 bg-white border border-luxury-beige-200 rounded p-6 md:p-8 space-y-6">
          <h2 className="font-serif font-bold text-base text-luxury-charcoal border-b border-stone-200 pb-3 flex items-center space-x-2">
            <Receipt size={16} className="text-luxury-gold" />
            <span>Shipping & Sizing Coordinates</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="checkout-fullname" className="text-[10px] uppercase font-mono font-bold text-stone-500">FullName *</label>
              <input
                id="checkout-fullname"
                type="text"
                required
                placeholder="Pooja Sen"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-phone" className="text-[10px] uppercase font-mono font-bold text-stone-500">WhatsApp Phone Number *</label>
              <input
                id="checkout-phone"
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              />
              <span className="text-[9px] text-stone-400 font-sans block leading-tight">Must correspond to WhatsApp so we can coordinate photos</span>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-email" className="text-[10px] uppercase font-mono font-bold text-stone-500">Email Address *</label>
              <input
                id="checkout-email"
                type="email"
                required
                placeholder="pooja@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              />
            </div>

            {/* Full Address */}
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="checkout-address" className="text-[10px] uppercase font-mono font-bold text-stone-500">Complete Address (House/Block, Street, Area) *</label>
              <textarea
                id="checkout-address"
                required
                rows={3}
                placeholder="Apartment 4B, Golden Crest, opposite Central Garden"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              />
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-city" className="text-[10px] uppercase font-mono font-bold text-stone-500">City / Town *</label>
              <input
                id="checkout-city"
                type="text"
                required
                placeholder="Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              />
            </div>

            {/* StateDropdown List */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-state" className="text-[10px] uppercase font-mono font-bold text-stone-500">State / Region *</label>
              <select
                id="checkout-state"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs cursor-pointer focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              >
                {['Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Pincode */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-pincode" className="text-[10px] uppercase font-mono font-bold text-stone-500">Pincode (6-Digit) *</label>
              <input
                id="checkout-pincode"
                type="text"
                pattern="[0-9]{6}"
                required
                placeholder="400001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-stone-50 border border-luxury-beige-300 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white transition"
              />
            </div>

            {/* SIZING DETAILS NOTES (CRITICAL EXQUISITE REQUIREMENT) */}
            <div className="space-y-1.5 col-span-2 pt-2">
              <div className="flex justify-between items-center">
                <label htmlFor="checkout-sizing-notes" className="text-[10px] uppercase font-mono font-bold text-red-650 flex items-center space-x-1">
                  <Sparkles size={11} className="text-luxury-gold animate-pulse" />
                  <span>Custom Millimeter measures / Special Sizing instructions</span>
                </label>
                <Link to="/about" className="text-[10px] hover:underline text-luxury-gold font-semibold">(View measuring helper)</Link>
              </div>
              <textarea
                id="checkout-sizing-notes"
                rows={3}
                placeholder="e.g. For Custom Size, Left Natural measures (Thumb-pinky): 16mm, 12mm, 13mm, 12mm, 10mm. Please modify shape to slightly shorter almond."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-stone-55 border-2 border-luxury-beige-300/80 rounded px-3 py-2.5 text-xs focus:outline-none focus:border-luxury-gold focus:bg-white font-mono leading-normal shadow-inner"
              />
              <span className="text-[10px] text-stone-400 italic font-sans leading-normal block">
                If you ordered a "Custom" size pack, we require your individual mm measures. If standard sizing was clicked above, feel free to write custom details (e.g. "Slightly shorter length preferred").
              </span>
            </div>

          </div>

          {/* PAYMENT METHOD SELECTION */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block">4. Preferred Payment Option</span>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className={`border p-3.5 rounded flex items-start space-x-2 cursor-pointer transition ${paymentMethod === 'WhatsApp' ? 'border-luxury-gold bg-luxury-beige-100' : 'border-stone-200'}`}>
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMethod === 'WhatsApp'}
                  onChange={() => setPaymentMethod('WhatsApp')}
                  className="mt-0.5 accent-luxury-gold"
                />
                <span className="text-xs">
                  <strong className="block text-luxury-charcoal">Pre-pay WhatsApp</strong>
                  <span className="text-[10px] text-stone-500 leading-tight block mt-0.5">Quick artist chat validation</span>
                </span>
              </label>

              <label className={`border p-3.5 rounded flex items-start space-x-2 cursor-pointer transition ${paymentMethod === 'UPI' ? 'border-luxury-gold bg-luxury-beige-100' : 'border-stone-200'}`}>
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-0.5 accent-luxury-gold"
                />
                <span className="text-xs">
                  <strong className="block text-luxury-charcoal">UPI Transfer (GPAY/PhonePe)</strong>
                  <span className="text-[10px] text-stone-500 leading-tight block mt-0.5">Instant secure scanner code</span>
                </span>
              </label>

              <label className={`border p-3.5 rounded flex items-start space-x-2 cursor-pointer transition ${paymentMethod === 'COD' ? 'border-luxury-gold bg-luxury-beige-100' : 'border-stone-200'}`}>
                <input
                  type="radio"
                  name="paymentMode"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-0.5 accent-luxury-gold"
                />
                <span className="text-xs">
                  <strong className="block text-luxury-charcoal">Cash on Delivery</strong>
                  <span className="text-[10px] text-stone-500 leading-tight block mt-0.5">Pay on delivery in India (+₹50 cod charge)</span>
                </span>
              </label>
            </div>
          </div>

          <div className="bg-luxury-beige-200/50 p-4 border border-luxury-beige-300 rounded text-xs space-y-2 leading-relaxed text-stone-705">
            <p className="font-serif italic font-semibold text-luxury-gold-dark text-center">💖 How Our Boutique Ordering Works:</p>
            <p className="text-[11px]">
              D Luxe Nails is a specialized direct-to-consumer cosmetic service. Clicking the submit button compiles your custom geometries and launches our WhatsApp portal. You do not need credit cards here. We verify address grids on WhatsApp, share secure UPI scanning sheets, and schedule custom curation.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-luxury-charcoal hover:bg-stone-850 text-white rounded py-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <MessageCircle size={15} />
            <span>Generate & Send Order Card on WhatsApp</span>
          </button>
        </form>

        {/* RIGHT: THE LUXURY INVOICE (Col span 5) */}
        <div className="lg:col-span-5 bg-white border border-luxury-beige-200 rounded p-5 space-y-5 sticky top-28 shadow-xs">
          <div className="flex justify-between items-center border-b border-stone-200 pb-3">
            <h2 className="font-serif font-bold text-sm text-luxury-charcoal">
              Invoice Order Details
            </h2>
            <Link to="/cart" className="text-[11px] text-luxury-gold hover:underline flex items-center space-x-0.5">
              <ArrowLeft size={10} />
              <span>Edit bag</span>
            </Link>
          </div>

          {/* Items lists scroll */}
          <div className="space-y-4 max-h-72 overflow-y-auto">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="flex items-start space-x-3 text-xs"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded object-cover border border-stone-100"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif font-bold text-luxury-charcoal truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-stone-400 font-mono">
                    Qty: {item.quantity} · Size: {item.selectedSize} · {item.selectedShape} (Shape) · {item.selectedLength} (Length)
                  </p>
                </div>
                <span className="font-mono font-semibold text-stone-700">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Sizing verification prompt card */}
          <div className="bg-amber-50/50 p-3.5 border border-amber-200 rounded flex items-start space-x-2 text-[10.5px] leading-relaxed text-stone-605">
            <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Measurement Verification Checked!</strong> If you submitted "Custom" box size, please don't forget to fill out individual millimeter dimensions in special notes.
            </span>
          </div>

          {/* Balance Pricing lines */}
          <div className="space-y-2 pt-2 text-xs border-t border-stone-100">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal Value</span>
              <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon Saving</span>
                <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-600">
              <span>Handmade Application Prep Kit</span>
              <span className="text-emerald-650 font-medium">FREE included</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Standard Courier Shipping</span>
              <span className="font-mono">
                {shippingCharge === 0 ? <span className="text-emerald-605 font-bold">FREE</span> : `₹${shippingCharge}`}
              </span>
            </div>

            {paymentMethod === 'COD' && (
              <div className="flex justify-between text-stone-600">
                <span>COD Conveninence fee</span>
                <span className="font-mono">₹50</span>
              </div>
            )}

            <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-serif font-bold text-luxury-charcoal">
              <span>Final Payable amount</span>
              <span className="font-mono text-base font-bold text-luxury-gold-dark">
                ₹{(total + (paymentMethod === 'COD' ? 50 : 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-center text-stone-400 font-mono">
            Handcrafted with 🤍 in Gujarat · Pan-India Dispatch
          </div>
        </div>

      </div>

    </div>
  );
};
