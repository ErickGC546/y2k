
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getTotalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="w-full">
      {/* Top bar with policies and social */}
      <div className="bg-estilo-dark text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="hidden md:block">
            <Link to="/politicas" className="mr-4 hover:text-estilo-gold transition-colors">
              Políticas y condiciones de uso
            </Link>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            {isAuthenticated ? (
              <>
                <Link to="/mi-cuenta" className="hover:text-estilo-gold transition-colors">
                  Mi Cuenta
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hover:text-estilo-gold transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/iniciar-sesion" className="hover:text-estilo-gold transition-colors">
                  Iniciar sesión
                </Link>
                <Link to="/crear-cuenta" className="hover:text-estilo-gold transition-colors">
                  Crear una cuenta
                </Link>
              </>
            )}
            <div className="hidden md:flex items-center space-x-3">
              <a href="#" className="hover:text-estilo-gold transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-estilo-dark text-white py-3 px-4 border-t border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="block w-auto h-10">
            <img src={logo} alt="Y2K Logo" className="h-full object-contain" />
          </Link>

          {/* Search bar - desktop */}
          <div className={`hidden md:flex items-center flex-1 max-w-md mx-8 ${isSearchOpen ? 'flex' : ''}`}>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Buscar" 
                className="w-full py-2 px-4 pr-10 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-estilo-gold"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <a href="https://wa.me/51955286210" className="text-xs mr-2 hidden md:flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1a5e1a" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-white">955 286 210</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className="md:hidden"
              >
                <Search />
              </button>
              {isAuthenticated && (
                <Link to="/mi-cuenta" className="flex flex-col items-center">
                  <User size={20} />
                  <span className="text-xs mt-1">Mi Cuenta</span>
                </Link>
              )}
              <Link to="/carrito" className="flex flex-col items-center relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-estilo-gold text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </span>
                <span className="text-xs mt-1">Mi Bolsa</span>
              </Link>
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <nav className="bg-gray-100 text-estilo-dark py-3 hidden md:block">
        <div className="container mx-auto">
          <ul className="flex justify-center space-x-10 font-medium">
            <li><Link to="/categoria/mujer" className="hover:text-estilo-gold transition-colors">MUJER</Link></li>
            <li><Link to="/categoria/hombre" className="hover:text-estilo-gold transition-colors">HOMBRE</Link></li>
            <li><Link to="/categoria/accesorios" className="hover:text-estilo-gold transition-colors">ACCESORIOS</Link></li>
            <li><Link to="/categoria/ofertas" className="hover:text-estilo-gold transition-colors">OFERTAS</Link></li>
            <li><Link to="/categoria/novedades" className="hover:text-estilo-gold transition-colors">NOVEDADES</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-estilo-dark py-4 px-6 absolute z-50 w-full shadow-lg">
          <ul className="flex flex-col space-y-4">
            <li><Link to="/categoria/mujer" className="block py-2 hover:text-estilo-gold transition-colors">MUJER</Link></li>
            <li><Link to="/categoria/hombre" className="block py-2 hover:text-estilo-gold transition-colors">HOMBRE</Link></li>
            <li><Link to="/categoria/accesorios" className="block py-2 hover:text-estilo-gold transition-colors">ACCESORIOS</Link></li>
            <li><Link to="/categoria/ofertas" className="block py-2 hover:text-estilo-gold transition-colors">OFERTAS</Link></li>
            <li><Link to="/categoria/novedades" className="block py-2 hover:text-estilo-gold transition-colors">NOVEDADES</Link></li>
            <li className="pt-4 border-t border-gray-200">
              <Link to="/politicas" className="block py-2 hover:text-estilo-gold transition-colors">Políticas y condiciones</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile search */}
      {isSearchOpen && (
        <div className="md:hidden bg-white text-estilo-dark py-4 px-6 absolute z-50 w-full shadow-lg">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full py-2 px-4 pr-10 rounded-full bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-estilo-gold"
              autoFocus
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Search size={18} />
            </button>
          </div>
          <button 
            className="mt-4 text-sm text-estilo-gold"
            onClick={() => setIsSearchOpen(false)}
          >
            Cancelar
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
