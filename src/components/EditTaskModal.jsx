import React, { useEffect, useState, useRef } from 'react';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
  if (!show) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To do');
  const editFormRef = useRef(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'To do');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: task.id, title, description, status });
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Modifica task</h3>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form ref={editFormRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Titolo</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrizione</label>
                <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="To do">To do</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
