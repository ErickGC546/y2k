
import React from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: 'url("https://images.adsttc.com/media/images/64e6/7469/8177/ff39/41f1/5d37/slideshow/the-strategic-use-of-color-in-environmental-graphic-design_7.jpg?1692824738")' }}>
      <Navbar />
      
      <main className="flex-grow">
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
