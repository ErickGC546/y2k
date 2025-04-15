import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const featuredProducts: Product[] = [
  {
    id: 24,
    name: 'Conjunto Corteiz Beige',
    category: 'Hombre',
    price: 89.99,
    image: 'https://media.karousell.com/media/photos/products/2024/3/30/corteiz_crtz_hood__pants__beig_1711778357_735f83bb_progressive.jpg',
    isNew: true,
    slug: 'conjunto-corteiz-beige',
  },
  {
    id: 25,
    name: 'Chándal DENIM TEARS (Rosa)',
    category: 'Mujer',
    price: 95.99,
    image: 'https://i.pinimg.com/736x/45/b3/51/45b3512a3d7b206945dbf70a3ef54be5.jpg',
    isNew: true,
    slug: 'chaqueta-essential',
  },
  {
    id: 26,
    name: 'Poleron Syna World',
    category: 'Hombre',
    price: 79.99,
    image: 'https://dripkickzz.com/wp-content/uploads/2025/01/8c7c7fd2-scaled-1-510x510.jpg',
    isNew: true,
    slug: 'sudadera-urban-style',
  },
  {
    id: 21,
    name: 'Chándal DENIM TEARS (Azul)',
    category: 'Mujer',
    price: 69.99,
    image: 'https://img.ltwebstatic.com/images3_pi/2024/09/29/ed/1727574664fe40288625052e2467a05feaca4a2460_thumbnail_336x.jpg',
    isNew: true,
    slug: 'conjunto-deportivo-rosa',
  },
  {
    id: 22,
    name: 'Corteiz C-Star Tracksuit Black',
    category: 'Hombre',
    price: 75.99,
    image: 'https://d141zx60z515qt.cloudfront.net/mp5265662ed2/pr350ad/img0_1200w.webp',
    isNew: true,
    slug: 'set-deportivo-negro',
  },
  {
    id: 23,
    name: 'Trapstar London Trapstar',
    category: 'Mujer',
    price: 129.99,
    image: 'https://tnairshoes.com.au/cdn/shop/files/image_ca2f328c-791e-403d-82df-287622cf13bc_1445x.jpg?v=1689510848',
    isNew: true,
    slug: 'zapatillas-runner-elite',
  }
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
