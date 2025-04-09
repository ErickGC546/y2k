
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">No hay productos en esta categoría</p>
        <Link to="/" className="mt-4 inline-block bg-estilo-gold text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
