import { useNavigate } from 'react-router-dom';
import UseTasks from '../hooks/UseTasks'
import { useState,useEffect,useMemo } from 'react';

export default function TaskList() {
  const { tasks, fetchTasks, loading, error } = UseTasks();
  const navigate = useNavigate();

  // Dovrebbero essere all'interno della funzione del componente
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);

  // Funzione per gestire l'ordinamento
  const handleSort = (column) => {
    setSortBy((prevSortBY) => {
      if (prevSortBY === column) {
        setSortOrder((prevSortOrder) => (prevSortOrder === 1 ? -1 : 1));
        return column;
      } else {
        setSortOrder(1);
        return column;
      }
    });
  };

  // Ordinamento delle task
  const sortedTask = useMemo(() => {
    if (!tasks) return [];
    return [...tasks].sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder * a.title.localeCompare(b.title);
      }
      if (sortBy === 'status') {
        const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };
        return sortOrder * (statusOrder[a.status] - statusOrder[b.status]);
      }
      if (sortBy === 'createdAt') {
        return sortOrder * (new Date(a.createdAt) - new Date(b.createdAt));
      }
      return 0;
    });
  }, [tasks, sortBy, sortOrder]);

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Errore: {error}</p>;
  }

  const goToDetail = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div>
      <h1>Lista Task</h1>
      {tasks.length === 0 ? (
        <p>Non ci sono task disponibili</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>
                Nome {sortBy === 'title' && (sortOrder === 1 ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('status')}>
                Stato {sortBy === 'status' && (sortOrder === 1 ? '🔼' : '🔽')}
              </th>
              <th onClick={() => handleSort('createdAt')}>
                Data di Creazione {sortBy === 'createdAt' && (sortOrder === 1 ? '🔼' : '🔽')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTask.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <span className={`badge ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => goToDetail(task.id)} className="btn btn-primary">
                    dettaglio task
                  </button>
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
