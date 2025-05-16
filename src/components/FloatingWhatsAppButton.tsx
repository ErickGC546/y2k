import React from 'react';

const FloatingWhatsAppButton: React.FC = () => {
  return (
    <>
      {/* Escritorio (md o más): usa web.whatsapp.com */}
      <a 
        href="https://web.whatsapp.com/send?phone=51955286210&text=Hola,%20estoy%20interesado%20en%20un%20producto" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 hidden md:flex items-center shadow-lg rounded-md overflow-hidden"
      >
        <div className="bg-green-500 p-3 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967...Z" />
          </svg>
        </div>
        <div className="bg-blue-600 text-white py-2 px-3 font-bold text-sm">
          Compra ahora
        </div>
      </a>

      {/* Móvil (menor a md): usa wa.me */}
      <a 
        href="https://wa.me/51955286210?text=Hola,%20estoy%20interesado%20en%20un%20producto" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex md:hidden items-center shadow-lg rounded-md overflow-hidden"
      >
        <div className="bg-green-500 p-3 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967...Z" />
          </svg>
        </div>
        <div className="bg-blue-600 text-white py-2 px-3 font-bold text-sm">
          Compra ahora
        </div>
      </a>
    </>
  );
};

export default FloatingWhatsAppButton;
