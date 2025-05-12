
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileCardProps {
  profile: {
    full_name: string | null;
    email: string;
  };
  loading: boolean;
  onProfileUpdate: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, loading, onProfileUpdate }) => {
  const { toast } = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(profile.full_name ?? '');

  // Handler para editar el nombre
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast({ title: "Nombre inválido", variant: "destructive" });
      return;
    }
    
    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: editName })
      .eq('id', session.user.id);

    setEditOpen(false);
    
    if (error) {
      toast({ title: "No se pudo actualizar", description: error.message, variant: "destructive" });
      return;
    }
    
    toast({ title: "¡Nombre actualizado!" });
    onProfileUpdate();
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <User className="mr-2 h-5 w-5 text-estilo-gold" />
          Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="font-medium">{profile.full_name ?? 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <p className="font-medium">{profile.email}</p>
          </div>
          
          <div className="pt-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
