import React, { useState, useContext, createContext,useEffect } from "react";

const MicroHaulerContext= createContext();

export function MicroHaulerProvider({children}){
    const storedMicroHaulers=localStorage.getItem('microHaulers');
    let parsedMicroHaulers;
    if(storedMicroHaulers){
        parsedMicroHaulers= JSON.parse(storedMicroHaulers);
    }else{
        parsedMicroHaulers= [];
    }
    const [microHaulers, setMicroHaulers] = useState(parsedMicroHaulers);
    const [singleMicroHauler,setSingleMicroHauler]= useState({});
    useEffect(()=>{
        localStorage.setItem('microHaulers',JSON.stringify(microHaulers))
      },[microHaulers])

    return (
        <MicroHaulerContext.Provider value={{microHaulers,setMicroHaulers,singleMicroHauler,setSingleMicroHauler}}>
            {children} 
        </MicroHaulerContext.Provider>
    );

}

export const useMicroHaulerContext=() => useContext(MicroHaulerContext);