import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

export interface FilterState {
  sizes: string[];
  priceRange: [number, number];
  brands: string[];
}

interface CatalogFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const priceRanges: { label: string; range: [number, number] }[] = [
  { label: 'Todos', range: [0, 99999] },
  { label: 'Hasta S/ 50', range: [0, 50] },
  { label: 'S/ 50 - S/ 100', range: [50, 100] },
  { label: 'S/ 100 - S/ 200', range: [100, 200] },
  { label: 'Más de S/ 200', range: [200, 99999] },
];

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  filters,
  onFiltersChange,
  availableBrands,
  isOpen,
  onToggle,
}) => {
  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const setPriceRange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const clearAll = () => {
    onFiltersChange({ sizes: [], priceRange: [0, 99999], brands: [] });
  };

  const hasActiveFilters = filters.sizes.length > 0 || filters.brands.length > 0 || filters.priceRange[0] !== 0 || filters.priceRange[1] !== 99999;

  return (
    <>
      {/* Toggle button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-sm font-medium border border-border px-4 py-2 hover:bg-muted transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filtros
          {hasActiveFilters && (
            <span className="bg-estilo-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filters.sizes.length + filters.brands.length + (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 99999 ? 1 : 0)}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-sm text-muted-foreground hover:text-foreground underline">
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Filter panel */}
      {isOpen && (
        <div className="border border-border bg-card p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sizes */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-10 h-10 text-xs font-bold border-2 transition-all ${
                    filters.sizes.includes(size)
                      ? 'border-estilo-dark bg-estilo-dark text-white'
                      : 'border-gray-300 hover:border-estilo-dark'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Precio</h3>
            <div className="flex flex-col gap-2">
              {priceRanges.map((pr) => (
                <button
                  key={pr.label}
                  onClick={() => setPriceRange(pr.range)}
                  className={`text-left text-sm px-3 py-1.5 border transition-all ${
                    filters.priceRange[0] === pr.range[0] && filters.priceRange[1] === pr.range[1]
                      ? 'border-estilo-dark bg-estilo-dark text-white'
                      : 'border-gray-200 hover:border-estilo-dark'
                  }`}
                >
                  {pr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">Marca</h3>
            {availableBrands.length > 0 ? (
              <div className="flex flex-col gap-2">
                {availableBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="accent-estilo-gold w-4 h-4"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Sin marcas disponibles</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogFilters;
