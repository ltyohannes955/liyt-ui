'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useTheme } from 'next-themes';
import { LatLngExpression, LatLng, Icon } from 'leaflet';
import { MapPinIcon } from '@/components/ui/icons';
import 'leaflet/dist/leaflet.css';

interface MapWrapperProps {
  center: LatLngExpression;
  zoom: number;
  position: LatLngExpression | null;
  onMapClick: (e: { latlng: LatLng }) => void;
  onLocationSelect: (lat: number, lng: number) => void;
}

// Convert Hugeicons SVG to Leaflet marker icon
function createLocationIcon(color: string = '#E4FF2C'): Icon {
  // Create SVG with the location pin shape
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44" fill="none">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 28 16 28s16-16 16-28c0-8.837-7.163-16-16-16z" fill="${color}"/>
      <circle cx="16" cy="16" r="8" fill="#0a0a0a"/>
    </svg>
  `;
  
  const base64 = btoa(svgString);
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${base64}`,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -44],
  });
}

function MapClickHandler({ onClick }: { onClick: (e: { latlng: LatLng }) => void }) {
  useMapEvents({
    click(e) {
      onClick({ latlng: e.latlng });
    },
  });
  return null;
}

function DraggableMarker({ 
  position, 
  onDragEnd 
}: { 
  position: LatLngExpression; 
  onDragEnd: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<any>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const pos = marker.getLatLng();
        onDragEnd(pos.lat, pos.lng);
      }
    },
  };

  const markerIcon = createLocationIcon('#E4FF2C');

  return (
    <Marker 
      ref={markerRef} 
      position={position} 
      icon={markerIcon}
      draggable={true}
      eventHandlers={eventHandlers}
    />
  );
}

export default function MapWrapper({ 
  center, 
  zoom, 
  position, 
  onMapClick,
  onLocationSelect 
}: MapWrapperProps) {
  const { theme } = useTheme();
  
  // Use dark tiles in dark mode
  const tileUrl = theme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />
      <MapClickHandler onClick={onMapClick} />
      {position && Array.isArray(position) && (
        <DraggableMarker 
          position={position} 
          onDragEnd={onLocationSelect}
        />
      )}
    </MapContainer>
  );
}
