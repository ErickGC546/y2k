
import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  badge?: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group product-card relative bg-white overflow-hidden">
      <div className="relative">
        <Link to={`/producto/${product.slug}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-2 left-2 bg-estilo-gold text-white text-xs font-bold py-1 px-2">
            {product.badge}
          </div>
        )}
        
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold py-1 px-2">
            NUEVO
          </div>
        )}
        
        {/* Quick actions overlay */}
        <div className="product-actions absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 flex justify-between opacity-0 transition-opacity duration-300">
          <button className="text-white hover:text-estilo-gold transition-colors">
            <Heart size={20} />
          </button>
          <button className="bg-estilo-gold text-white py-1 px-4 text-sm font-bold hover:bg-opacity-90 transition-colors flex items-center">
            <ShoppingBag size={16} className="mr-1" />
            AÑADIR
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-3 text-left">
        <Link to={`/producto/${product.slug}`} className="block">
          <h3 className="font-medium text-sm mb-1 hover:text-estilo-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-xs mb-2">{product.category}</p>
        <div className="flex items-center">
          <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">
              {product.originalPrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
