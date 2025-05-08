import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const featuredProducts: Product[] = [
  {
    id: 24,
    name: 'Conjunto Corteiz Street',
    category: 'Mujer',
    price: 89.99,
    image: 'https://media.karousell.com/media/photos/products/2024/3/30/corteiz_crtz_hood__pants__beig_1711778357_735f83bb_progressive.jpg',
    isNew: true,
    slug: 'conjunto-corteiz-street',
  },
  {
    id: 25,
    name: 'Chándal DENIM TEARS (Rosa)',
    category: 'Hombre',
    price: 95.99,
    image: 'https://i.pinimg.com/736x/45/b3/51/45b3512a3d7b206945dbf70a3ef54be5.jpg',
    isNew: true,
    slug: 'chandal-rosa',
  },
  {
    id: 26,
    name: 'Poleron Syna World',
    category: 'Hombre',
    price: 79.99,
    image: 'https://dripkickzz.com/wp-content/uploads/2025/01/8c7c7fd2-scaled-1-510x510.jpg',
    isNew: true,
    slug: 'poleron-syna',
  },
  {
    id: 21,
    name: 'Chándal DENIM TEARS (Azul)',
    category: 'Hombre',
    price: 69.99,
    image: 'https://img.ltwebstatic.com/images3_pi/2024/09/29/ed/1727574664fe40288625052e2467a05feaca4a2460_thumbnail_336x.jpg',
    isNew: true,
    slug: 'chandal-azul',
  },
  {
    id: 8,
    name: 'Gorra 9Fifty Metallic',
    category: 'Accesorios',
    price: 65.90,
    image: 'https://img.sombreroshop.es/Gorra-9Fifty-Metallic-Arch-Yankees-by-New-Era.67618_pf4.jpg?_gl=1*1ya6x5h*_ga*NDk4MTI0Njc1LjE3NDYwNzgwNzU.*_ga_B7FCYF3ZVR*MTc0NjA3ODA3NC4xLjAuMTc0NjA3ODA3OC4wLjAuMTQ2MTg3NzA2*_fplc*ckR4ejlYa0QxTCUyRkw3WDJzN1prS2gxUUZlRjd1VVIzNEVkSExVVFRYdGpMSGc0TFQxbmFyenFTQVBYS2xPZjVTOVE5Y1AwJTJGQWZ0dUhGVWJsaUFTS1lFT0hjbEFRY1IzNXlLRk9zMHNQdEF5QWVQS2ZBQmwwa21iaFJva3hQdyUzRCUzRA..*_gcl_au*MTQyMDEwODE5OC4xNzQ2MDc4MDc5*FPAU*MTQyMDEwODE5OC4xNzQ2MDc4MDc5',
    isNew: true,
    slug: 'gorra-fifty',
  },
  {
    id: 27,
    name: 'Gorra Cash Only La Hands Black',
    category: 'Accesorios',
    price: 60.00,
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_925098-MLM73552459211_122023-F-gorra-cash-only-la-hands-black-100-original.webp',
    isNew: true,
    slug: 'gorra-cash',
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
    id: 1,
    name: 'Vestido Floral de Verano',
    category: 'Mujer',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    isNew: true,
    slug: 'vestido-floral-verano',
  }
];

interface FeaturedProductsProps {
  title?: string;
  viewAllLink?: string;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title = "Productos Destacados", 
  viewAllLink = "/categoria/ofertas", 
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
