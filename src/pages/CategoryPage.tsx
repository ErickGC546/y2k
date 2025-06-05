
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryHeader from '../components/CategoryHeader';
import ProductGrid from '../components/ProductGrid';

const categoryNames: Record<string, string> = {
  'mujer': 'Mujer',
  'hombre': 'Hombre',
  'accesorios': 'Accesorios',
  'ofertas': 'Ofertas',
  'novedades': 'Novedades'
};

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const categoryKey = categorySlug || '';
  const categoryName = categoryNames[categoryKey] || 'Categoría';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <CategoryHeader categoryName={categoryName} />
        
        <div className="container mx-auto px-4 pb-8">
          <ProductGrid category={categoryKey} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
