
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mapbox public token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXN0aWxvYWZybyIsImEiOiJjbHgwZzV4aWkwMzBrMmlvNzkxZ213bWdwIn0.DrUs64GU9eTKGbQ0VrCo5A';

interface AddressMapProps {
  address?: string;
  onSelectLocation?: (address: string, coordinates: [number, number]) => void;
  readOnly?: boolean;
}

const AddressMap: React.FC<AddressMapProps> = ({ address, onSelectLocation, readOnly = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-77.03, -12.04], // Default: Lima, Peru
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Create marker
    marker.current = new mapboxgl.Marker({ color: '#C9A96F', draggable: !readOnly })
      .setLngLat([-77.03, -12.04])
      .addTo(map.current);

    if (!readOnly) {
      // Set up dragend event for marker if not read-only
      marker.current.on('dragend', () => {
        if (marker.current && onSelectLocation) {
          const lngLat = marker.current.getLngLat();
          reverseGeocode(lngLat.lng, lngLat.lat);
        }
      });
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [readOnly, onSelectLocation]);

  // If an address is provided, geocode it to show on map
  useEffect(() => {
    if (address && map.current) {
      setLoading(true);
      geocodeAddress(address);
    }
  }, [address]);

  // Geocode address to coordinates
  const geocodeAddress = async (searchAddress: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchAddress)}.json?access_token=${MAPBOX_TOKEN}`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        
        if (map.current && marker.current) {
          map.current.flyTo({ center: [lng, lat], zoom: 15 });
          marker.current.setLngLat([lng, lat]);
        }
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const place = data.features[0].place_name;
        
        if (onSelectLocation) {
          onSelectLocation(place, [lng, lat]);
        }
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          
          if (map.current && marker.current) {
            map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
            marker.current.setLngLat([longitude, latitude]);
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
      />
      
      {!readOnly && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
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

export default AddressMap;
