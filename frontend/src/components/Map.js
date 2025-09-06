// New component: frontend/src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet'; // We need this for the custom icon

// Fix for a known issue with React-Leaflet and default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map({ monasteries }) {
  // Set the initial center of the map to a location in Sikkim
  const mapCenter = [27.5330, 88.5122];

  return (
    <MapContainer center={mapCenter} zoom={9} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {monasteries.map(monastery => (
        <Marker key={monastery._id} position={[monastery.coordinates.lat, monastery.coordinates.lng]}>
          <Popup>
            <strong>{monastery.name}</strong>
            <br />
            <Link to={`/monastery/${monastery._id}`}>View Details</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map; 