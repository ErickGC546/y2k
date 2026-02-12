
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddressMapContentProps {
  address?: string;
  onSelectLocation?: (address: string, coordinates: [number, number]) => void;
  readOnly?: boolean;
}

const AddressMapContent: React.FC<AddressMapContentProps> = ({ address, onSelectLocation, readOnly = false }) => {
  const { toast } = useToast();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const positionRef = useRef<[number, number]>([-12.04, -77.03]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let L: any;
    let destroyed = false;

    const initMap = async () => {
      // Dynamic import of leaflet
      L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // Fix default marker icons for Vite
      const iconRetinaUrl = (await import('leaflet/dist/images/marker-icon-2x.png')).default;
      const iconUrl = (await import('leaflet/dist/images/marker-icon.png')).default;
      const shadowUrl = (await import('leaflet/dist/images/marker-shadow.png')).default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

      if (destroyed || !mapContainerRef.current) return;

      // Destroy existing map if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current).setView(positionRef.current, 13);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker(positionRef.current, { draggable: !readOnly }).addTo(map);
      markerRef.current = marker;

      if (!readOnly) {
        marker.on('dragend', () => {
          const latlng = marker.getLatLng();
          positionRef.current = [latlng.lat, latlng.lng];
          reverseGeocode(latlng.lat, latlng.lng);
        });
      }

      // Geocode initial address
      if (address) {
        geocodeAddress(address, map, marker);
      }

      // Fix map size after render
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);
    };

    initMap();

    return () => {
      destroyed = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-geocode when address changes
  useEffect(() => {
    if (address && mapInstanceRef.current && markerRef.current) {
      geocodeAddress(address, mapInstanceRef.current, markerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const geocodeAddress = async (searchAddress: string, map: any, marker: any) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        positionRef.current = [lat, lon];
        map.flyTo([lat, lon], 15);
        marker.setLatLng([lat, lon]);
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

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Error", description: "Tu navegador no admite geolocalización", variant: "destructive" });
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        positionRef.current = [latitude, longitude];
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15);
          markerRef.current.setLatLng([latitude, longitude]);
        }
        reverseGeocode(latitude, longitude);
        setLoading(false);
      },
      () => {
        toast({ title: "Error", description: "No se pudo obtener tu ubicación actual", variant: "destructive" });
        setLoading(false);
      }
    );
  };

  return (
    <div className="space-y-2">
      <div
        ref={mapContainerRef}
        style={{ height: '400px', width: '100%' }}
        className="rounded-md border border-border shadow-sm z-0"
      />
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
