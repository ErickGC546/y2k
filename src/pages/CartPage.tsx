
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemList from '@/components/cart/CartItemList';
import CartSummary from '@/components/cart/CartSummary';
import PaymentErrorAlert from '@/components/cart/PaymentErrorAlert';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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
          <EmptyCart />
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
    setPaymentError(null);

    try {
      const response = await supabase.functions.invoke('create-checkout', {
        body: {
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          success_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/carrito`,
        },
      });

      console.log("Checkout response:", response);

      if (response.error) {
        throw new Error(response.error.message || "Error al procesar el pago");
      }

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("No se pudo crear la sesión de pago");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      const errorMessage = error.message || "Error al procesar el pago";
      setPaymentError(errorMessage);
      toast.error(errorMessage);
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 font-montserrat">Mi Bolsa ({getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'})</h1>
        
        <PaymentErrorAlert errorMessage={paymentError || ""} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItemList 
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          
          <CartSummary
            totalPrice={getTotalPrice()}
            isAuthenticated={isAuthenticated}
            isProcessing={paymentProcessing}
            onCheckout={handlePaymentProcess}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
