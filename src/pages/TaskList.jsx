import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function TaskList() {
    const { task } = useContext(GlobalContext);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Lista Task</h1>
            {task?.length === 0 ? (
                <p className="alert alert-warning">Nessun task disponibile</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Nome</th>
                                <th>Stato</th>
                                <th>Data di Creazione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task?.map((taskItem) => (
                                <tr key={taskItem.id}>
                                    <td>{taskItem.title}</td>
                                    <td>
                                        <span className={`badge ${getStatusClass(taskItem.status)}`}>
                                            {taskItem.status}
                                        </span>
                                    </td>
                                    <td>{new Date(taskItem.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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