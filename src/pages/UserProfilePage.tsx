
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const UserProfilePage: React.FC = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    // En un entorno real, aquí se manejaría el cierre de sesión
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-estilo-dark font-montserrat">Mi Cuenta</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Información personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="font-medium">Usuario de Ejemplo</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correo electrónico</p>
                    <p className="font-medium">usuario@ejemplo.com</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
                >
                  Editar información
                </Button>
              </div>
              
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Mis pedidos</h2>
                <p className="text-gray-600">No tienes pedidos recientes.</p>
                <Link to="/">
                  <Button className="mt-4 bg-estilo-gold hover:bg-opacity-90 text-white">
                    Ir a comprar
                  </Button>
                </Link>
              </div>
              
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Direcciones guardadas</h2>
                <p className="text-gray-600">No tienes direcciones guardadas.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
                >
                  Añadir dirección
                </Button>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
                <Button 
                  variant="outline" 
                  className="mb-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
                >
                  Cambiar contraseña
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfilePage;
