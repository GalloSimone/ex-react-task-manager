import{useContext} from 'react'
import { GlobalContext } from '../context/GlobalContext'

export default function TaskList(){
    const {task} = useContext(GlobalContext);
    return(
        <div>
            <h1>lista task</h1>
            {task.length === 0 ?(
                <p>nessun task disponibile</p>
            ):(
                <ul>
                    {task.map((taskItem)=>(
                        <li key={taskItem.id}>{taskItem.name}</li>
                    ))}
                </ul>
            )
        }
        </div>
    )
}