import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { supabase } from "@/integrations/supabase/client";
import ProductImageGallery from '../components/product/ProductImageGallery';
import SizeSelector from '../components/product/SizeSelector';
import RelatedProducts from '../components/product/RelatedProducts';
import StickyAddToCart from '../components/product/StickyAddToCart';

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

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('m');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        setProduct(null);
        return;
      }
      setProduct(data);
    } catch {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    const cartProduct = {
      id: parseInt(product.id) || Date.now(),
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.original_price,
      image: product.image_url || '/placeholder.svg',
      isNew: product.is_new,
      badge: product.badge,
      slug: product.slug
    };
    addToCart(cartProduct, quantity, size);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-estilo-gold mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando producto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
            <p className="mb-6 text-muted-foreground">El producto que estás buscando no existe o ha sido eliminado.</p>
            <Link to="/" className="inline-block bg-estilo-gold text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors">
              Volver a la tienda
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategorySlug = (category: string) => {
    switch (category) {
      case 'Mujer': return 'mujer';
      case 'Hombre': return 'hombre';
      case 'Accesorios': return 'accesorios';
      default: return category.toLowerCase();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-muted py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-muted-foreground hover:text-estilo-gold transition-colors">Inicio</Link>
              <span className="text-muted-foreground mx-2">/</span>
              <Link to={`/categoria/${getCategorySlug(product.category)}`} className="text-muted-foreground hover:text-estilo-gold transition-colors">
                {product.category}
              </Link>
              <span className="text-muted-foreground mx-2">/</span>
              <span className="font-medium text-foreground">{product.name}</span>
            </div>
          </div>
        </div>
        
        {/* Product content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery */}
            <ProductImageGallery
              mainImage={product.image_url || '/placeholder.svg'}
              productName={product.name}
              badge={product.badge}
              isNew={product.is_new}
            />
            
            {/* Product details */}
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{product.category}</span>
              <h1 className="text-3xl font-bold font-montserrat mb-4">{product.name}</h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold">S/ {product.price.toFixed(2)}</span>
                {product.original_price && (
                  <span className="text-muted-foreground line-through text-lg">
                    S/ {product.original_price.toFixed(2)}
                  </span>
                )}
                {product.original_price && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                    -{Math.round((1 - product.price / product.original_price) * 100)}%
                  </span>
                )}
              </div>
              
              <div className="border-t border-border py-6 mb-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "Diseñada para brindarte comodidad y estilo, esta prenda combina materiales de alta calidad con un corte moderno que se adapta perfectamente a tu día a día."}
                </p>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <SizeSelector selectedSize={size} onSizeChange={setSize} />
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <span className="text-sm font-semibold uppercase tracking-wider block mb-3">Cantidad</span>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center border-x border-border font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{product.stock} disponible(s)</p>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-estilo-gold text-white py-3.5 font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} />
                  {product.stock === 0 ? 'SIN STOCK' : 'AÑADIR AL CARRITO'}
                </button>
                <button className="border border-border p-3.5 hover:bg-muted transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* Extra info */}
              <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>✓</span> Envío gratis en pedidos mayores a S/ 150
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span> Devolución gratuita en 30 días
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span> Material de alta calidad
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </main>

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCart
        productName={product.name}
        price={product.price}
        originalPrice={product.original_price}
        onAddToCart={handleAddToCart}
        disabled={product.stock === 0}
      />
      
      <Footer />
    </div>
  );
};

export default ProductPage;
