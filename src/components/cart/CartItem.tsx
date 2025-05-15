
import React from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
      <div className="w-20 h-20 mr-4 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <Link to={`/producto/${item.slug}`} className="font-medium hover:text-estilo-gold transition-colors">
          {item.name}
        </Link>
        <p className="text-sm text-gray-600">{item.category}</p>
        <div className="mt-2 flex items-center">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1 border rounded hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="mx-2 min-w-8 text-center">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 border rounded hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-end">
        <p className="font-bold">S/ {(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => onRemoveFromCart(item.id)}
          className="text-gray-500 hover:text-red-500 transition-colors mt-2"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
