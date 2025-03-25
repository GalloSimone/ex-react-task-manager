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
      console.log("Risposta API:", data); 
  
      
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status }),
      });
      if (!response.ok) {
        throw new Error("Errore nell'aggiunta del task");
      }
      const data = await response.json();
      if (data.success) {
        setTasks((prevTasks) => [...prevTasks, data.task]);
        return { success: true, task: data.task };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      return { success: false, message: error.message };
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, addTask, fetchTasks, loading, error };
}
