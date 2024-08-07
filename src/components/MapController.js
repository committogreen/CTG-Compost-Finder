import { Marker, useMap, Popup } from 'react-leaflet';

import { useCountyContext } from './countyProvider';
import { useDropOffContext } from './dropOffProvider';
import { useSmartBinContext } from './smartBinsProvider';
import MapLocationMarker from './MapLocationMarker';
import { dropOffIcon } from './MapAssets';
import { smartBinIcon } from './MapAssets';
import { click } from '@testing-library/user-event/dist/click';
import { useEffect } from 'react';

export default function MapController() {
  const { setSelectedLocation } = useCountyContext();
  const {dropOffs}= useDropOffContext();
  const {smartBins}= useSmartBinContext();
  const testAddress = "30-11 30th Dr, Queens, NY 11102";
  const map = useMap();

  // useEffect(() => {
  //   console.log("load");
  // }, [smartBins, dropOffs])
  return (

    <>
      <MapLocationMarker /> 
         {dropOffs.map((dropOff, index) => {
          return (
         
        <Marker
          key={index}
          index={index}
          position={[dropOff.latitude, dropOff.longitude]}
          icon={dropOffIcon}
          eventHandlers={{click: () => setSelectedLocation(dropOffs[index])}}
        >
          <Popup>{dropOff.name}</Popup>
        </Marker>
      )})}
      {smartBins.map((smartBin, index) => (
        <Marker
          key={index}
          index={index}
          position={[smartBin.latitude, smartBin.longitude]}
          icon={smartBinIcon}
          eventHandlers={{click: () => setSelectedLocation(smartBins[index])}}
        >
          <Popup>{smartBin.name}</Popup>
        </Marker>
      ))}

    </>
  )
}
