import { Route, Routes } from 'react-router-dom'
import './App.css';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/tasks/all' element={<TaskPage/>} />
        <Route path='/tasks/:filter/:id' element={<TaskPage/>} />
       
      </Routes>
    </div>
  );
}

export default App;
