
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Building2, QrCode } from 'lucide-react';

interface CartSummaryProps {
  totalPrice: number;
  isAuthenticated: boolean;
  isProcessing: boolean;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  isAuthenticated,
  isProcessing,
  onCheckout
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border h-fit sticky top-4">
      <h2 className="text-xl font-bold mb-4 font-montserrat">Resumen del pedido</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>S/ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Gastos de envío</span>
          <span>Calculando </span>
        </div>
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>S/ {totalPrice.toFixed(2)}</span>
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
            <span className="block text-xs">Transferencia bancaria</span>
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
        disabled={isProcessing}
        onClick={onCheckout}
        className="w-full bg-estilo-gold hover:bg-estilo-gold/90 text-white mb-3"
      >
        {!isAuthenticated ? (
          'Iniciar sesión para comprar'
        ) : isProcessing ? (
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
        <p className="text-xs text-gray-500">Pago seguro garantizado con Mercado Pago</p>
        <div className="flex justify-center gap-2 mt-2">
          <img src="https://belvo.com/wp-content/uploads/2023/07/mercado-pago-logo.png" alt="Mercado Pago" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
