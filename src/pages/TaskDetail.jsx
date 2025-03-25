import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TaskDetail() {
    const { id } = useParams();
    console.log(id)
    const [task, setTask] = useState(null);

    useEffect(() => {
        console.log("Fetching task with ID:", id); // Log per vedere quale ID viene passato
        const fetchTask = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
                if (!response.ok) {
                    throw new Error("Task not found");
                }
                const data = await response.json();
                if (data.success) {
                    setTask(data.task);
                } else {
                    throw new Error("Task not found");
                }
            } catch (error) {
                setError("Error fetching task. Please try again.");
                console.error("Error fetching task:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTask();
    }, [id]);

    if (!task) {
        return <p>Loading task...</p>;
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
                    <button onClick={() => console.log("Elimino task")}>Elimina task</button>
                </div>
            </div>
        </>
    );
}