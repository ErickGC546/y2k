
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const OrdersSection: React.FC = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <ShoppingBag className="mr-2 h-5 w-5 text-estilo-gold" />
          Mis pedidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        S/ {item.price.toFixed(2)} x {item.quantity} = S/ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>S/ {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <div className="space-x-2 flex">
              <Link to="/carrito" className="block flex-1">
                <Button className="w-full bg-estilo-gold hover:bg-opacity-90 text-white">
                  Ver carrito
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600">No tienes productos en tu carrito.</p>
            <Link to="/">
              <Button className="mt-4 bg-estilo-gold hover:bg-opacity-90 text-white">
                Ir a comprar
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersSection;
