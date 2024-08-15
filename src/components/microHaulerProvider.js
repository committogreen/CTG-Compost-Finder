import React, { useState, useContext, createContext,useEffect } from "react";

const MicrohaulerContext= createContext();

export function MicrohaulerProvider({children}){
    const storedMicrohaulers=localStorage.getItem('microhaulers');
    let parsedMicrohaulers;
    if(storedMicrohaulers){
        parsedMicrohaulers= JSON.parse(storedMicrohaulers);
    }else{
        parsedMicrohaulers= [];
    }
    const [microhaulers, setMicrohaulers] = useState(parsedMicrohaulers);
    useEffect(()=>{
        localStorage.setItem('microhaulers',JSON.stringify(microhaulers))
      },[microhaulers])

    return (
        <MicrohaulerContext.Provider value={{microhaulers,setMicrohaulers}}>
            {children} 
        </MicrohaulerContext.Provider>
    );

}

export const useMicrohaulerContext=() => useContext(MicrohaulerContext);