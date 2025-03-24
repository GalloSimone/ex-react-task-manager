import React from "react";


const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
            <td>
                <span className={`badge ${getStatusClass(task.status)}`}>
                    {task.status}
                </span>
            </td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
});


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

export default TaskRow;