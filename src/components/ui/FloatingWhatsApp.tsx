import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const FloatingWhatsApp: React.FC = () => {
  const customMessage = encodeURIComponent(
    'Hi D Luxe Nails! I was browsing your gorgeous luxury press-on nail collections and would like some styling advice / want to place a custom order! 💅✨'
  );

  return (
    <a
      href={`${siteConfig.whatsappUrlPrefix}?text=${customMessage}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center space-x-2"
      title="Contact our Nail Artist on WhatsApp"
    >
      <MessageCircle size={22} className="group-hover:rotate-12 transition-transform duration-300" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-xs font-semibold whitespace-nowrap uppercase tracking-wider font-sans">
        Nail Support
      </span>
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full border-2 border-emerald-600 animate-ping opacity-25 -z-10" />
    </a>
  );
};
