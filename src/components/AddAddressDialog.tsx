
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ open, onOpenChange, onAdded }) => {
  const { toast } = useToast();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast({ title: "Dirección inválida", variant: "destructive" });
      return;
    }
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      toast({ title: "No has iniciado sesión", variant: "destructive" });
      setLoading(false);
      return;
    }

    const user_id = sessionData.session.user.id;
    const { error } = await supabase.from('addresses').insert([
      { address, user_id }
    ]);
    setLoading(false);
    if (error) {
      toast({
        title: "No se pudo guardar la dirección",
        description: error.message,
        variant: "destructive"
      });
      return;
    }
    toast({ title: "¡Dirección guardada!" });
    setAddress('');
    onOpenChange(false);
    onAdded(); // Para refrescar la lista
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir dirección</DialogTitle>
          <DialogDescription>
            Escribe tu dirección completa para que podamos entregar tus productos.
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
            required
          />
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              Guardar
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;

