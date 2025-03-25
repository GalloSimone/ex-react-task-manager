import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/UseTasks';

export default function TaskList() {
  const { tasks, fetchTasks, loading, error } = useTasks();
  const navigate =useNavigate()

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Errore: {error}</p>;
  }

  const goToDetail = (taskId)=>{
    navigate(`/task/${taskId}`)
  }

  return (
    <div>
      <h1>Lista Task</h1>
      {tasks.length === 0 ? (
        <p>Non ci sono task disponibili</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td> <span className={`badge ${getStatusClass(task.status)}`}>
                                        {task.status}
                                    </span></td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={()=>goToDetail(task.id)} className='btn btn-primary'>dettaglio task</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
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