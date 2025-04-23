
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client';

const UserProfilePage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{ full_name: string | null, email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica la sesión actual
    const getProfile = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/iniciar-sesion');
        return;
      }

      // Busca el perfil real del usuario
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', session.user.id)
        .single();

      if (error) {
        toast({
          title: "No se pudo cargar tu información",
          description: error.message,
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setProfile(profiles);
      setLoading(false);
    };

    getProfile();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-lg text-estilo-gold">Cargando tu información...</span>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

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
                    <p className="font-medium">{profile.full_name ?? 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Correo electrónico</p>
                    <p className="font-medium">{profile.email}</p>
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
