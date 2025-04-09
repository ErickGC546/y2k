
import React from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <HeroCarousel />
        <FeaturedCategories />
        <FeaturedProducts title="Productos Destacados" limit={8} />
        <FeaturedProducts title="Nuevas Llegadas" viewAllLink="/categoria/novedades" limit={4} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
