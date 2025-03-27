import { useNavigate } from 'react-router-dom';
import UseTasks from '../hooks/UseTasks'
import { useState,useEffect,useMemo,useCallback } from 'react';
const debounce =(func,delay)=>{
  let timer ;
  return (...args)=>{
    clearTimeout(timer);
    timer=setTimeout(()=>func(...args),delay)
  }
}
export default function TaskList() {
  const { tasks, fetchTasks, loading, error } = UseTasks();
  const navigate = useNavigate();

  const [searchQuery,setSearchQuery]=useState('')
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);

const handleSearch=useCallback(
  debounce((query)=>setSearchQuery(query),500),
  []
)

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

  const sortedTasks = useMemo(() => {
    if (!tasks) return [];

    
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredTasks.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder * a.title.localeCompare(b.title);
      }
      if (sortBy === 'status') {
        const statusOrder = { 'To do': 0, 'Doing': 1, 'Done': 2 };
        return sortOrder * (statusOrder[a.status] - statusOrder[b.status]);
      }
      if (sortBy === 'createdAt') {
        return sortOrder * (new Date(a.createdAt) - new Date(b.createdAt));
      }
      return 0;
    });
  }, [tasks, searchQuery, sortBy, sortOrder]);


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
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Lista Task</h3>
        </div>
        <div className="card-body">
      
          <div className="mb-3">
            <input
              type="text"
              
              placeholder="Cerca task per nome..."
              onChange={(e) => handleSearch(e.target.value)}
              className="form-control"
            />
          </div>
  
          {tasks.length === 0 ? (
            <p className="text-center text-muted">Non ci sono task disponibili</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                      Nome {sortBy === 'title' && (sortOrder === 1 ? '🔼' : '🔽')}
                    </th>
                    <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                      Stato {sortBy === 'status' && (sortOrder === 1 ? '🔼' : '🔽')}
                    </th>
                    <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
                      Data di Creazione {sortBy === 'createdAt' && (sortOrder === 1 ? '🔼' : '🔽')}
                    </th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>
                        <span className={`badge ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => goToDetail(task.id)} className="btn btn-sm btn-primary">
                          Dettaglio
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
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
