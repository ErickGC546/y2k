
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

const UserProfilePage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<{ full_name: string | null, email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados para diálogos
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [addressOpen, setAddressOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/iniciar-sesion');
        return;
      }
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
      setEditName(profiles.full_name ?? '');
      setLoading(false);
    };

    getProfile();
  }, [navigate, toast]);

  // Handler para "Cerrar sesión"
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate('/');
  };

  // Handler para editar el nombre
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast({ title: "Nombre inválido", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: editName })
      .eq('id', session.user.id);
    setLoading(false);
    setEditOpen(false);
    if (error) {
      toast({ title: "No se pudo actualizar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "¡Nombre actualizado!" });
    setProfile(p => p ? { ...p, full_name: editName } : p);
  };

  // Handler para añadir dirección (solo muestra toast, la funcionalidad real debe definirse en la base de datos)
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddressOpen(false);
    setAddress('');
    toast({ title: "Funcionalidad demo", description: "Aquí agregarías tu lógica para guardar la dirección." });
  };

  // Handler para cambiar contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    setPasswordOpen(false);
    setNewPassword('');
    if (error) {
      toast({ title: "No se pudo cambiar la contraseña", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Contraseña actualizada" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-lg text-estilo-gold">Cargando tu información...</span>
      </div>
    );
  }
  if (!profile) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-estilo-dark font-montserrat">Mi Cuenta</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Información personal */}
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
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
                    >
                      Editar información
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar nombre</DialogTitle>
                      <DialogDescription>
                        Modifica tu nombre. El correo no puede ser cambiado aquí.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateName} className="space-y-4 py-2">
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Nombre completo"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        disabled={loading}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={loading}>
                          Guardar
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setEditOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Mis pedidos */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Mis pedidos</h2>
                <p className="text-gray-600">No tienes pedidos recientes.</p>
                <Link to="/">
                  <Button className="mt-4 bg-estilo-gold hover:bg-opacity-90 text-white">
                    Ir a comprar
                  </Button>
                </Link>
              </div>
              {/* Direcciones */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Direcciones guardadas</h2>
                <p className="text-gray-600">No tienes direcciones guardadas.</p>
                <Dialog open={addressOpen} onOpenChange={setAddressOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mt-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
                    >
                      Añadir dirección
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir dirección</DialogTitle>
                      <DialogDescription>
                        Ingresa tu nueva dirección. (Esta demo no guarda realmente, contáctame si necesitas almacenamiento real)
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAddress} className="space-y-4 py-2">
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Dirección"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        disabled={loading}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={loading}>
                          Guardar
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setAddressOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Seguridad */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
                <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mb-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
                    >
                      Cambiar contraseña
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cambiar contraseña</DialogTitle>
                      <DialogDescription>
                        Ingresa tu nueva contraseña para actualizarla.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleChangePassword} className="space-y-4 py-2">
                      <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        disabled={loading}
                        required
                        minLength={6}
                      />
                      <DialogFooter>
                        <Button type="submit" disabled={loading || newPassword.length < 6}>
                          Cambiar
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setPasswordOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
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
