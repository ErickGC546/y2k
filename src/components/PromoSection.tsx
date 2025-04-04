
import React from 'react';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  return (
    <section className="py-12 bg-estilo-dark text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')] bg-cover bg-center relative min-h-[300px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative text-center p-6">
              <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-3">Nueva Colección</h3>
              <p className="text-lg mb-4">Descubre las últimas tendencias</p>
              <Link to="/categoria/nueva-coleccion" className="inline-block bg-estilo-gold text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors">
                Ver Colección
              </Link>
            </div>
          </div>
          
          <div className="bg-[url('https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=746&q=80')] bg-cover bg-center relative min-h-[300px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative text-center p-6">
              <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-3">Ofertas Especiales</h3>
              <p className="text-lg mb-4">Hasta 50% de descuento</p>
              <Link to="/categoria/ofertas" className="inline-block bg-estilo-gold text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors">
                Ver Ofertas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
