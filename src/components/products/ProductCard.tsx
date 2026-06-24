import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
 
interface ProductCardProps {
  product: Product;
}
 
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useCart();
  const isWishlisted = wishlist.includes(product.id);
 
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default size M — no shape/length passed to cart display
    addToCart(product, 1, 'M', product.shape, product.length);
  };
 
  const handleQuickViewToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };
 
  return (
    <div className="group relative bg-white border border-luxury-beige-200 hover:border-luxury-beige-400 rounded-sm overflow-hidden flex flex-col transition-all duration-300">
 
      {/* ── IMAGE SECTION ───────────────────────────── */}
      <div className="relative aspect-square overflow-hidden bg-luxury-beige-100">
 
        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-stone-500 hover:text-red-500 hover:bg-white shadow-xs transition duration-300"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={15}
            className={isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'transition-transform'}
          />
        </button>
 
        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            {product.badges.map((badge) => {
              let badgeStyle = 'bg-luxury-charcoal text-white';
              if (badge === 'Sale') badgeStyle = 'bg-red-600 text-white';
              if (badge === 'Limited Edition') badgeStyle = 'bg-luxury-rosegold-dark text-white';
              if (badge === 'Best Seller') badgeStyle = 'bg-luxury-gold-dark text-white';
              return (
                <span
                  key={badge}
                  className={`${badgeStyle} uppercase text-[9px] font-mono tracking-widest font-bold px-2 py-0.5 rounded shadow-xs`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        )}
 
        {/* Product images */}
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-all duration-700 ease-out absolute inset-0 group-hover:scale-105"
          />
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} view 2`}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-opacity duration-700 ease-out absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          )}
        </Link>
 
        {/* Hover quick action bar */}
        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-xs p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex space-x-1.5 z-10 border-t border-luxury-beige-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-luxury-charcoal text-white text-[10px] uppercase tracking-wider font-bold py-2 rounded hover:bg-stone-850 flex items-center justify-center space-x-1"
            title="Quick add to bag"
          >
            <ShoppingCart size={11} />
            <span>Quick Add</span>
          </button>
 
          <button
            onClick={handleQuickViewToggle}
            className="bg-luxury-beige-200 hover:bg-luxury-beige-300 text-luxury-charcoal p-2 rounded transition"
            title="Quick View"
          >
            <Eye size={13} />
          </button>
        </div>
      </div>
 
      {/* ── PRODUCT INFO ────────────────────────────── */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category only — removed shape & length */}
          <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1 font-mono tracking-wider">
            <span className="uppercase text-luxury-gold font-semibold">
              {product.category}
            </span>
            {/*
             * ── REMOVED: product.shape & product.length display
             * <span>{product.shape} Shape · {product.length}</span>
             */}
          </div>
 
          {/* Product name */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-sm font-semibold text-luxury-charcoal hover:text-luxury-gold tracking-wide truncate mb-1">
              {product.name}
            </h3>
          </Link>
 
          {/* Star rating */}
          <div className="flex items-center space-x-1.5 mt-1 mb-2.5">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400'
                      : 'text-stone-250'
                  }
                />
              ))}
            </div>
            <span className="text-[10px] text-stone-500 font-mono mt-0.5">
              ({product.reviewsCount})
            </span>
          </div>
        </div>
 
        {/* Price */}
        <div className="flex items-baseline justify-between mt-auto pt-2 border-t border-stone-100/50">
          <div className="flex items-baseline space-x-1.5">
            <span className="font-mono font-bold text-sm text-luxury-charcoal">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs line-through text-stone-400">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            Prep Kit Free
          </span>
        </div>
      </div>
 
    </div>
  );
};
 




