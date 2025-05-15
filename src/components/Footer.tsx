
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CreditCard, Clock, Truck, Instagram, MessageCircle } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-estilo-dark text-white">
      <div className="container mx-auto py-10 px-4">
        {/* Services section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 border-b border-gray-800 pb-10">
          <div className="flex flex-col items-center text-center">
            <Truck className="mb-3 text-estilo-gold" size={24} />
            <h3 className="font-semibold mb-2">Envío Gratis</h3>
            <p className="text-sm text-gray-400">Para pedidos superiores a S/50</p>
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
            <p className="text-sm text-gray-400">Respuesta rápida y personalizada</p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold font-montserrat text-estilo-gold mb-4">Y2K</h2>
            <p className="text-sm text-gray-400 mb-4">
              Tu destino para moda exclusiva y de alta calidad. Encuentra las últimas tendencias y clásicos atemporales.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-estilo-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-estilo-gold transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-md font-bold mb-4">CATEGORÍAS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categoria/mujer" className="text-gray-400 hover:text-estilo-gold transition-colors">Mujer</Link></li>
              <li><Link to="/categoria/hombre" className="text-gray-400 hover:text-estilo-gold transition-colors">Hombre</Link></li>
              <li><Link to="/categoria/accesorios" className="text-gray-400 hover:text-estilo-gold transition-colors">Accesorios</Link></li>
              <li><Link to="/categoria/ofertas" className="text-gray-400 hover:text-estilo-gold transition-colors">Ofertas</Link></li>
              <li><Link to="/categoria/novedades" className="text-gray-400 hover:text-estilo-gold transition-colors">Novedades</Link></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h3 className="text-md font-bold mb-4">AYUDA</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span>Cómo comprar</span></li>
              <li><span>Envíos</span></li>
              <li><span>Devoluciones</span></li>
              <li><span>Preguntas frecuentes</span></li>
              <li><span>Contacto</span></li>
              <li><span>Servicio al cliente</span></li>
              <li><span>Chat de soporte</span></li>
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
                <a href="tel:+51955286210" className="text-gray-400 hover:text-estilo-gold transition-colors">955 286 210</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-estilo-gold" />
                <span className="text-gray-400">jaelmtperez@gmail.com</span>
              </li>
              <li className="flex items-center">
                <MessageCircle size={18} className="mr-2 flex-shrink-0 text-estilo-gold" />
                <span className="text-gray-400">Atención al cliente: Lun-Dom 9:00-21:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Y2K. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <span className="hover:text-estilo-gold transition-colors">Políticas de privacidad</span>
            <span className="hover:text-estilo-gold transition-colors">Términos y condiciones</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
