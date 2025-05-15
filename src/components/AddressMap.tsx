
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

// Componente simplificado que reemplaza el mapa con un campo de entrada
interface AddressMapProps {
  address?: string;
  onSelectLocation?: (address: string, coordinates: [number, number]) => void;
  readOnly?: boolean;
}

const AddressMap: React.FC<AddressMapProps> = ({ address, onSelectLocation, readOnly = false }) => {
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectLocation) {
      // Proporcionamos coordenadas ficticias ya que no usamos mapa
      onSelectLocation(e.target.value, [0, 0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-estilo-gold" />
        <Label htmlFor="direccion">Dirección completa</Label>
      </div>
      
      {readOnly ? (
        <div className="p-3 border rounded-md bg-gray-50">
          <p>{address || "No se especificó dirección"}</p>
        </div>
      ) : (
        <Input
          id="direccion"
          placeholder="Ingresa tu dirección completa"
          value={address}
          onChange={handleAddressChange}
          disabled={readOnly}
          className="w-full"
        />
      )}
      
      {!readOnly && (
        <p className="text-sm text-gray-500">
          Ingresa tu dirección completa incluyendo referencias para facilitar la entrega
        </p>
      )}
    </div>
  );
};

export default AddressMap;
