
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { toast } from "sonner";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
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

  const handlePaypalCheckout = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("¡Pago completado con éxito!");
      clearCart();
      setPaymentProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 font-montserrat">Mi Bolsa ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items - takes up 2/3 of the grid on large screens */}
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
                  <p className="font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
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
          
          {/* Order summary - takes up 1/3 of the grid on large screens */}
          <div className="bg-white p-6 rounded-lg shadow-sm border h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4 font-montserrat">Resumen del pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Gastos de envío</span>
                <span>Calculado en el siguiente paso</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{getTotalPrice().toFixed(2)} €</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Impuestos incluidos</p>
            </div>
            
            {/* PayPal payment button */}
            <Button 
              disabled={paymentProcessing}
              onClick={handlePaypalCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3 flex justify-center items-center"
            >
              {paymentProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Procesando...
                </div>
              ) : (
                <>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 384 512" 
                    className="h-4 w-4 mr-2 fill-current"
                  >
                    <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17-14.9 7.9-49.4 32.6-190.8 32.6-190.8.4-2.6 1.5-3.4 4.4-3.4 10.3 0 29.6 2.2 45.7 8.7 57.6 22.5 57.4 88.7 27.4 151.5-17 35.7-38.4 65.5-38.4 65.5a12.09 12.09 0
                    0 0 1.9 17.1l34.5 28.6c7.7 6.4 19.1 1.9 19.7-8.4.2-2.5 17.2-113 63.6-236.5 3-8 1.3-15.7-5-20.7z"/>
                  </svg>
                  Pagar con PayPal
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              Al hacer clic en "Pagar con PayPal", confirmas que aceptas nuestros términos y condiciones.
            </p>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">Pago seguro garantizado</p>
              <div className="flex justify-center mt-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 576 512" 
                  className="h-6 w-6 text-blue-600 fill-current"
                >
                  <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17-14.9 7.9-49.4 32.6-190.8 32.6-190.8.4-2.6 1.5-3.4 4.4-3.4 10.3 0 29.6 2.2 45.7 8.7 57.6 22.5 57.4 88.7 27.4 151.5-17 35.7-38.4 65.5-38.4 65.5a12.09 12.09 0
                  0 0 1.9 17.1l34.5 28.6c7.7 6.4 19.1 1.9 19.7-8.4.2-2.5 17.2-113 63.6-236.5 3-8 1.3-15.7-5-20.7z"/>
                </svg>
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
