import { useState, useEffect } from "react"
export default function useTasks(){
    const [tasks,setTasks]=useState([])

 useEffect(()=>{
    const fetchTask=async({title,description,status})=>{
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, status }),
              });
            const data = await response.json();

            if (data.success) {
                setTasks((prevTasks) => [...prevTasks, data.task]); // Aggiungi il nuovo task allo stato globale
                return { success: true, task: data.task };
              } else {
                throw new Error(data.message); // Lancia un errore se success è false
              }
            } catch (error) {
              console.error("Error adding task:", error);
              return { success: false, message: error.message }; // Restituisci il messaggio d'errore
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
 