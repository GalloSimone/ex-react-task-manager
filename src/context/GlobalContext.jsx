import { createContext, useContext} from "react";
import useTasks from "../hook/UseTasks";
export const GlobalContext=createContext();
export const GlobalProvider=({children})=>{
    const { tasks, addTask, removeTask, updateTask}=useTasks()
return(
    <GlobalContext.Provider value={{tasks, addTask, removeTask, updateTask}}>
        {children}
    </GlobalContext.Provider>
)
}
export const useGlobalContext = () => useContext(GlobalContext);