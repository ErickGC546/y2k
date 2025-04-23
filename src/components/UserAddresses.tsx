
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface UserAddressesProps {
  onAddAddress: () => void;
  refreshFlag: boolean;
}

interface Address {
  id: string;
  address: string;
  created_at: string;
}

const UserAddresses: React.FC<UserAddressesProps> = ({ onAddAddress, refreshFlag }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('addresses')
      .select('id, address, created_at')
      .order('created_at', { ascending: false });
    if (error) {
      toast({
        title: "Error al cargar las direcciones",
        description: error.message,
        variant: "destructive"
      });
    } else if (data) {
      setAddresses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line
  }, [refreshFlag]);

  const removeAddress = async (id: string) => {
    if (!window.confirm("¿Seguro que quieres borrar esta dirección?")) return;
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (error) {
      toast({
        title: "No se pudo borrar la dirección",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({ title: "Dirección eliminada" });
      fetchAddresses();
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando direcciones...</p>
      ) : (
        <div>
          {addresses.length === 0 ? (
            <p className="text-gray-600">No tienes direcciones guardadas.</p>
          ) : (
            <ul className="space-y-3">
              {addresses.map((addr) => (
                <li key={addr.id} className="flex justify-between items-center rounded border px-3 py-2 bg-gray-50">
                  <span>{addr.address}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeAddress(addr.id)}
                    className="ml-4"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Borrar
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <Button
        variant="outline"
        className="mt-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
        onClick={onAddAddress}
      >
        Añadir dirección
      </Button>
    </div>
  );
};

export default UserAddresses;

