
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import CartItem from './CartItem';

interface CartItemListProps {
  cartItems: CartItemType[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ 
  cartItems, 
  updateQuantity, 
  removeFromCart 
}) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map((item) => (
        <CartItem 
          key={item.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
        />
      ))}
      
      <div className="mt-6">
        <Link to="/" className="flex items-center text-estilo-dark hover:text-estilo-gold transition-colors">
          <ChevronLeft size={16} className="mr-1" />
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default CartItemList;
