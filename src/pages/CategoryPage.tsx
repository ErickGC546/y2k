
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

  // Mapear el slug de la URL a los nombres de categoría que están en la base de datos
  const getCategoryForQuery = (slug: string) => {
    switch (slug) {
      case 'mujer': return 'Mujer';
      case 'hombre': return 'Hombre';
      case 'accesorios': return 'Accesorios';
      case 'novedades': return 'new'; // Caso especial para productos nuevos
      default: return slug;
    }
  };

  const categoryForQuery = getCategoryForQuery(categoryKey);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <CategoryHeader categoryName={categoryName} />
        
        <div className="container mx-auto px-4 pb-8">
          <ProductGrid 
            category={categoryForQuery} 
            title={`Productos de ${categoryName}`}
            showAll={true}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
