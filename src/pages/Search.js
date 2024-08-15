import Map from '../components/Map.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useCountyContext } from "../components/countyProvider.js";
import { useDropOffContext } from '../components/dropOffProvider.js';
import { useMicrohaulerContext } from '../components/microhaulerProvider.js';
import { useSmartBinContext } from '../components/smartBinsProvider.js';

import strongPolicyIcon from "../assets/strongPolicyIcon.png";
import moderatePolicyIcon from "../assets/moderatePolicyIcon.png";
import weakPolicyIcon from "../assets/weakPolicyIcon.png";
import noPolicyIcon from "../assets/noPolicyIcon.png";

export default function Search() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { setAddress, setSingleCounty, setCoordinates } = useCountyContext();
  const { setDropOffs } = useDropOffContext();
  const { setMicroHaulers } = useMicrohaulerContext();
  const { setSmartBins } = useSmartBinContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset coordinates when the component mounts
    setCoordinates([40.7, -74]);
  }, [setCoordinates]); 
  
  const handleSubmit = async () => {
    try {
      setAddress(input);
    
      // Translate OSM search result to database entries
      const translateSpecialCase = (state, county) => {
        if (state === "New York" && county === "Kings") return "Brooklyn";
        if (state === "New York" && county === "The Bronx") return "Bronx";
        return county;
      };

      // Fetch coordinates
      const { data: [lookup] } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1`);
      console.log("lookup: ",lookup);
      const coords = [parseFloat(lookup.lat), parseFloat(lookup.lon)];
      setCoordinates(coords);

      const state = lookup.address.state;
      const county = (lookup.address.suburb ? lookup.address.suburb.replace(/ County$/, '') : translateSpecialCase(state, lookup.address.county.replace(/ County$/, '')));
      console.log(county, state);

      // Fetch county data
      const { data: countyData } = await axios.get(`http://54.242.10.76:5000/county/${county}/${state}`);
      setSingleCounty(countyData);

      // Fetch DropOffs, MicroHaulers, and SmartBins
      const [{ data: queryDropOffs }, { data: queryMicroHaulers }, { data: querySmartBins }] = await Promise.all([
        axios.get(`http://54.242.10.76:5000/dropOff/${countyData.name}/${countyData.state}`),
        axios.get(`http://54.242.10.76:5000/microHauler/${countyData.name}/${countyData.state}`),
        axios.get(`http://54.242.10.76:5000/smartBin/${countyData.name}/${countyData.state}`),
      ]);

      setDropOffs(queryDropOffs);
      setMicroHaulers(queryMicroHaulers);
      setSmartBins(querySmartBins);

      // Navigate to results page
      navigate("/search/result");

    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    }
  };

  return (
    <div className='search-page'>
      <div className="country-container">
        <header className="country-header header">
          <h1 className="bold">FIND COMPOSTING SOLUTIONS</h1>
        </header>
        <Map mapType="country" />
      </div>
      <div className='search-container'>
        <div className="search-header">
          <h3 className="search-heading">Find Organic Recycling Information</h3>
          <p className="search-description">Enter information to search services in your area.</p>
        </div>
        <div className='search-address-container'>
          <h4 className='search-address-heading'>Address (Required)</h4>
          <input className="search-address-field" type="text" value={input} onChange={e => setInput(e.target.value)} />
          <button className='search-button' onClick={handleSubmit}>Search</button>
        </div>
        <div className='search-legend'>
          <div className='search-legend-description'>Organic Waste Bans & Recycling Policies</div>
          <div className='search-policy-container'>
            <div className='search-policy'>
              <img className='search-policy-color' src={strongPolicyIcon} />
              <div className='search-policy-category'>Strong Policy</div>
            </div>
            <div className='search-policy'>
              <img className='search-policy-color' src={moderatePolicyIcon} />
              <div className='search-policy-category'>Moderate Policy</div>
            </div>
            <div className='search-policy'>
              <img className='search-policy-color' src={weakPolicyIcon} />
              <div className='search-policy-category'>Weak Policy</div>
            </div>
            <div className='search-policy'>
              <img className='search-policy-color' src={noPolicyIcon} />
              <div className='search-policy-category'>No Policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
