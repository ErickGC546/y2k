
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
              <a href="#" className="text-gray-400 hover:text-estilo-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-estilo-gold transition-colors">
                {/* TikTok SVG icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
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

        {/* Copyright */}
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
