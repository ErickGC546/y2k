
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-estilo-dark font-montserrat">Iniciar sesión</h1>
            <LoginForm />
            
            <div className="mt-8 text-center">
              <p>¿No tienes una cuenta? <Link to="/crear-cuenta" className="text-estilo-gold hover:underline">Regístrate</Link></p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
