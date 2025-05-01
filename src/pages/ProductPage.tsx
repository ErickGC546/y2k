import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import { productsByCategory } from '../data/categoryProducts'; // Importamos los datos

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('m');
  
  // Obtenemos todos los productos de todas las categorías
  const allProducts = Object.values(productsByCategory).flat();
  
  // Find the product by slug
  const product = allProducts.find(p => p.slug === productSlug);
  
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
    addToCart(product, quantity);
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
              <Link to={`/categoria/${product.category.toLowerCase()}`} className="text-estilo-dark hover:text-estilo-gold transition-colors">
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
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md shadow-md" />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-estilo-gold text-white text-sm font-bold py-1 px-3">
                  {product.badge}
                </div>
              )}
              {product.isNew && (
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
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-lg">
                    S/ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <p className="text-gray-700 mb-4">
                  Diseñada para brindarte comodidad y estilo, esta prenda combina materiales de alta calidad con un corte moderno que se adapta 
                  perfectamente a tu día a día. Ideal para cualquier ocasión, su diseño versátil permite combinarla fácilmente con otras piezas 
                  de tu armario. Su confección cuidadosa garantiza durabilidad, suavidad al tacto y un ajuste cómodo.
                </p>
                
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Material de alta calidad</li>
                  <li>Diseño exclusivo</li>
                  <li>Disponible en varias tallas</li>
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-estilo-gold text-white py-3 font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  AÑADIR AL CARRITO
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