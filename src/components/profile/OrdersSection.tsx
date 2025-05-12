
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const OrdersSection: React.FC = () => {
  const { cartItems, getTotalPrice } = useCart();

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <ShoppingBag className="mr-2 h-5 w-5 text-estilo-gold" />
          Mis pedidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <>
            <p className="text-gray-600">No tienes productos en tu carrito.</p>
            <Link to="/">
              <Button className="mt-4 bg-estilo-gold hover:bg-opacity-90 text-white">
                Ir a comprar
              </Button>
            </Link>
          </>
        ) : (
          <div className="space-y-4">
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x S/ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="font-medium">
                    S/ {(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="pt-2 border-t flex justify-between">
              <p className="font-medium">Total:</p>
              <p className="font-medium">S/ {getTotalPrice().toFixed(2)}</p>
            </div>
            
            <Link to="/carrito">
              <Button className="w-full mt-2 bg-estilo-gold hover:bg-opacity-90 text-white">
                Ver carrito
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersSection;
