
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface CategoryHeaderProps {
  categoryName: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName }) => {
  return (
    <>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link to="/" className="text-estilo-dark hover:text-estilo-gold transition-colors mr-2">
              Inicio
            </Link>
            <span className="text-gray-500 mx-2">/</span>
            <span className="font-medium">{categoryName}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-montserrat">{categoryName}</h1>
          <Link to="/" className="flex items-center text-estilo-dark hover:text-estilo-gold transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Volver
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
