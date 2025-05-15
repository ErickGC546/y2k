
import React from 'react';
import { WhatsApp } from 'lucide-react';

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/51955286210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 hover:scale-105"
      aria-label="Comprar por WhatsApp"
    >
      <div className="flex items-center">
        <WhatsApp className="h-6 w-6 mr-2" />
        <span className="font-medium">Compra ahora</span>
      </div>
    </a>
  );
};

export default FloatingWhatsAppButton;
