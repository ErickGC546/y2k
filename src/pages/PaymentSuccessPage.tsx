
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const PaymentSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  
  // Get payment details from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');
    const paymentId = searchParams.get('payment_id');
    
    // Set payment status from MercadoPago
    setPaymentStatus(status || 'approved');
    
    // Set order number (either from external_reference or payment_id)
    setOrderNumber(externalReference || paymentId || generateRandomOrderId());
    
    // Clear the cart when payment is successful
    clearCart();
    
    // Show success toast
    toast.success("¡Pago procesado exitosamente!", {
      description: "Gracias por tu compra"
    });
  }, [location, clearCart]);
  
  // Fallback function to generate a random order ID if none is provided
  const generateRandomOrderId = () => {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm border">
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-500 mb-6" size={64} />
            <h1 className="text-3xl font-bold mb-4 font-montserrat">¡Pago exitoso!</h1>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-2">Estado del pago</p>
              <p className="text-lg font-medium text-green-600">
                {paymentStatus === 'approved' ? 'Aprobado' : 'Procesado'}
              </p>
            </div>
            
            {orderNumber && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-500 mb-2">Número de orden</p>
                <p className="text-lg font-medium">{orderNumber}</p>
              </div>
            )}
            
            <p className="text-gray-600 mb-8">
              Tu pago ha sido procesado exitosamente.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Package className="mr-2 text-estilo-gold" size={18} />
                <span>Tu pedido está siendo preparado</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link to="/">
                <Button className="bg-estilo-gold hover:bg-estilo-gold/90 text-white w-full">
                  Volver a la tienda
                </Button>
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
