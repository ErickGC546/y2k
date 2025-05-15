
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AddressMap from './AddressMap';

interface AddAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}

const AddAddressDialog: React.FC<AddAddressDialogProps> = ({ open, onOpenChange, onAdded }) => {
  const { toast } = useToast();
  const [address, setAddress] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
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
    const addressData = {
      address,
      user_id,
      additional_details: additionalDetails,
    };

    const { error } = await supabase.from('addresses').insert([addressData]);
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
    setAdditionalDetails('');
    onOpenChange(false);
    onAdded(); // Para refrescar la lista
  };

  const handleLocationSelected = (selectedAddress: string) => {
    setAddress(selectedAddress);
  };

  const handleClose = () => {
    setAddress('');
    setAdditionalDetails('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir dirección</DialogTitle>
          <DialogDescription>
            Ingresa tu dirección completa para que podamos entregar tus productos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddAddress} className="space-y-4 py-2">
          <AddressMap 
            address={address} 
            onSelectLocation={(selectedAddress) => handleLocationSelected(selectedAddress)} 
          />
          
          <div className="space-y-2">
            <Label htmlFor="details">Detalles adicionales (opcional)</Label>
            <Textarea
              id="details"
              placeholder="Apt, piso, referencias, etc."
              value={additionalDetails}
              onChange={e => setAdditionalDetails(e.target.value)}
              disabled={loading}
              className="w-full"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="bg-estilo-gold hover:bg-estilo-gold/90 text-white">
              Guardar
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              disabled={loading}
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
