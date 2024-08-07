import Map from '../components/Map.js';
import { useState, useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCountyContext } from "../components/countyProvider.js";
import strongPolicyIcon from "../assets/strongPolicyIcon.png";
import moderatePolicyIcon from "../assets/moderatePolicyIcon.png";
import weakPolicyIcon from "../assets/weakPolicyIcon.png";
import noPolicyIcon from "../assets/noPolicyIcon.png";

import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { useDropOffContext } from '../components/dropOffProvider.js';
import { useMicroHaulerContext } from '../components/microHaulerProvider.js';
import { useSmartBinContext } from '../components/smartBinsProvider.js';


export default function Search() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [notloaded,setLoaded]=useState(true);
  const [county, setCounty] = useState(null);
  const [state, setState] = useState(null);
  const { address, setAddress, singleCounty, setSingleCounty, setCoordinates,coordinates } = useCountyContext();
  const { setDropOffs } = useDropOffContext();
  const { setMicroHaulers } = useMicroHaulerContext();
  const { setSmartBins } = useSmartBinContext();
  const navigate = useNavigate();
  

  const handleSubmit = () => {
    setAddress(input);
  }
  useEffect(() => {
    // Reset coordinates when the component mounts
    setCoordinates([40.7, -74]);
  }, [setCoordinates]); 
  

    useEffect(() => {
      function translateSpecialCase(state, county) {
        if (state === "New York" && county === "Kings") {
          return("Brooklyn");
        }
        if (state === "New York" && county === "The Bronx") {
          return("Bronx");
        }
        return(county);
      }
      const fetchCoordinates = async () => {
        if (address) {
          try {
            console.log("address: ",address);
            const reversed = address.split(" ").reverse().join(" "); //reversed to search larger regions first because nominatim searches left to right
            const { data: [lookup] } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
            console.log("loopUp",lookup);
            const coords = [parseFloat(lookup.lat), parseFloat(lookup.lon)];
            const location = lookup.display_name.split(", ");
            if (isNaN(parseInt(location.at(-2)))) { //check if there is a zipcode
              setState(location.at(-2));
              setCounty(translateSpecialCase(location.at(-2),location.at(-3).replace(/ County$/, '')));
            }
            else {
              setState(location.at(-3));
              setCounty(translateSpecialCase(location.at(-3),location.at(-4).replace(/ County$/, '')));
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
      fetchCoordinates();
    },[address,setState,setCounty,setCoordinates]);
  
    useEffect(() => {
      const fetchCountyData = async () => {
        if (county !== null && state !== null) {
            try {
              const { data } = await axios.get(`http://localhost:5000/county/${county}/${state}`);
              console.log("fetchCountyData: ",data);
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
      const fetchPillarsByCounty = async () => {
        console.log(singleCounty);
        if (JSON.stringify(singleCounty) !== '{}') {
            try {
              const { data : queryDropOffs} = await axios.get(`http://localhost:5000/dropOff/${singleCounty.name}/${singleCounty.state}`);
              const { data : queryMicroHaulers} = await axios.get(`http://localhost:5000/microHauler/${singleCounty.name}/${singleCounty.state}`);
              const { data : querySmartBins} = await axios.get(`http://localhost:5000/smartBin/${singleCounty.name}/${singleCounty.state}`);
              setDropOffs(queryDropOffs);
              setMicroHaulers(queryMicroHaulers);
              setSmartBins(querySmartBins);
            
              console.log("Step 4pillars: ",step, queryDropOffs,queryMicroHaulers,querySmartBins);
              console.log("fetching DropOffs",queryDropOffs);
              setStep(3);
             
            } catch (err) {
              setError('Error fetching data');
              console.log(error);
            }
          } else {
            setError('invalid address');
          }
         
      };
      
      fetchPillarsByCounty();
    }, [singleCounty, setDropOffs,setMicroHaulers,setSmartBins,setStep])

  /* 
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
              console.log("In fetchMicroHaulerByCounty data", data, notloaded);
              if(data.length !==0){
              setLoaded(false)
              }
            
            } catch (err) {
              setError('Error fetching data');
              console.log(error);
            }
          } else {
            setError('invalid address');
          
        }
      };
      fetchMicroHaulerByCounty();
    }, [singleCounty, setMicroHaulers, setError,setLoaded])
    */
    //navigate("/search/result");
    useEffect(()=>{
      console.log("last useEffect: ",coordinates,step);
      if(coordinates.length !==0 && step===3){
       setStep(0);
       
        navigate("/search/result");
      }
    },[step,coordinates])

  
  return (
    <div className='search-page'>
      <div className="country-container">
        <header className="country-header header">
          <h1 className="bold">
            FIND COMPOSTING SOLUTIONS
          </h1>
        </header>
        <Map mapType="country" />
      </div>
      <div className='search-container'>
        <div className="search-header">
          <h3 className="search-heading">
            Find Organic Recycling Information
          </h3>
          <p className="search-description">
            Enter information to search services in your area.
          </p>
        </div>
        <div className='search-address-container'>
          <h4 className='search-address-heading'>
            Address (Required)
          </h4>
          <input className="search-address-field" type="text" value={input} onChange={e => setInput(e.target.value)}></input>
          <button className='search-button' onClick={handleSubmit} >
            Search 
          </button>
        </div>
        <div className='search-legend'>
          <div className='search-legend-description'>Organic Waste Bans & Recycling Policies</div>
          <div className='search-policy-container'>
            <div className='search-policy'>
              <img className='search-policy-color' src={strongPolicyIcon} />
              <div className='search-policy-category'>
                Strong Policy
              </div>
            </div>
            <div className='search-policy'>
              <img className='search-policy-color' src={moderatePolicyIcon} />
              <div className='search-policy-category'>
                Moderate Policy
              </div>
            </div>
            <div className='search-policy'>
              <img className='search-policy-color' src={weakPolicyIcon} />
              <div className='search-policy-category'>
                Weak Policy
              </div>
            </div>
            <div className='search-policy'>
              <img className='search-policy-color' src={noPolicyIcon} />
              <div className='search-policy-category'>
                No Policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}