
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Interface para las props del componente
interface AddressMapProps {
  address?: string;
  onSelectLocation?: (address: string, coordinates: [number, number]) => void;
  readOnly?: boolean;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const AddressMap: React.FC<AddressMapProps> = ({ address, onSelectLocation, readOnly = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  
  // Cargar el API de Google Maps
  useEffect(() => {
    if (!window.google || !window.google.maps) {
      if (!document.getElementById('google-maps-script')) {
        setLoading(true);
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCdMq5I8qg38bC1pTMw7Krl_9U3obXjgWs&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        window.initMap = () => {
          setGoogleMapsLoaded(true);
          setLoading(false);
        };
        
        document.head.appendChild(script);
      }
    } else {
      setGoogleMapsLoaded(true);
    }
  }, []);
  
  // Inicializar mapa cuando Google Maps API está cargado
  useEffect(() => {
    if (!googleMapsLoaded || !mapContainer.current) return;
    
    geocoder.current = new google.maps.Geocoder();
    
    // Coordenadas por defecto (Lima, Perú)
    const defaultPosition = { lat: -12.04, lng: -77.03 };
    
    map.current = new google.maps.Map(mapContainer.current, {
      zoom: 12,
      center: defaultPosition,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
    
    marker.current = new google.maps.Marker({
      position: defaultPosition,
      map: map.current,
      draggable: !readOnly,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#C9A96F",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
      }
    });
    
    if (!readOnly && marker.current) {
      // Evento de arrastrar el marcador
      google.maps.event.addListener(marker.current, 'dragend', () => {
        if (marker.current && onSelectLocation) {
          const position = marker.current.getPosition();
          const lat = position?.lat() || 0;
          const lng = position?.lng() || 0;
          
          reverseGeocode(lng, lat);
        }
      });
    }
    
    // Si hay una dirección proporcionada, geocodificarla
    if (address) {
      geocodeAddress(address);
    }
  }, [googleMapsLoaded, address, readOnly, onSelectLocation]);
  
  // Geocodificar dirección a coordenadas
  const geocodeAddress = (searchAddress: string) => {
    if (!geocoder.current) return;
    
    setLoading(true);
    geocoder.current.geocode({ address: searchAddress }, (results, status) => {
      setLoading(false);
      
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        
        if (map.current && marker.current) {
          map.current.setCenter(location);
          map.current.setZoom(15);
          marker.current.setPosition(location);
        }
      } else {
        console.error("Geocode failed:", status);
      }
    });
  };
  
  // Geocodificación inversa: coordenadas a dirección
  const reverseGeocode = (lng: number, lat: number) => {
    if (!geocoder.current) return;
    
    const latlng = { lat, lng };
    
    geocoder.current.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const address = results[0].formatted_address;
        
        if (onSelectLocation) {
          onSelectLocation(address, [lng, lat]);
        }
      } else {
        console.error("Reverse geocoding failed:", status);
      }
    });
  };
  
  // Usar ubicación actual del usuario
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          
          if (map.current && marker.current) {
            const pos = { lat: latitude, lng: longitude };
            map.current.setCenter(pos);
            map.current.setZoom(15);
            marker.current.setPosition(pos);
          }
          
          reverseGeocode(longitude, latitude);
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
      <div 
        ref={mapContainer} 
        className="h-64 w-full rounded-md border border-gray-300 shadow-sm"
        style={{ display: loading && !googleMapsLoaded ? "flex" : "block" }}
      >
        {loading && !googleMapsLoaded && (
          <div className="flex items-center justify-center w-full h-full">
            <p>Cargando mapa...</p>
          </div>
        )}
      </div>
      
      {!readOnly && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {!loading ? "Arrastra el pin para seleccionar una ubicación exacta" : "Cargando..."}
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleUseCurrentLocation}
            disabled={loading || !googleMapsLoaded}
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

export default AddressMap;
