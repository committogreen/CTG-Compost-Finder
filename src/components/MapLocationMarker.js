import L from "leaflet";
import { provider } from "leaflet-providers";
import { useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { locationIcon } from './MapAssets';
import { useCountyContext } from "./countyProvider";
//your location only
export default function MapLocationMarker() {
  const { coordinates } = useCountyContext();
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  // useEffect(() => {
  //   L.tileLayer.provider('CartoDB.Voyager').addTo(map);
  //   map.locate().on("locationfound", function (e) {
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, 15);
  //     // const radius = e.accuracy;
  //     // const circle = L.circle(e.latlng, radius);
  //     // circle.addTo(map);
  //     // setBbox(e.bounds.toBBoxString().split(","));
  //   });
  // }, [map]);

  useEffect(() => {
      L.tileLayer.provider('CartoDB.Voyager').addTo(map);
      if (coordinates.length !== 0) {
        map.flyTo(coordinates, 15, {duration: 1});
      }
    }, [coordinates, map]);

  
  return coordinates.length === 0 ? null : (
    <Marker position={coordinates} icon={locationIcon}>
    </Marker>
  );
}