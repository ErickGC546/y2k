
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  
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
            
            <Button className="w-full bg-estilo-gold hover:bg-estilo-gold/90 text-white mb-3">
              Proceder al pago
            </Button>
            
            <div className="text-sm text-gray-600 mt-6">
              <p className="mb-2">Métodos de pago aceptados:</p>
              <div className="flex space-x-2">
                <div className="bg-gray-100 p-1 rounded">Visa</div>
                <div className="bg-gray-100 p-1 rounded">MasterCard</div>
                <div className="bg-gray-100 p-1 rounded">PayPal</div>
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
