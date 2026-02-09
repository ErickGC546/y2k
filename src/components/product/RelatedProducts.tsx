import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import { supabase } from '@/integrations/supabase/client';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .neq('id', currentProductId)
        .limit(4);
      
      setProducts(data || []);
    };
    fetchRelated();
  }, [category, currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-montserrat text-center mb-8">
          Completa tu Look
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
    </section>
  );
};

export default RelatedProducts;
