
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/hooks/use-toast';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import { CartProvider } from './contexts/CartContext';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categoria/:categoryId" element={<CategoryPage />} />
            <Route path="/producto/:productId" element={<ProductPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/crear-cuenta" element={<RegisterPage />} />
            <Route path="/recuperar-contrasena" element={<RecoverPasswordPage />} />
            <Route path="/mi-cuenta" element={<UserProfilePage />} />
            <Route path="/pago-exitoso" element={<PaymentSuccessPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsAppButton />
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
