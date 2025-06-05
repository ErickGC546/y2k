
import React from 'react';
import ProductGrid from './ProductGrid';

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
        <ProductGrid limit={8} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
