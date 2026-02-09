import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface StickyAddToCartProps {
  productName: string;
  price: number;
  originalPrice?: number;
  onAddToCart: () => void;
  disabled?: boolean;
}

const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  productName,
  price,
  originalPrice,
  onAddToCart,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{productName}</p>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg">S/ {price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                S/ {originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onAddToCart}
          disabled={disabled}
          className="bg-estilo-gold text-white px-6 py-3 font-bold text-sm hover:bg-opacity-90 transition-colors flex items-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <ShoppingBag size={18} />
          AÑADIR
        </button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
