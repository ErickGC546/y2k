
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CreditCard, Clock, Truck, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-estilo-dark text-white">
      <div className="container mx-auto py-10 px-4">
        {/* Services section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-b border-gray-800 pb-10">
          <div className="flex flex-col items-center text-center">
            <Truck className="mb-3 text-estilo-gold" size={24} />
            <h3 className="font-semibold mb-2">Envío Gratis</h3>
            <p className="text-sm text-gray-400">Para pedidos superiores a S/250</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="mb-3 text-estilo-gold" size={24} />
            <h3 className="font-semibold mb-2">Pago Seguro</h3>
            <p className="text-sm text-gray-400">Múltiples métodos de pago</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Clock className="mb-3 text-estilo-gold" size={24} />
            <h3 className="font-semibold mb-2">Devolución Fácil</h3>
            <p className="text-sm text-gray-400">30 días para devoluciones</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone className="mb-3 text-estilo-gold" size={24} />
            <h3 className="font-semibold mb-2">Atención al Cliente</h3>
            <p className="text-sm text-gray-400">Lun-Vie 9:00-18:00</p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold font-montserrat text-estilo-gold mb-4">Y2K STORE</h2>
            <p className="text-sm text-gray-400 mb-4">
              Tu destino para moda exclusiva y de alta calidad. Encuentra las últimas tendencias y clásicos atemporales.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-estilo-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-estilo-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-estilo-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-md font-bold mb-4">CATEGORÍAS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categoria/mujer" className="text-gray-400 hover:text-estilo-gold transition-colors">Mujer</Link></li>
              <li><Link to="/categoria/hombre" className="text-gray-400 hover:text-estilo-gold transition-colors">Hombre</Link></li>
              <li><Link to="/categoria/ninos" className="text-gray-400 hover:text-estilo-gold transition-colors">Niños</Link></li>
              <li><Link to="/categoria/accesorios" className="text-gray-400 hover:text-estilo-gold transition-colors">Accesorios</Link></li>
              <li><Link to="/categoria/deportes" className="text-gray-400 hover:text-estilo-gold transition-colors">Deportes</Link></li>
              <li><Link to="/categoria/ofertas" className="text-gray-400 hover:text-estilo-gold transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-md font-bold mb-4">AYUDA</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/como-comprar" className="text-gray-400 hover:text-estilo-gold transition-colors">Cómo comprar</Link></li>
              <li><Link to="/envios" className="text-gray-400 hover:text-estilo-gold transition-colors">Envíos</Link></li>
              <li><Link to="/devoluciones" className="text-gray-400 hover:text-estilo-gold transition-colors">Devoluciones</Link></li>
              <li><Link to="/preguntas-frecuentes" className="text-gray-400 hover:text-estilo-gold transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-estilo-gold transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-bold mb-4">CONTACTO</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-estilo-gold" />
                <span className="text-gray-400">Av. Nicolás Ayllón con, Ate 15487</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-estilo-gold" />
                <a href="tel:+34600000000" className="text-gray-400 hover:text-estilo-gold transition-colors">955 286 210</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-estilo-gold" />
                <a href="mailto:info@estilo.com" className="text-gray-400 hover:text-estilo-gold transition-colors">y2kstore@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Y2K STORE. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/politicas" className="hover:text-estilo-gold transition-colors">Políticas de privacidad</Link>
            <Link to="/terminos" className="hover:text-estilo-gold transition-colors">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
