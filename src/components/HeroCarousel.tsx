import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://img.ltwebstatic.com/images3_pi/2024/07/10/a1/1720577934657ce58311f50cb4c47e6235bb19a72d_thumbnail_720x.jpg',
    title: 'NUEVA COLECCIÓN PRIMAVERA',
    subtitle: 'Descubre las últimas tendencias',
    cta: 'COMPRAR AHORA',
    link: '/categoria/primavera',
    altText: 'Modelo con ropa de la nueva colección de primavera'
  },
  {
    id: 2,
    image: 'https://scontent-lim1-1.cdninstagram.com/v/t51.29350-15/106504958_2942684009187755_5215182681148122901_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTgwMC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=scontent-lim1-1.cdninstagram.com&_nc_cat=111&_nc_oc=Q6cZ2QGWWVWLRpS1IAcqskp2dViqS025nfTypfOT7fywADJPsasd9yncnx0asAyMIfl_10o&_nc_ohc=wFHVXhubVR8Q7kNvwHhdfnk&_nc_gid=SfxSIKRVnRyINe9XwXzm3w&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjM0NDc5NzQzNjAwMTUzNjM3MQ%3D%3D.3-ccb7-5&oh=00_AfJ3mHfpuUyWXysVBeScokIJWiQRTxsAVk-03wKTGf4Spg&oe=682B4EBB&_nc_sid=fc8dfb',
    title: '50% DE DESCUENTO',
    subtitle: 'En prendas seleccionadas',
    cta: 'VER OFERTAS',
    link: '/categoria/ofertas',
    altText: 'Modelo con ropa de oferta'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    title: 'COLECCIÓN EXCLUSIVA',
    subtitle: 'Diseños únicos y limitados',
    cta: 'DESCUBRIR',
    link: '/categoria/exclusiva',
    altText: 'Modelo con colección exclusiva de moda'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.altText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container mx-auto px-4 md:px-10">
              <div className="max-w-md text-white">
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-2">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6">
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-estilo-gold text-white px-6 py-3 font-bold hover:bg-opacity-90 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Slide anterior"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
        aria-label="Siguiente slide"
      >
        <ArrowRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-estilo-gold w-4' : 'bg-white/50'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
