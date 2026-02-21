
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const RecoverPasswordPage = lazy(() => import("./pages/RecoverPasswordPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FloatingWhatsAppButton />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
                Cargando...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categoria/:categorySlug" element={<CategoryPage />} />
              <Route path="/producto/:productSlug" element={<ProductPage />} />
              <Route path="/iniciar-sesion" element={<LoginPage />} />
              <Route path="/crear-cuenta" element={<RegisterPage />} />
              <Route path="/recuperar-password" element={<RecoverPasswordPage />} />
              <Route path="/mi-cuenta" element={<UserProfilePage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/buscar" element={<SearchPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
