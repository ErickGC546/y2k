import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { supabase } from '@/integrations/supabase/client';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,badge.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(20);

      setProducts(data || []);
      setLoading(false);
    };
    search();
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold font-montserrat mb-2">
          Resultados para "{query}"
        </h1>
        <p className="text-muted-foreground mb-8">
          {loading ? 'Buscando...' : `${products.length} producto(s) encontrado(s)`}
        </p>

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No se encontraron productos para tu búsqueda.</p>
            <p className="text-sm text-muted-foreground mt-2">Intenta con otro término.</p>
          </div>
        )}

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
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
