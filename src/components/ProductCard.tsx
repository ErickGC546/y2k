
import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  isNew?: boolean;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  badge, 
  isNew, 
  slug 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Convertir los datos para que sean compatibles con el contexto del carrito
    const product = {
      id: parseInt(id) || Date.now(), // Convertir string UUID a número, fallback si falla
      name,
      category: 'general', // Categoría por defecto
      price,
      originalPrice,
      image,
      isNew,
      badge,
      slug
    };
    
    // Añadir con talla M por defecto desde la vista rápida
    addToCart(product, 1, 'm');
  };

  return (
    <div className="group product-card relative bg-white overflow-hidden">
      <div className="relative">
        <Link to={`/producto/${slug}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </Link>
        
        {/* Badges */}
        {badge && (
          <div className="absolute top-2 left-2 bg-estilo-gold text-white text-xs font-bold py-1 px-2">
            {badge}
          </div>
        )}
        
        {isNew && (
          <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold py-1 px-2">
            NUEVO
          </div>
        )}
        
        {/* Quick actions overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-white hover:text-estilo-gold transition-colors">
            <Heart size={20} />
          </button>
          <button 
            className="bg-estilo-gold text-white py-1 px-4 text-sm font-bold hover:bg-opacity-90 transition-colors flex items-center"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={16} className="mr-1" />
            AÑADIR
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-3 text-left">
        <Link to={`/producto/${slug}`} className="block">
          <h3 className="font-medium text-sm mb-1 hover:text-estilo-gold transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center">
          <span className="font-bold text-lg">S/ {price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">
              S/ {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
