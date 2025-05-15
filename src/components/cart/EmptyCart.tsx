
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-12">
      <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
      <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
      <p className="text-gray-600 mb-8">Añade algunos productos para empezar a comprar</p>
      <Link to="/">
        <Button className="bg-estilo-gold hover:bg-estilo-gold/90 text-white">
          Continuar comprando
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
