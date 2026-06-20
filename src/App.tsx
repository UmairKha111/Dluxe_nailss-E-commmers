import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { ScrollToTop } from './components/ui/ScrollToTop';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-luxury-beige-100 font-sans antialiased text-luxury-charcoal selection:bg-luxury-beige-300 selection:text-luxury-charcoal">
          {/* Scroll context helper (resets window offsets on route switches) */}
          <ScrollToTop />
          
          {/* Sticky Header with integrated shopping bag drawers & announcements */}
          <Header />
          
          {/* Active page router portal */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Fallback navigation security */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Core dialog drawer for quick summaries size guides */}
          <QuickViewModal />

          {/* Bottom elements */}
          <FloatingWhatsApp />
          
          {/* Luxury Footer */}
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
