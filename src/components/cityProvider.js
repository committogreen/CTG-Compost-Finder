import React, { useState, useContext, createContext } from "react";

const CityContext= createContext();

export function CityProvider({children}){
    const[city,setCity]= useState([]);
    const[singleCity, setSingleCity]= useState({});
   
  

    return(
        <CityContext.Provider value={{city,setCity,singleCity,setSingleCity}}>
            {children}
        </CityContext.Provider>
    );

}

export const useCityContext =() => useContext(CityContext);