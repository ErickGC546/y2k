
import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Trash2, MapPin, Home, Navigation } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AddressMap from './AddressMap';

interface UserAddressesProps {
  onAddAddress: () => void;
  refreshFlag: boolean;
}

interface Address {
  id: string;
  address: string;
  created_at: string;
  additional_details?: string;
  latitude?: number;
  longitude?: number;
}

const UserAddresses: React.FC<UserAddressesProps> = ({ onAddAddress, refreshFlag }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('addresses')
      .select('id, address, additional_details, latitude, longitude, created_at')
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
            <Accordion type="multiple" className="space-y-4">
              {addresses.map((addr) => (
                <AccordionItem 
                  key={addr.id}
                  value={addr.id}
                  className="rounded-md border px-3 py-2 bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-start">
                        <Home className="w-4 h-4 mr-2 mt-1 text-estilo-gold flex-shrink-0" />
                        <div className="text-left">
                          <p className="font-medium">{addr.address}</p>
                          {addr.additional_details && (
                            <p className="text-sm text-gray-500">{addr.additional_details}</p>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAddress(addr.id);
                      }}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4" /> 
                    </Button>
                  </div>
                  <AccordionContent>
                    <div className="pt-4">
                      <AddressMap
                        address={addr.address}
                        readOnly={true}
                      />
                      {addr.latitude && addr.longitude && (
                        <div className="mt-2">
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${addr.latitude},${addr.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-estilo-gold hover:underline"
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Cómo llegar
                          </a>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}
      <Button
        variant="outline"
        className="mt-4 text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
        onClick={onAddAddress}
      >
        <MapPin className="mr-2 h-4 w-4" />
        Añadir dirección
      </Button>
    </div>
  );
};

export default UserAddresses;
