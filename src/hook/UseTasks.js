import { useState, useEffect } from "react"
export default function useTasks(){
    const [tasks,setTasks]=useState([])

 useEffect(()=>{
    const fetchTask=async()=>{
        try{
            const response=await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
            const data = await response.json();
            console.log(data);
            setTasks(data);
        }catch(error){
            console.error(error)
        }
    };
    fetchTask();
},[]);
const addTask=()=>{}
const removeTask=()=>{}
const updateTask=()=>{}
return{
    tasks,addTask,removeTask,updateTask
}
}
 