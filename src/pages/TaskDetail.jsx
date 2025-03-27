import React, { useState, useEffect } from 'react';
import EditTaskModal from '../components/EditTaskModal';
import { useNavigate, useParams } from 'react-router-dom';
import useTasks from '../hooks/UseTasks';
import Modal from '../components/Modal';

const TaskDetail = () => {
  const { taskId } = useParams();
  const { tasks, fetchTasks, updateTask, removeTask } = useTasks();
  const [task, setTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const foundTask = tasks.find((t) => t.id === parseInt(taskId));
      setTask(foundTask || null);
      setLoading(false);
    }
  }, [tasks, taskId]);

  const handleRemove = async () => {
    if (task) {
      const result = await removeTask(task.id);
      if (result.success) {
        alert('Task eliminato con successo');
        navigate('/');
      } else {
        alert(`Errore: ${result.message}`);
      }
      setShowDeleteModal(false);
    }
  };

  const handleSave = async (updatedTask) => {
    const result = await updateTask(updatedTask);
    if (result.success) {
      alert('Task modificato con successo!');
      setShowEditModal(false);
      setTask(result.task);
    } else {
      alert('Errore: ' + result.message);
    }
  };

  if (loading) return <p>Caricamento task...</p>;
  if (!task) return <p>Task non trovato</p>;

  return (
    <div className="container mt-5">
    <div className="card shadow-lg">
      <div className="card-header text-center">
        <h3>Dettagli Task</h3>
      </div>
      <div className="card-body">
        <p><strong>Nome:</strong> {task.title}</p>
        <p><strong>Descrizione:</strong> {task.description}</p>
        <p><strong>Stato:</strong> <span className={`badge ${getStatusClass(task.status)}`}>{task.status}</span></p>
        
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="btn btn-primary w-48"
          >
            Modifica Task
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn btn-danger w-48"
          >
            elimina task
          </button>
        </div>
      </div>
    </div>

    <EditTaskModal
      show={showEditModal}
      onClose={() => setShowEditModal(false)}
      task={task}
      onSave={handleSave}
    />
    <Modal
      title="Conferma Eliminazione"
      content="Sei sicuro di voler eliminare questo task?"
      show={showDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={handleRemove}
    />
  </div>
  );
};
const getStatusClass = (status) => {
  switch (status) {
    case 'To do':
      return 'bg-danger text-white';
    case 'Doing':
      return 'bg-warning text-dark';
    case 'Done':
      return 'bg-success text-white';
    default:
      return 'bg-secondary text-white';
  }
};

export default TaskDetail;
