
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
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
      console.log('Fetching product with slug:', productSlug);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', productSlug)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        return;
      }

      console.log('Product fetched:', data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-estilo-gold mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If product not found, show a proper message
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
            <p className="mb-6">El producto que estás buscando no existe o ha sido eliminado.</p>
            <Link to="/" className="inline-block bg-estilo-gold text-white px-6 py-2 font-bold hover:bg-opacity-90 transition-colors">
              Volver a la tienda
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // Convertir el producto de la base de datos al formato que espera el carrito
    const cartProduct = {
      id: parseInt(product.id) || Date.now(), // Fallback para ID numérico
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
        <div className="bg-gray-100 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <Link to="/" className="text-estilo-dark hover:text-estilo-gold transition-colors">
                Inicio
              </Link>
              <span className="text-gray-500 mx-2">/</span>
              <Link to={`/categoria/${getCategorySlug(product.category)}`} className="text-estilo-dark hover:text-estilo-gold transition-colors">
                {product.category}
              </Link>
              <span className="text-gray-500 mx-2">/</span>
              <span className="font-medium">{product.name}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="relative">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-md shadow-md" 
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-estilo-gold text-white text-sm font-bold py-1 px-3">
                  {product.badge}
                </div>
              )}
              {product.is_new && (
                <div className="absolute top-4 right-4 bg-black text-white text-sm font-bold py-1 px-3">
                  NUEVO
                </div>
              )}
            </div>
            
            {/* Product details */}
            <div>
              <h1 className="text-3xl font-bold font-montserrat mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.category}</p>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold mr-3">S/ {product.price.toFixed(2)}</span>
                {product.original_price && (
                  <span className="text-gray-500 line-through text-lg">
                    S/ {product.original_price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <p className="text-gray-700 mb-4">
                  {product.description || "Diseñada para brindarte comodidad y estilo, esta prenda combina materiales de alta calidad con un corte moderno que se adapta perfectamente a tu día a día. Ideal para cualquier ocasión, su diseño versátil permite combinarla fácilmente con otras piezas de tu armario."}
                </p>
                
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Material de alta calidad</li>
                  <li>Diseño exclusivo</li>
                  <li>Disponible en varias tallas</li>
                  <li>Stock disponible: {product.stock}</li>
                </ul>
              </div>
              
              <div className="flex space-x-4 mb-6">
                <div className="w-1/3">
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                    Talla
                  </label>
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-estilo-gold"
                  >
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </div>
                
                <div className="w-1/3">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-estilo-gold"
                  >
                    {[...Array(Math.min(5, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-estilo-gold text-white py-3 font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  {product.stock === 0 ? 'SIN STOCK' : 'AÑADIR AL CARRITO'}
                </button>
                
                <button className="bg-white text-estilo-dark border border-gray-300 p-3 hover:bg-gray-100 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
