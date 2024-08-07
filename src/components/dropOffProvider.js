import React, { useState, useContext, createContext,useEffect } from "react";

const DropOffContext= createContext();

export function DropoffProvider({children}){
    const storedDropOffs=localStorage.getItem('dropOffs');
    let parsedDropOffs;
    if(storedDropOffs){
      parsedDropOffs= JSON.parse(storedDropOffs);
    }else{
      parsedDropOffs= [];
    }

    const [dropOffs, setDropOffs] = useState(parsedDropOffs);
    
    useEffect(()=>{
        localStorage.setItem('dropOffs',JSON.stringify(dropOffs))
      },[dropOffs])

    return (
        <DropOffContext.Provider value={{dropOffs,setDropOffs}}>
            {children} 
        </DropOffContext.Provider>
    );

}

export const useDropOffContext=() => useContext(DropOffContext);