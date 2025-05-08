
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { useCart } from '../contexts/CartContext';

const PaymentSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  
  // Clear the cart when payment is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
          <h1 className="text-3xl font-bold mb-4 font-montserrat">¡Pago exitoso!</h1>
          <p className="text-gray-600 mb-8">
            Tu pago ha sido procesado exitosamente. Recibirás una confirmación por correo electrónico con los detalles de tu pedido.
          </p>
          <div className="space-y-4">
            <Link to="/">
              <Button className="bg-estilo-gold hover:bg-estilo-gold/90 text-white">
                Volver a la tienda
              </Button>
            </Link>
            <div>
              <Link to="/mi-cuenta" className="text-sm text-gray-600 hover:underline">
                Ver mis pedidos
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
