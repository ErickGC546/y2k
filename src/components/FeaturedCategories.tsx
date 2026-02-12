
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Mujer',
    image: 'https://i.ibb.co/Wv7V6B9B/negromujer.jpg',
    slug: 'mujer',
  },
  {
    id: 2,
    name: 'Hombre',
    image: 'https://i.ibb.co/vC63KkJ7/celestehombre.jpg',
    slug: 'hombre',
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold font-montserrat text-center mb-10">Categorías Destacadas</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/categoria/${category.slug}`} 
              key={category.id}
              className="group block relative overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={`Categoría ${category.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold font-montserrat mb-2">{category.name}</h3>
                <span className="text-white flex items-center text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Ver productos <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
