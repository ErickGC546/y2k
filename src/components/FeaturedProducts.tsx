
import React from 'react';
import ProductGrid from './ProductGrid';

interface FeaturedProductsProps {
  title?: string;
  limit?: number;
  viewAllLink?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title = "Productos Destacados", 
  limit = 8,
  viewAllLink 
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">{title}</h2>
          {viewAllLink && (
            <a 
              href={viewAllLink} 
              className="text-estilo-gold hover:text-estilo-dark transition-colors font-medium"
            >
              Ver todos →
            </a>
          )}
        </div>
        <ProductGrid limit={limit} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
