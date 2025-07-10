
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroCarousel />
        <FeaturedCategories />
        
        {/* Featured Products Section */}
        <ProductGrid 
          title="Productos Destacados" 
          limit={8}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
