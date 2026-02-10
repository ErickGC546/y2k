
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Star, Zap, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Announcement Bar */}
        <div className="bg-estilo-gold text-white text-center py-2 text-sm font-medium tracking-wide">
          <Zap className="inline-block w-4 h-4 mr-1 -mt-0.5" />
          ENVÍO GRATIS EN PEDIDOS MAYORES A S/300 · NUEVOS DROPS CADA SEMANA
          <Zap className="inline-block w-4 h-4 ml-1 -mt-0.5" />
        </div>

        <HeroCarousel />

        {/* Trust Badges */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center justify-center gap-3 text-center">
                <Truck className="h-8 w-8 text-estilo-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">Envío Nacional</p>
                  <p className="text-xs text-muted-foreground">A todo el Perú</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-center">
                <ShieldCheck className="h-8 w-8 text-estilo-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">Pago Seguro</p>
                  <p className="text-xs text-muted-foreground">100% protegido</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-center">
                <RotateCcw className="h-8 w-8 text-estilo-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">Devoluciones</p>
                  <p className="text-xs text-muted-foreground">30 días garantía</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-center">
                <Headphones className="h-8 w-8 text-estilo-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">Soporte 24/7</p>
                  <p className="text-xs text-muted-foreground">WhatsApp directo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedCategories />

        {/* Trending Now */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-estilo-gold" />
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat">Trending Now</h2>
              </div>
              <Link to="/categoria/novedades" className="flex items-center gap-1 text-estilo-gold hover:underline font-medium text-sm">
                Ver todo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ProductGrid title="" limit={4} category="novedades" />
        </section>
        
        {/* Featured Products */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-estilo-gold" />
                <h2 className="text-2xl md:text-3xl font-bold font-montserrat">Productos Destacados</h2>
              </div>
              <Link to="/categoria/todos" className="flex items-center gap-1 text-estilo-gold hover:underline font-medium text-sm">
                Ver todo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ProductGrid title="" limit={8} />
        </section>

        {/* Promo Banner */}
        <section className="py-16 bg-estilo-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
              STREETWEAR EXCLUSIVO
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Prendas únicas de edición limitada. Corteiz, Syna World, Denim Tears y más marcas que marcan tendencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/categoria/hombre"
                className="inline-block bg-estilo-gold text-white px-8 py-3 font-bold hover:bg-estilo-gold/90 transition-colors"
              >
                SHOP HOMBRE
              </Link>
              <Link
                to="/categoria/mujer"
                className="inline-block border-2 border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-estilo-dark transition-colors"
              >
                SHOP MUJER
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-center mb-10">¿Por qué elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-estilo-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-estilo-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2 font-montserrat">Calidad Premium</h3>
                <p className="text-muted-foreground text-sm">
                  Solo trabajamos con materiales de alta calidad para garantizar tu satisfacción.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-estilo-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-estilo-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2 font-montserrat">Edición Limitada</h3>
                <p className="text-muted-foreground text-sm">
                  Prendas exclusivas que no encontrarás en otro lugar. Marca la diferencia.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-estilo-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-estilo-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2 font-montserrat">Tendencia Global</h3>
                <p className="text-muted-foreground text-sm">
                  Las marcas más cotizadas del streetwear internacional, directo a tu puerta.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
