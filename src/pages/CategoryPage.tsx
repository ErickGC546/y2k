
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard, { Product } from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for products by category
const productsByCategory: Record<string, Product[]> = {
  mujer: [
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
      id: 5,
      name: 'Jeans Slim Fit',
      category: 'Mujer',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      slug: 'jeans-slim-fit',
    },
    {
      id: 9,
      name: 'Blusa de Seda',
      category: 'Mujer',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      slug: 'blusa-seda',
    },
    {
      id: 10,
      name: 'Falda Plisada',
      category: 'Mujer',
      price: 38.99,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a773ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      slug: 'falda-plisada',
    },
  ],
  hombre: [
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
      id: 11,
      name: 'Pantalón Chino',
      category: 'Hombre',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      slug: 'pantalon-chino',
    },
  ],
  ninos: [
    {
      id: 12,
      name: 'Conjunto Infantil',
      category: 'Niños',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      slug: 'conjunto-infantil',
    },
    {
      id: 13,
      name: 'Camiseta Estampada',
      category: 'Niños',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      slug: 'camiseta-estampada-ninos',
    },
    {
      id: 19,
      name: 'Zapatillas Infantiles',
      category: 'Niños',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1555274175-75f4056dfd05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      slug: 'zapatillas-infantiles',
    },
  ],
  accesorios: [
    {
      id: 6,
      name: 'Reloj Clásico',
      category: 'Accesorios',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      slug: 'reloj-clasico',
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
    {
      id: 14,
      name: 'Gafas de Sol',
      category: 'Accesorios',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      slug: 'gafas-sol',
    },
  ],
  deportes: [
    {
      id: 4,
      name: 'Zapatillas Deportivas',
      category: 'Deportes',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      slug: 'zapatillas-deportivas',
    },
    {
      id: 15,
      name: 'Camiseta Técnica',
      category: 'Deportes',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      slug: 'camiseta-tecnica',
    },
    {
      id: 20,
      name: 'Pantalón Deportivo',
      category: 'Deportes',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=840&q=80',
      slug: 'pantalon-deportivo',
    },
  ],
  ofertas: [
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
      id: 7,
      name: 'Suéter de Lana',
      category: 'Hombre',
      price: 69.99,
      originalPrice: 89.99,
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
      badge: 'OFERTA',
      slug: 'sueter-lana',
    },
  ],
  novedades: [
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
      id: 8,
      name: 'Bolso de Cuero',
      category: 'Accesorios',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      isNew: true,
      slug: 'bolso-cuero',
    },
  ],
  primavera: [
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
      id: 16,
      name: 'Chaqueta Ligera',
      category: 'Mujer',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      slug: 'chaqueta-ligera',
    },
  ],
  exclusiva: [
    {
      id: 17,
      name: 'Vestido de Noche',
      category: 'Mujer',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      badge: 'EXCLUSIVO',
      slug: 'vestido-noche',
    },
    {
      id: 18,
      name: 'Traje Formal',
      category: 'Hombre',
      price: 229.99,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      badge: 'EXCLUSIVO',
      slug: 'traje-formal',
    },
  ],
};

// Category name mapping for display
const categoryNames: Record<string, string> = {
  mujer: 'Mujer',
  hombre: 'Hombre',
  ninos: 'Niños',
  accesorios: 'Accesorios',
  deportes: 'Deportes',
  ofertas: 'Ofertas',
  novedades: 'Novedades',
  primavera: 'Colección Primavera',
  exclusiva: 'Colección Exclusiva',
};

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categoryKey = categorySlug || '';
  const products = productsByCategory[categoryKey] || [];
  const categoryName = categoryNames[categoryKey] || 'Categoría';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <Link to="/" className="text-estilo-dark hover:text-estilo-gold transition-colors mr-2">
                Inicio
              </Link>
              <span className="text-gray-500 mx-2">/</span>
              <span className="font-medium">{categoryName}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-montserrat">{categoryName}</h1>
            <Link to="/" className="flex items-center text-estilo-dark hover:text-estilo-gold transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Volver
            </Link>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No hay productos en esta categoría</p>
              <Link to="/" className="mt-4 inline-block bg-estilo-gold text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors">
                Volver a la tienda
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
