
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import CategoryHeader from '../components/CategoryHeader';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  // Mapear los slugs de URL a nombres de categorías en la base de datos
  const getCategoryName = (slug: string) => {
    const categoryMap: { [key: string]: string } = {
      'mujer': 'Mujer',
      'hombre': 'Hombre',
      'accesorios': 'Accesorios',
      'novedades': 'novedades' // Caso especial para productos nuevos
    };
    return categoryMap[slug] || slug;
  };

  const getCategoryTitle = (slug: string) => {
    const titleMap: { [key: string]: string } = {
      'mujer': 'Ropa para Mujer',
      'hombre': 'Ropa para Hombre',
      'accesorios': 'Accesorios',
      'novedades': 'Novedades'
    };
    return titleMap[slug] || `Categoría ${slug}`;
  };

  if (!categorySlug) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
            <p>La categoría que buscas no existe.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  };

  const categoryName = getCategoryName(categorySlug);
  const categoryTitle = getCategoryTitle(categorySlug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryHeader categoryName={categoryTitle} />
      <main className="flex-grow">
        <ProductGrid 
          category={categoryName}
          title={categoryTitle}
          showAll={true}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
