import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight, CreditCard, Building2, QrCode } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
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
        </main>
        <Footer />
      </div>
    );
  }

  const handlePaymentProcess = async () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para realizar la compra");
      navigate('/iniciar-sesion');
      return;
    }

    setPaymentProcessing(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('create-checkout', {
        body: {
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          success_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/carrito`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("No se pudo crear la sesión de pago");
      }
    } catch (error: any) {
      toast.error(error.message || "Error al procesar el pago");
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 font-montserrat">Mi Bolsa ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items section */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center">
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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border rounded hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="mx-2 min-w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border rounded hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <p className="font-bold">S/ {(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-6">
              <Link to="/" className="flex items-center text-estilo-dark hover:text-estilo-gold transition-colors">
                <ChevronLeft size={16} className="mr-1" />
                Seguir comprando
              </Link>
            </div>
          </div>
          
          {/* Payment summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4 font-montserrat">Resumen del pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>S/ {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gastos de envío</span>
                <span>Calculado en el siguiente paso</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>S/ {getTotalPrice().toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Impuestos incluidos</p>
            </div>

            {/* Payment methods */}
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-sm mb-2">Métodos de pago disponibles:</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded p-3 text-center text-sm">
                  <CreditCard className="mx-auto mb-1 h-5 w-5" />
                  <span className="block text-xs">Tarjetas</span>
                </div>
                <div className="border rounded p-3 text-center text-sm">
                  <Building2 className="mx-auto mb-1 h-5 w-5" />
                  <span className="block text-xs">Bancos</span>
                </div>
                <div className="border rounded p-3 text-center text-sm">
                  <QrCode className="mx-auto mb-1 h-5 w-5" />
                  <span className="block text-xs">Yape</span>
                </div>
                <div className="border rounded p-3 text-center text-sm">
                  <QrCode className="mx-auto mb-1 h-5 w-5" />
                  <span className="block text-xs">Plin</span>
                </div>
              </div>
            </div>
            
            <Button 
              disabled={paymentProcessing}
              onClick={handlePaymentProcess}
              className="w-full bg-estilo-gold hover:bg-estilo-gold/90 text-white mb-3"
            >
              {!isAuthenticated ? (
                'Iniciar sesión para comprar'
              ) : paymentProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Procesando pago...
                </div>
              ) : (
                'Proceder al pago'
              )}
            </Button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Al hacer clic en "Proceder al pago", confirmas que aceptas nuestros términos y condiciones.
            </p>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">Pago seguro garantizado</p>
              <div className="flex justify-center gap-2 mt-2">
                <img src="https://www.visa.com.pe/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Tarjetas-Visa.png" alt="Visa" className="h-6" />
                <img src="https://www.mastercard.com.pe/content/dam/public/mastercardcom/lac/pe/home/consumidores/encontrar-tarjeta/tarjetas-credito/black-1280x720.png" alt="Mastercard" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
