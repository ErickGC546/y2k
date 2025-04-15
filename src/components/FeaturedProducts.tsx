
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Mock data
const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Vestido Floral de Verano',
    category: 'Mujer',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    isNew: true,
    slug: 'vestido-floral-verano',
  },
  {
    id: 2,
    name: 'Camisa Oxford Azul',
    category: 'Hombre',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    slug: 'camisa-oxford-azul',
  },
  {
    id: 3,
    name: 'Chaqueta de Cuero',
    category: 'Hombre',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    badge: 'OFERTA',
    slug: 'chaqueta-cuero',
  },
  {
    id: 4,
    name: 'Zapatillas Deportivas',
    category: 'Deportes',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    slug: 'zapatillas-deportivas',
  },
  {
    id: 5,
    name: 'Jeans Slim Fit',
    category: 'Mujer',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
    slug: 'jeans-slim-fit',
  },
  {
    id: 6,
    name: 'Reloj Clásico',
    category: 'Accesorios',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    slug: 'reloj-clasico',
  },
  {
    id: 7,
    name: 'Suéter de Lana',
    category: 'Hombre',
    price: 69.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    badge: 'OFERTA',
    slug: 'sueter-lana',
  },
  {
    id: 8,
    name: 'Bolso de Cuero',
    category: 'Accesorios',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    isNew: true,
    slug: 'bolso-cuero',
  },
];

interface FeaturedProductsProps {
  title?: string;
  viewAllLink?: string;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title = "Productos Destacados", 
  viewAllLink = "/productos", 
  limit = 8 
}) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-white">{title}</h2>
          <Link 
            to={viewAllLink}
            className="text-white hover:text-estilo-gold transition-colors flex items-center text-sm font-medium"
          >
            Ver todo <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.slice(0, limit).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
