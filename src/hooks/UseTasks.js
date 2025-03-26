import { useState, useEffect } from 'react';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else if (data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        throw new Error("Formato di risposta API non valido");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async ({ title, description, status }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Errore nell'aggiunta del task");
      }

      setTasks((prevTasks) => [...prevTasks, data.task]);
      return { success: true, task: data.task };
    } catch (error) {
      console.error('Error adding task:', error);
      return { success: false, message: error.message };
    }
  };

  const removeTask = async (taskId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Errore nell'eliminazione del task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      return { success: true };
    } catch (error) {
      console.error('Error durante l\'eliminazione del task:', error);
      return { success: false, message: error.message };
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Errore nell'aggiornamento del task");
      }

      setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? data.task : task)));
      return { success: true, task: data.task };
    } catch (error) {
      console.error("Errore durante l'aggiornamento del task:", error);
      return { success: false, message: error.message };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, addTask, fetchTasks, removeTask, updateTask, loading, error };
}
