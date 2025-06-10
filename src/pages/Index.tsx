
import React from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';
import PromoSection from '../components/PromoSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <FeaturedCategories />
      <ProductGrid title="Productos Destacados" showAll={false} />
      <PromoSection />
      <ProductGrid title="Ofertas Especiales" showAll={true} />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
