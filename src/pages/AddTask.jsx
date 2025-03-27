import { useState, useRef } from 'react';
import useTasks from '../hooks/UseTasks';

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const descriptionRef = useRef();
  const [status, setStatus] = useState('To do');

  const { addTask } = useTasks();

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    if (symbols.split('').some((symbol) => newName.includes(symbol))) {
      setError('Il nome non può contenere simboli speciali');
    } else if (newName.trim().split(/\s+/).length < 1) {
      setError('Il nome deve contenere almeno 3 parole');
    } else {
      setError('');
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      alert('Correggi gli errori nel nome');
      return;
    }

    const description = descriptionRef.current.value;
    const result = await addTask({
      title: name,
      description,
      status,
    });

    if (result.success) {
      alert('Task aggiunto con successo!');
      setName('');
      descriptionRef.current.value = '';
      setStatus('To do');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header text-center">
          <h3>Aggiungi Nuovo Task</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nome Task</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome task"
                value={name}
                onChange={handleNameChange}
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descrizione Task</label>
              <textarea
                ref={descriptionRef}
                placeholder="Descrizione"
                className="form-control"
                rows="4"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">Scegli lo Status</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="form-select"
              >
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Aggiungi Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
