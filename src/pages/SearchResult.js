import OrganicsRecyclingInfo from '../components/OrganicsRecyclingInfo.js';
import DistrictInfoTable from '../components/DistrictInfoTable.js';
import Map from '../components/Map.js';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCountyContext } from "../components/countyProvider.js";
import { useDropOffContext } from '../components/dropOffProvider.js';
import { useMicrohaulerContext } from '../components/microhaulerProvider.js';
import { useSmartBinContext } from '../components/smartBinsProvider.js';

export default function SearchResult() {
  const { address, setAddress, singleCounty, setSingleCounty, setCoordinates } = useCountyContext();
  const { setDropOffs, dropOffs } = useDropOffContext();
  const { setMicrohaulers, microhaulers } = useMicrohaulerContext();
  const { setSmartBins, smartBins } = useSmartBinContext();

  return (
    <div className='search-result-page'>
      <div className="state-infographic-container">
        <header className="state-infographic-header header">
          <h1 className="bold">
            {singleCounty.name} County, {singleCounty.state}
          </h1>
        </header>
        <div className='state-infographic-body'>
          <Map mapType="state" />
          <DistrictInfoTable />
        </div>
      </div>
      <div className='organics-recycling-info-container'>
        <button onClick={(e) => {
          setAddress("");
          setSingleCounty({});
          setSmartBins([]);
          setMicrohaulers([]);
          setDropOffs([]);
          setCoordinates([]);
          localStorage.clear();
        }} >
          <Link className='back-button' to="/search">&nbsp;&nbsp;&nbsp;Back to Search</Link>
        </button>
        <OrganicsRecyclingInfo address={address} />
      </div>
    </div>
  )
}