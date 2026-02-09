import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  mainImage: string;
  productName: string;
  badge?: string;
  isNew?: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainImage,
  productName,
  badge,
  isNew,
}) => {
  // Simulate multiple images from a single image (in real app, products would have multiple images)
  const images = [mainImage, mainImage, mainImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const child = scrollRef.current.children[index] as HTMLElement;
      child?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  return (
    <div className="relative">
      {/* Main scrollable gallery */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full snap-start relative">
            <img
              src={img}
              alt={`${productName} - ${i + 1}`}
              className="w-full h-[500px] md:h-[650px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        ))}
      </div>

      {/* Badges */}
      {badge && (
        <div className="absolute top-4 left-4 bg-estilo-gold text-white text-sm font-bold py-1 px-3 z-10">
          {badge}
        </div>
      )}
      {isNew && (
        <div className="absolute top-4 right-4 bg-estilo-dark text-white text-sm font-bold py-1 px-3 z-10">
          NUEVO
        </div>
      )}

      {/* Navigation arrows */}
      <button
        onClick={() => scrollToImage(Math.max(0, activeIndex - 1))}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
        disabled={activeIndex === 0}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scrollToImage(Math.min(images.length - 1, activeIndex + 1))}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
        disabled={activeIndex === images.length - 1}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToImage(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === activeIndex ? 'bg-estilo-dark' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 px-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => scrollToImage(i)}
            className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden border-2 transition-colors ${
              i === activeIndex ? 'border-estilo-dark' : 'border-transparent'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
