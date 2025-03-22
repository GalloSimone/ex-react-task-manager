import { createContext,useState,useEffect } from "react";
export const GlobalContext=createContext();
export const GlobalProvider=({children})=>{
    const[task, setTask]=useState([]);
    useEffect(()=>{
        const fetchTask=async()=>{
            try{
                const response=await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
                const data = await response.json();
                console.log(data);
                setTask(data);
            }catch(error){
                console.error(error)
            }
        };
        fetchTask();
    },[]);
return(
    <GlobalContext.Provider value={{task}}>
        {children}
    </GlobalContext.Provider>
)
}