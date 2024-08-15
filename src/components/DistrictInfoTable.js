import { useState, useEffect } from "react";
import { useDropOffContext } from "./dropOffProvider";
import { useMicrohaulerContext } from "./microhaulerProvider.js";
import { useSmartBinContext } from './smartBinsProvider.js';
import { useCountyContext } from './countyProvider.js';

export default function DistrictInfoTable() {
  const [services, setServices] = useState([]);
  const { dropOffs } = useDropOffContext();
  const { microhaulers } = useMicrohaulerContext();
  const { smartBins } = useSmartBinContext();
  const { singleCounty } = useCountyContext();


  useEffect(() => {
    console.log("dropOffs ",dropOffs);
    console.log("microhaulers ",microhaulers);
    console.log("smartBins ",smartBins );
  
    const services = Array(4).fill("no");
    if (singleCounty !== null) {
      if (singleCounty.pickUp !== "No" && singleCounty.pickUp !==  "no") {
        services[0] = "yes";
      }                               
      if (dropOffs.length !== 0) {
        services[1] = "yes";
      }
      if (microhaulers.length !== 0) {
        console.log("asdas",microhaulers);
        services[2] = "yes";
      }
      if (smartBins.length !== 0) {
        services[3] = "yes";
      }
    }
    
    setServices(services);
  }, [singleCounty, dropOffs, microhaulers, smartBins])

  return (
    <div className="DistrictInfo-Services">
      <div className="DistrictInfo-ServicesContainer">
        <div>Residential Pickup</div>
        <div className={`${services[0]}-service-icon`}></div>
      </div>
      <div className="DistrictInfo-ServicesContainer">
        <div>Drop-off Locations</div>
        <div className={`${services[1]}-service-icon`}></div>
      </div>
      <div className="DistrictInfo-ServicesContainer">
        <div>Micro-haulers</div>
        <div className={`${services[2]}-service-icon`}></div>
      </div>
      <div className="DistrictInfo-ServicesContainer">
        <div>Smart Bins</div>
        <div className={`${services[3]}-service-icon`}></div>
      </div>
    </div>
  )
}