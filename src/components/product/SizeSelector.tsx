import React from 'react';

interface SizeSelectorProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const sizes = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
];

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold uppercase tracking-wider">Talla</span>
        <button className="text-xs text-muted-foreground underline hover:text-estilo-gold transition-colors">
          Guía de tallas
        </button>
      </div>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onSizeChange(size.value)}
            className={`w-12 h-12 flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${
              selectedSize === size.value
                ? 'border-estilo-dark bg-estilo-dark text-white'
                : 'border-gray-300 bg-white text-foreground hover:border-estilo-dark'
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
