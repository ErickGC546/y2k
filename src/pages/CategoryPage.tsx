import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryHeader from '../components/CategoryHeader';
import CatalogFilters, { FilterState } from '../components/catalog/CatalogFilters';
import { supabase } from '@/integrations/supabase/client';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    priceRange: [0, 99999],
    brands: [],
  });
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  const getCategoryName = (slug: string) => {
    const map: Record<string, string> = {
      mujer: 'Mujer',
      hombre: 'Hombre',
      accesorios: 'Accesorios',
      novedades: 'novedades',
    };
    return map[slug] || slug;
  };

  const getCategoryTitle = (slug: string) => {
    const map: Record<string, string> = {
      mujer: 'Ropa para Mujer',
      hombre: 'Ropa para Hombre',
      accesorios: 'Accesorios',
      novedades: 'Novedades',
    };
    return map[slug] || `Categoría ${slug}`;
  };

  useEffect(() => {
    if (!categorySlug) return;
    const fetchProducts = async () => {
      setLoading(true);
      const categoryName = getCategoryName(categorySlug);

      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (categoryName === 'novedades') {
        query = query.eq('is_new', true);
      } else {
        query = query.eq('category', categoryName);
      }

      const { data } = await query;
      const all = data || [];

      // Extract unique brands (using badge as brand for now)
      const brands = [...new Set(all.map((p: any) => p.badge).filter(Boolean))] as string[];
      setAvailableBrands(brands);

      // Apply client-side filters
      let filtered = all;
      if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 99999) {
        filtered = filtered.filter(
          (p: any) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );
      }
      if (filters.brands.length > 0) {
        filtered = filtered.filter((p: any) => filters.brands.includes(p.badge));
      }
      // Size filter would apply if products had size data

      setProducts(filtered);
      setLoading(false);
    };
    fetchProducts();
  }, [categorySlug, filters]);

  if (!categorySlug) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
            <p className="text-muted-foreground">La categoría que buscas no existe.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryTitle = getCategoryTitle(categorySlug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryHeader categoryName={categoryTitle} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CatalogFilters
          filters={filters}
          onFiltersChange={setFilters}
          availableBrands={availableBrands}
          isOpen={filtersOpen}
          onToggle={() => setFiltersOpen(!filtersOpen)}
        />

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Cargando productos...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No se encontraron productos con los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.original_price}
                image={product.image_url || '/placeholder.svg'}
                badge={product.badge}
                slug={product.slug}
                isNew={product.is_new}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
