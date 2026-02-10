
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface AddressMapContentProps {
  address?: string;
  onSelectLocation?: (address: string, coordinates: [number, number]) => void;
  readOnly?: boolean;
}

const DraggableMarker: React.FC<{
  position: [number, number];
  onDragEnd: (lat: number, lng: number) => void;
  readOnly: boolean;
}> = ({ position, onDragEnd, readOnly }) => {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = readOnly ? {} : {
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const latlng = marker.getLatLng();
        onDragEnd(latlng.lat, latlng.lng);
      }
    },
  };

  return (
    <Marker
      draggable={!readOnly}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

const FlyToPosition: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15);
  }, [position, map]);
  return null;
};

const AddressMapContent: React.FC<AddressMapContentProps> = ({ address, onSelectLocation, readOnly = false }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<[number, number]>([-12.04, -77.03]);

  useEffect(() => {
    if (address) {
      setLoading(true);
      geocodeAddress(address);
    }
  }, [address]);

  const geocodeAddress = async (searchAddress: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    } finally {
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name && onSelectLocation) {
        onSelectLocation(data.display_name, [lng, lat]);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleMarkerDragEnd = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    reverseGeocode(lat, lng);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          reverseGeocode(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Error",
            description: "No se pudo obtener tu ubicación actual",
            variant: "destructive"
          });
          setLoading(false);
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Tu navegador no admite geolocalización",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="h-[256px] w-full rounded-md border border-border shadow-sm overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full z-0"
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker
            position={position}
            onDragEnd={handleMarkerDragEnd}
            readOnly={readOnly}
          />
          <FlyToPosition position={position} />
        </MapContainer>
      </div>
      
      {!readOnly && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Arrastra el pin para seleccionar una ubicación exacta
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="text-estilo-gold border-estilo-gold hover:bg-estilo-gold hover:text-white"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Ubicación actual
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressMapContent;
