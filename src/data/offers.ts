import { Coupon, OfferBanner } from '../types';

export const activeCoupons: Coupon[] = [
  {
    code: 'FIRSTDELUXE',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 999,
    description: 'Get 10% OFF on your very first order'
  },
  {
    code: 'GLAMGLOW',
    discountType: 'fixed',
    discountValue: 250,
    minSpend: 1999,
    description: 'Save ₹250 on premium bridal & statement nail bundles'
  },
  {
    code: 'FREESHIP1499',
    discountType: 'percentage',
    discountValue: 0,
    minSpend: 1499,
    description: 'Free automated standard shipping'
  }
];

export const offerBanners: OfferBanner[] = [
  {
    id: 'banner-1',
    text: '✨ LUXURY EXCLUSIVE: Buy any 2 sets and get 1 Premium prep tool kit absolutely Free!',
    linkText: 'Shop Now',
    linkUrl: '/shop'
  },
  {
    id: 'banner-2',
    text: '💅 Free Premium pan-India shipping on all customized bundles above ₹1,499!',
    linkText: 'Read Shipping Policy',
    linkUrl: '/about'
  }
];
