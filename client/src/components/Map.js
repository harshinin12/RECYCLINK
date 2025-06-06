import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const verifiedFacilityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const unverifiedFacilityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ facilities, userLocation, onMapClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current).setView(
        userLocation ? [userLocation.lat, userLocation.lng] : [18.5150587, 73.8576905], // Default to Pune
        13
      );

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add click handler
      mapInstanceRef.current.on('click', (e) => {
        if (onMapClick) {
          onMapClick(e.latlng);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 13);
      
      // Add user location marker
      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup('Your Location');
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add facility markers
      facilities.forEach(facility => {
        if (facility.location && facility.location.coordinates) {
          const marker = L.marker([
            facility.location.coordinates[1], // latitude
            facility.location.coordinates[0]  // longitude
          ], {
            icon: facility.verified ? verifiedFacilityIcon : unverifiedFacilityIcon
          })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <strong>${facility.name}</strong><br>
              ${facility.location.address}<br>
              ${facility.verified ? '<span style="color: green;">✓ Verified</span>' : '<span style="color: orange;">⚠ Unverified</span>'}<br>
              ${facility.distance ? `Distance: ${facility.distance.toFixed(1)}km` : ''}
            `);
          markersRef.current.push(marker);
        }
      });
    }
  }, [facilities]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: '500px', 
        width: '100%',
        margin: '20px 0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default Map; 