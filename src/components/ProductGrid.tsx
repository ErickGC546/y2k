
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: string;
  image_url?: string;
  stock: number;
  is_active: boolean;
  is_new: boolean;
  badge?: string;
  slug: string;
}

interface ProductGridProps {
  category?: string;
  showAll?: boolean;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, showAll = false, limit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category, showAll, limit]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products with params:', { category, showAll, limit });
      
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Solo aplicar filtros de categoría si no queremos mostrar todos
      if (category && !showAll) {
        console.log('Filtering by category:', category);
        
        // Mapear categorías de URL a categorías de base de datos
        switch (category) {
          case 'mujer':
            query = query.eq('category', 'Mujer');
            break;
          case 'hombre':
            query = query.eq('category', 'Hombre');
            break;
          case 'accesorios':
            query = query.eq('category', 'Accesorios');
            break;
          case 'ofertas':
            // Para ofertas, mostrar productos con precio original (descuentos)
            query = query.not('original_price', 'is', null);
            break;
          case 'novedades':
            // Para novedades, mostrar productos marcados como nuevos
            query = query.eq('is_new', true);
            break;
          default:
            // Para otras categorías, intentar búsqueda directa
            query = query.eq('category', category);
        }
      }

      if (limit && limit > 0) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      console.log('Products fetched:', data?.length || 0);
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.original_price}
          image={product.image_url || '/placeholder.svg'}
          badge={product.badge}
          isNew={product.is_new}
          slug={product.slug}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
