import { useParams,useNavigate } from "react-router-dom";
import  useTasks  from "../hooks/UseTasks"

export default function TaskDetail() {
    const { id } = useParams();
  const { tasks, removeTask } = useTasks();
  const navigate = useNavigate();
  
 
  const task = tasks.find((task) => task.id === parseInt(id));

 
  const handleRemove = async () => {
    const result = await removeTask(task.id); 

    if (result.success) {
      alert('Task eliminato con successo');
      navigate('/');
    } else {
      alert(`Errore: ${result.message}`);
    }
  };


  if (!task) {
    return <p>Caricamento task...</p>;
  }

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Status: {task.status}</h6>
                    <p className="card-text">{task.description}</p>
                    <p className="card-subtitle mb-2 text-body-secondary">
                        Created at: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                    <button onClick={handleRemove} className="btn btn-danger">Elimina task</button>
                </div>
            </div>
        </>
    );
}