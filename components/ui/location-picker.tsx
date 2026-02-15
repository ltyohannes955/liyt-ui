'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Leaflet

// Dynamic import to avoid SSR issues with Leaflet
const MapWrapper = dynamic(() => import('@/components/ui/map-wrapper'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-[#1a1a1a] border border-white/10 rounded-lg flex items-center justify-center">
      <span className="text-white/50">Loading map...</span>
    </div>
  ),
});

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  onLocationChange: (lat: string, lng: string) => void;
  className?: string;
}

export default function LocationPicker({ 
  latitude, 
  longitude, 
  onLocationChange,
  className = '' 
}: LocationPickerProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  
  const lat = latitude ? parseFloat(latitude) : null;
  const lng = longitude ? parseFloat(longitude) : null;
  const position: LatLngExpression | null = lat && lng ? [lat, lng] : null;
  
  // Default center
  const defaultCenter: LatLngExpression = position || [9.145, 40.4897];

  // Force re-render when coordinates change
  useEffect(() => {
    setMapKey(prev => prev + 1);
  }, [latitude, longitude]);

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    onLocationChange(lat.toFixed(6), lng.toFixed(6));
    toast.success('Location selected', {
      description: `Coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    });
  }, [onLocationChange]);

  const handleUseCurrentLocation = useCallback(() => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        handleLocationSelect(lat, lng);
        setIsLocating(false);
        toast.success('Location detected', {
          description: 'Your current location has been set successfully.',
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        let errorMessage = 'Unable to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please try again later.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = 'An error occurred while getting your location.';
        }
        toast.error('Location error', {
          description: errorMessage,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [handleLocationSelect]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = useCallback((e: any) => {
    handleLocationSelect(e.latlng.lat, e.latlng.lng);
  }, [handleLocationSelect]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="h-64 w-full rounded-lg overflow-hidden border border-white/10">
          <MapWrapper
            key={mapKey}
            center={defaultCenter}
            zoom={position ? 15 : 13}
            position={position}
            onMapClick={handleMapClick}
            onLocationSelect={handleLocationSelect}
          />
        </div>
        
        {/* Current location button */}
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
          className="absolute bottom-3 left-3 bg-[#141414] border border-white/20 text-white hover:bg-[#1a1a1a] z-[1000]"
        >
          {isLocating ? (
            <span className="animate-spin mr-2">⟳</span>
          ) : (
            <Navigation className="w-4 h-4 mr-2" />
          )}
          {isLocating ? 'Locating...' : 'Use Current Location'}
        </Button>
      </div>

      {/* Coordinates display */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-white/70 text-xs">Latitude</label>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-md">
            <MapPin className="w-4 h-4 text-[#E4FF2C]" />
            <span className="text-white text-sm font-mono">
              {latitude || 'Not set'}
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-white/70 text-xs">Longitude</label>
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-md">
            <MapPin className="w-4 h-4 text-[#E4FF2C]" />
            <span className="text-white text-sm font-mono">
              {longitude || 'Not set'}
            </span>
          </div>
        </div>
      </div>

      <p className="text-white/40 text-xs">
        Click anywhere on the map to select a location, or use the current location button.
      </p>
    </div>
  );
}
