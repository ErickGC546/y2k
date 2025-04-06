
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import UserProfilePage from "./pages/UserProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categoria/:categorySlug" element={<CategoryPage />} />
          <Route path="/producto/:productSlug" element={<ProductPage />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/crear-cuenta" element={<RegisterPage />} />
          <Route path="/recuperar-password" element={<RecoverPasswordPage />} />
          <Route path="/mi-cuenta" element={<UserProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
