
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import EditPassword from './pages/EditUser';

function App() {

  return (
    <>
      
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/editUser' element={<EditPassword/>}/>

      </Routes>
      
    

    </>
  )
}

export default App
