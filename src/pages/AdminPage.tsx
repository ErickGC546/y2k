
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminDashboard from '../components/admin/AdminDashboard';

const AdminPage: React.FC = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-lg text-estilo-gold">Verificando permisos...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
            <p className="text-gray-600 mb-4">No tienes permisos para acceder al panel de administración.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-estilo-gold text-white px-6 py-2 rounded hover:bg-opacity-90"
            >
              Volver al inicio
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
