
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url?: string;
  badge?: string;
  category: string;
  slug: string;
  stock?: number;
  is_active?: boolean;
  is_new?: boolean;
}

interface ProductGridProps {
  category?: string;
  title?: string;
  showAll?: boolean;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  category, 
  title = "Productos Destacados", 
  showAll = false,
  limit 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category, showAll, limit]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from database...');
      
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Si hay una categoría específica, filtrar por ella
      if (category && category !== 'todos') {
        query = query.eq('category', category);
      }

      // Si no es showAll y hay un limit específico, usar ese limit
      if (!showAll) {
        const limitToUse = limit || 8;
        query = query.limit(limitToUse);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        return;
      }

      console.log('Products fetched:', data);
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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
        <div className="text-center py-8">Cargando productos...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos{category && category !== 'todos' ? ` en la categoría "${category}"` : ''}.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default ProductGrid;
