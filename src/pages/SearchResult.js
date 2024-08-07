import OrganicsRecyclingInfo from '../components/OrganicsRecyclingInfo.js';
import DistrictInfoTable from '../components/DistrictInfoTable.js';
import Map from '../components/Map.js';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCountyContext } from "../components/countyProvider.js";
import { useDropOffContext } from '../components/dropOffProvider.js';
import { useMicroHaulerContext } from '../components/microHaulerProvider.js';
import { useSmartBinContext } from '../components/smartBinsProvider.js';

export default function SearchResult() {
  const { address, setAddress, singleCounty, setSingleCounty, setCoordinates } = useCountyContext();
  const { setDropOffs,dropOffs } = useDropOffContext();
  const { setMicroHaulers,microHaulers } = useMicroHaulerContext();
  const { setSmartBins,smartBins } = useSmartBinContext();

 
 /*  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const { address, setAddress, singleCounty, setSingleCounty, setCoordinates } = useCountyContext();
  const { setDropOffs } = useDropOffContext();
  const { setMicroHaulers } = useMicroHaulerContext();
  const { setSmartBins } = useSmartBinContext();
  const navigate = useNavigate();



  // const location = useLocation();
  // const address = location.state;
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (address) {
        try {
          const reversed = address.split(" ").reverse().join(" "); //reversed to search larger regions first because nominatim searches left to right
          const { data: [lookup] } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
          if (!lookup) {
            navigate("/search");
          }
          const coords = [parseFloat(lookup.lat), parseFloat(lookup.lon)];
          const location = lookup.display_name.split(", ");

          if (isNaN(parseInt(location.at(-2)))) { //check if there is a zipcode
            setState(location.at(-2));
            setCounty(location.at(-3).replace(/ County$/, ''));
          }
          else {
            setState(location.at(-3));
            setCounty(location.at(-4).replace(/ County$/, ''));
          }
          setCoordinates(coords);

        } catch (error) {
          setError('Error fetching coordinates');
          console.log(error);
        }
      }
      else {
        setError('Invalid address');
      }
    }

    function translateSpecialCase() {
      if (state === "New York" && county === "Kings") {
        setCounty("Brooklyn");
      }
    }

    fetchCoordinates();
    translateSpecialCase();
  }, []);

  useEffect(() => {
    const fetchCountyData = async () => {
      if (county !== null && state !== null) {
          try {
            const { data } = await axios.get(`http://localhost:5000/county/${county}/${state}`);
            setSingleCounty(data);
          } catch (error) {
            setError('Error fetching data');
            console.log(error);
          }
        } else {
          setError('Invalid address');
              setError('Error fetching data');
              console.log(error);
        console.log(county, state)
       
      }
    };
    fetchCountyData();
  }, [state, county, setSingleCounty, setError]);

  //Fetching DropOffs locations by name and state
  useEffect(() => {
    const fetchDropOffByCounty = async () => {
      if (singleCounty !== null) {
          try {
            const { data } = await axios.get(`http://localhost:5000/dropOff/${singleCounty.name}/${singleCounty.state}`);
            setDropOffs(data);
          } catch (err) {
            setError('Error fetching data');
            console.log(error);
          }
        } else {
          setError('invalid address');
        }
       
    };
    fetchDropOffByCounty();
  }, [singleCounty, setDropOffs])

  //Fetching SmartBin locations by name and state
  useEffect(() => {
    const fetchSmartBinByCounty = async () => {
      if (singleCounty !== null) {
          try {
            const { data } = await axios.get(`http://localhost:5000/smartBin/${singleCounty.name}/${singleCounty.state}`);
            setSmartBins(data);
          } catch (err) {
            setError('Error fetching data');
            console.log(error);
          }
        } else {
          setError('invalid address');
        }
       
    };
    fetchSmartBinByCounty();
  }, [singleCounty, setSmartBins, setError])

  //Fetching Microhauler by name and state
  useEffect(() => {
    const fetchMicroHaulerByCounty = async () => {
      if (singleCounty !== null) {
          try {
            const { data } = await axios.get(`http://localhost:5000/microHauler/${singleCounty.name}/${singleCounty.state}`);
            setMicroHaulers(data);
          } catch (err) {
            setError('Error fetching data');
            console.log(error);
          }
        } else {
          setError('invalid address');
        
      }
    };
    fetchMicroHaulerByCounty();
  }, [singleCounty, setMicroHaulers, setError])
 */
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
          setMicroHaulers([]);
          setDropOffs([]);
          setCoordinates([]);
          
          }} >
          <Link className='back-button' to="/search">&nbsp;&nbsp;&nbsp;Back to Search</Link>
            </button>
        <OrganicsRecyclingInfo address={address} />
      </div>
    </div>
  )
}