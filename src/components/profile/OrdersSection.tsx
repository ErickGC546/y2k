
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrdersSection: React.FC = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <ShoppingBag className="mr-2 h-5 w-5 text-estilo-gold" />
          Mis pedidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">No tienes pedidos recientes.</p>
        <Link to="/">
          <Button className="mt-4 bg-estilo-gold hover:bg-opacity-90 text-white">
            Ir a comprar
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default OrdersSection;
