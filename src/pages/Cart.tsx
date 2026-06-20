import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, Tag, Check, Calendar, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, total, discountAmount, shippingCharge, activeCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponText, setCouponText] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponText.trim()) return;
    const res = applyCoupon(couponText.trim());
    if (res.success) {
      setCouponError(null);
      setCouponText('');
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div id="cart-page-container" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12">
      
      {/* Title block */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-mono text-luxury-gold tracking-widest font-bold block">Shopping Bag</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-luxury-charcoal tracking-wide">
          Your Luxury Box
        </h1>
        <div className="w-12 h-[1px] bg-luxury-gold" />
      </div>

      {cart.length === 0 ? (
        <div className="py-24 text-center space-y-4 bg-white border border-luxury-beige-200 rounded max-w-2xl mx-auto">
          <span className="bg-luxury-beige-200/50 p-6 rounded-full inline-block text-luxury-gold">
            <ShoppingBag size={36} />
          </span>
          <div className="space-y-1.5">
            <h2 className="font-serif text-xl font-bold">Your shopping bag is empty</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              We hand-paint every coordinate using professional gels cured with micro lamps. Explore our exquisite templates to configure yours!
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-block bg-luxury-charcoal text-white hover:bg-stone-850 px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition shadow"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CART ITEMS LIST (Column span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${idx}`}
                className="bg-white border border-luxury-beige-200 rounded p-4 md:p-5 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-4 hover:border-luxury-beige-350 transition duration-300"
              >
                {/* Product thumb */}
                <div className="w-20 h-20 rounded overflow-hidden bg-luxury-beige-100 border border-stone-200 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover text-[10px]"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <h3 className="font-serif text-sm font-bold text-luxury-charcoal hover:text-luxury-gold tracking-wide truncate">
                      <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-stone-400 hover:text-red-500 transition py-1 text-xs font-mono font-bold flex items-center space-x-1 self-center sm:self-start mt-1 sm:mt-0"
                    >
                      <Trash2 size={12} />
                      <span className="sm:hidden">Remove</span>
                    </button>
                  </div>

                  {/* Specifications badges */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[10px] text-stone-500 font-mono">
                    <span className="bg-luxury-beige-200 px-2 py-0.5 rounded uppercase">Size: {item.selectedSize}</span>
                    <span className="bg-luxury-beige-200 px-2 py-0.5 rounded">{item.selectedShape} Shape</span>
                    <span className="bg-luxury-beige-200 px-2 py-0.5 rounded">{item.selectedLength} length</span>
                  </div>

                  {/* Sizing Millimeter specific details */}
                  <span className="block text-[10px] text-stone-400 italic">
                    {item.selectedSize === 'XS' && 'Fits Thumb 14mm, Index 10mm, Middle 11mm, Ring 10mm'}
                    {item.selectedSize === 'S' && 'Fits Thumb 15mm, Index 11mm, Middle 12mm, Ring 11mm'}
                    {item.selectedSize === 'M' && 'Fits Thumb 16mm, Index 12mm, Middle 13mm, Ring 12mm'}
                    {item.selectedSize === 'L' && 'Fits Thumb 18mm, Index 13mm, Middle 14mm, Ring 13mm'}
                    {item.selectedSize === 'Custom' && 'Please specify natural measurements in individual millimeters in order notes.'}
                  </span>

                  {/* Quantity & subtotal inline */}
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100/50">
                    <div className="flex items-center border border-luxury-beige-300 rounded overflow-hidden h-7 bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 hover:bg-stone-50 text-stone-600 transition h-full"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="px-3 text-xs font-mono font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 hover:bg-stone-50 text-stone-600 transition h-full"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    <div className="flex items-baseline space-x-1 bg-luxury-beige-100/40 px-2 py-1 rounded">
                      <span className="text-[10px] text-stone-400 font-mono">Subt:</span>
                      <strong className="text-xs font-mono text-luxury-charcoal">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Note banner on handmade preparation calendars warnings */}
            <div className="bg-luxury-beige-200 border border-luxury-beige-300 rounded p-4 flex items-start space-x-3 text-xs leading-normal">
              <Calendar size={16} className="text-luxury-gold shrink-0 mt-0.5 animate-pulse" />
              <div>
                <strong className="text-luxury-charcoal block">Hand-Cured Sanitary Dispatch Policy:</strong>
                <span className="text-stone-600 text-[11px] block mt-0.5">
                  Due to high-quality gel curing (Japanese building coatings paint formulas), preparation from our Navsari studio requires 3-5 days of craft before courier dispatch. Sizing coordinates and shapes cannot be modified once custom prep has commenced.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (Column span 5) */}
          <div className="lg:col-span-5 bg-white border border-luxury-beige-200 rounded p-5 space-y-5 sticky top-28 shadow-xs">
            <h2 className="font-serif font-bold text-sm text-luxury-charcoal border-b border-stone-200 pb-3">
              Premium Order Summary
            </h2>

            {/* Coupon widget */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block tracking-wider">
                Discount Coupon Code
              </span>
              {activeCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 rounded p-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <Check size={14} className="text-emerald-600" />
                    <span>
                      Coupon <strong>{activeCoupon.code}</strong> Applied!
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-700 underline font-mono text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="ENTER CODE (e.g. FIRSTDELUXE)"
                    value={couponText}
                    onChange={(e) => setCouponText(e.target.value)}
                    className="flex-1 bg-white border border-luxury-beige-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-luxury-gold uppercase font-mono tracking-wider"
                  />
                  <button
                    type="submit"
                    className="bg-luxury-charcoal text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-stone-850 rounded transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[10px] text-red-500 font-mono italic mt-1">{couponError}</p>}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 pt-2 text-xs text-stone-650">
              <div className="flex justify-between">
                <span>Handmade Nails Subtotal ({cart.length} sets)</span>
                <span className="font-mono text-luxury-charcoal font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({activeCoupon?.code})</span>
                  <span className="font-mono font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Custom Application Prep Kit</span>
                <span className="text-emerald-600 font-medium font-mono">₹0 (FREE INCLUDED)</span>
              </div>

              <div className="flex justify-between">
                <span>Pan-India Courier Shipping</span>
                <span className="font-mono font-semibold text-luxury-charcoal">
                  {shippingCharge === 0 ? <span className="text-emerald-605 font-bold">FREE</span> : `₹${shippingCharge}`}
                </span>
              </div>

              {shippingCharge > 0 && (
                <div className="bg-luxury-beige-100 p-2.5 rounded border border-luxury-beige-300 text-[10px] text-stone-500 text-center italic">
                  💸 Add ₹{(1499 - subtotal).toLocaleString('en-IN')} more to your luxury box and trigger <strong>FREE panels shipping</strong> instantly!
                </div>
              )}

              <div className="border-t border-stone-200 pt-3 flex justify-between text-sm font-serif font-bold text-luxury-charcoal">
                <span>Grand Final Value</span>
                <span className="font-mono text-base font-bold text-luxury-gold-dark">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Policies warnings indicators */}
            <div className="bg-stone-50 p-3 rounded text-[10px] text-stone-500 space-y-1.5 leading-relaxed font-sans mt-3.5 border border-stone-150">
              <div className="flex items-start space-x-1.5">
                <AlertCircle size={12} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>Sanitary standardizations prevent cancellation once items are size-cured.</span>
              </div>
              <div className="flex items-start space-x-1.5">
                <AlertCircle size={12} className="text-luxury-gold shrink-0 mt-0.5" />
                <span>Final order coordinates automatically exported to WhatsApp on checkout.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              <Link
                to="/checkout"
                className="w-full bg-luxury-charcoal hover:bg-stone-850 text-white text-center block text-xs font-bold uppercase tracking-wider py-4 rounded transition shadow-md"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="w-full text-center border border-luxury-beige-300 text-stone-600 hover:bg-stone-50 hover:text-luxury-charcoal block text-xs font-bold uppercase tracking-wider py-3.5 rounded transition"
              >
                Continue Styling Nails
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
