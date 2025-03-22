import { BrowserRouter,Route,Routes } from 'react-router-dom'
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
  <Route path='/' element={<TaskList/>}/>
  <Route path='/add' element={<AddTask/>}/>
    </Routes>
    </BrowserRouter>
   
    
  )
}

export default App
