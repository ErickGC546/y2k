
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Key, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SecuritySettingsProps {
  loading: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ loading }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Handler para "Cerrar sesión"
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate('/');
  };

  // Handler para cambiar contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordOpen(false);
    setNewPassword('');
    
    if (error) {
      toast({ 
        title: "No se pudo cambiar la contraseña", 
        description: error.message, 
        variant: "destructive" 
      });
    } else {
      toast({ title: "Contraseña actualizada" });
    }
  };

  return (
    <div className="space-y-2">
      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
          >
            <Key className="mr-2 h-4 w-4" />
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
        className="w-full"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  );
};

export default SecuritySettings;
