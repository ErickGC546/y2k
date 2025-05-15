
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Package, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<string | null>(null);
  
  // Get payment details from URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');
    const paymentId = searchParams.get('payment_id');
    const address = localStorage.getItem('shipping_address');
    
    // Set payment status from MercadoPago
    setPaymentStatus(status || 'approved');
    
    // Set order number (either from external_reference or payment_id)
    setOrderNumber(externalReference || paymentId || generateRandomOrderId());
    
    // Set shipping address if available
    if (address) {
      setShippingAddress(address);
      // Clear address from localStorage after retrieving it
      localStorage.removeItem('shipping_address');
    }
    
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <h1 className="text-3xl font-bold font-montserrat">¡Pago exitoso!</h1>
            <p className="text-gray-600 mt-2">
              Tu pedido ha sido procesado y está siendo preparado.
            </p>
          </div>
          
          <Card className="mb-6 overflow-hidden">
            <div className="bg-estilo-gold text-white px-4 py-3">
              <h2 className="text-lg font-semibold">Detalles del pedido</h2>
            </div>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 flex items-center">
                  <ShoppingBag className="text-estilo-gold mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Número de orden</p>
                    <p className="font-medium">{orderNumber}</p>
                  </div>
                </div>
                
                <div className="p-4 flex items-center">
                  <Package className="text-estilo-gold mr-3" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Estado del pago</p>
                    <p className="font-medium text-green-600">
                      {paymentStatus === 'approved' ? 'Aprobado' : 'Procesado'}
                    </p>
                  </div>
                </div>
                
                {shippingAddress && (
                  <div className="p-4 flex items-center">
                    <MapPin className="text-estilo-gold mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Dirección de envío</p>
                      <p className="font-medium">{shippingAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="font-semibold mb-2">¿Qué sigue?</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Recibirás un correo electrónico con la confirmación de tu pedido.</li>
              <li>Prepararemos tus productos para envío.</li>
              <li>Te informaremos cuando tu pedido esté en camino.</li>
              <li>¡Disfruta de tus nuevos productos!</li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <Button className="w-full bg-estilo-gold hover:bg-estilo-gold/90 text-white">
                Volver a la tienda
              </Button>
            </Link>
            <Link to="/mi-cuenta">
              <Button variant="outline" className="w-full">
                Ver mi cuenta
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
