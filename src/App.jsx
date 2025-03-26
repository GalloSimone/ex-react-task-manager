import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import { GlobalProvider } from './context/GlobalContext';
import './App.css';
import Navbar from './components/Navbar';
import TaskDetail from './pages/TaskDetail';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider> 
        <Navbar />
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/add' element={<AddTask />} />
          <Route path='/task/:taskId' element={<TaskDetail/>}/>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
