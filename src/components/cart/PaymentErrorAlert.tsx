
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface PaymentErrorAlertProps {
  errorMessage: string;
}

const PaymentErrorAlert: React.FC<PaymentErrorAlertProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTitle>Error de pago</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default PaymentErrorAlert;
