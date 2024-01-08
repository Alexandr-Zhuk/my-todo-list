import { Route, Routes } from 'react-router-dom'
import './App.css';
import TaskPage from './pages/TaskPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {

  const accessToken = useSelector((state) => state.auth.accessToken);

  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoute isAuth={accessToken}/>}>
          <Route path='/tasks/all' element={<TaskPage/>} />
          <Route path='/tasks/:filter/:id' element={<TaskPage/>} />
        </Route>
        <Route path='/auth' element={<AuthPage/>} />
       
      </Routes>
    </div>
  );
}

export default App;
