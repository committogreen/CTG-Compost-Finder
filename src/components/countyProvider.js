import React, { useState, useContext, createContext,useEffect } from "react";

const CountyContext= createContext();

export function CountyProvider({children}){
/*   const[counties,setCounty]= useState([]);
  const[singleCounty, setSingleCounty]= useState({});
  const[address, setAddress]= useState('');
  const[coordinates, setCoordinates] = useState([]);
  const[selectedLocation, setSelectedLocation] = useState({}); */

   const storedSingleCounty=localStorage.getItem('singleCounty');
   let parsedSingleCounty;
  
   if (storedSingleCounty) {
     parsedSingleCounty = JSON.parse(storedSingleCounty);
   } else {
     parsedSingleCounty = {}; 
   }

   const storedCoordinates= localStorage.getItem('coordinates');
   let parsedCoordinates;
   if(storedCoordinates){
    parsedCoordinates=JSON.parse(storedCoordinates);
   }else{
    parsedCoordinates= [];
   } 
    const[counties,setCounty]= useState([]);
    const[singleCounty, setSingleCounty]= useState(parsedSingleCounty);
    const[address, setAddress]= useState('');
    const[coordinates, setCoordinates] = useState(parsedCoordinates);
    const[selectedLocation, setSelectedLocation] = useState({});
    
     useEffect(()=>{
        localStorage.setItem('singleCounty',JSON.stringify(singleCounty))
    },[singleCounty])  

    useEffect(()=>{
      localStorage.setItem('coordinates',JSON.stringify(coordinates))
    }, [coordinates]) 
   
     
    


    return(
        <CountyContext.Provider value={{counties,setCounty,singleCounty,setSingleCounty,address,setAddress, coordinates, setCoordinates, selectedLocation, setSelectedLocation}}>
            {children}
        </CountyContext.Provider>
    );

}

export const useCountyContext =() => useContext(CountyContext);
