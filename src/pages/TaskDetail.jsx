
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import  useTasks from "../hooks/UseTasks"; 
import Modal from "../components/Modal"; 

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks, removeTask } = useTasks();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  

  const task = tasks.find((task) => task.id === parseInt(id));

  const handleRemove = async () => {
    if (taskToDelete) {
      const result = await removeTask(taskToDelete.id);

      if (result.success) {
        alert('Task eliminato con successo');
        navigate('/'); 
      } else {
        alert(`Errore: ${result.message}`);
      }
      setShowModal(false); 
    }
  };

  const handleConfirmDelete = () => {
    setTaskToDelete(task);
    setShowModal(true);
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
        <button className="btn btn-danger" onClick={handleConfirmDelete}>
          Elimina Task
        </button>
      </div>
    </div>

    <Modal
      title="Conferma Eliminazione"
      content="Sei sicuro di voler eliminare questo task?"
      show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleRemove}
    />
    </>
    
  );
}