import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useState} from 'react';
import MapController from './MapController';
import USStates from './USStates';

export default function Map({ mapType}) {
  const [center, setCenter] = useState([40.7, -74]);

  if (mapType == "country") {
    return (
      <div className="Map-Country">
        <USStates />
      </div>
    )
  }

  return (
    <div className="Map-State">
      <MapContainer center={center} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
      </MapContainer>
    </div>
  )
}
