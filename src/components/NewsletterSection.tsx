
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, introduce un email válido');
      return;
    }

    // Here you would normally call an API to subscribe the user
    toast.success('¡Gracias por suscribirte a nuestro newsletter!');
    setEmail('');
  };

  return (
    <section className="py-12 px-4 bg-estilo-dark text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-estilo-gold mb-4">
            <Mail size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-3">Suscríbete a nuestro Newsletter</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Recibe las últimas novedades, promociones exclusivas y consejos de moda directamente en tu bandeja de entrada.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu dirección de email"
            className="flex-1 py-3 px-4 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-estilo-gold"
            required
          />
          <button 
            type="submit" 
            className="bg-estilo-gold text-white font-bold py-3 px-6 hover:bg-opacity-90 transition-colors"
          >
            Suscribirse
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-4">
          Al suscribirte, aceptas nuestra <a href="/politicas-de-privacidad" className="underline hover:text-estilo-gold transition-colors">política de privacidad</a>.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
