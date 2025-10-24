import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Bills from './pages/Bills';
import Results from './pages/Results';
import Routine from './pages/Routine';
import AdminPanel from './pages/AdminPanel';
import api from './services/api';

function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();

  useEffect(()=> {
    if(token) {
      api.setToken(token);
    }
  },[token]);

  function handleLogout(){
    localStorage.removeItem('token'); localStorage.removeItem('role');
    setToken(null); setRole(null); navigate('/');
  }

  return (
    <div className="min-h-screen bg-base-200">
      <nav className="navbar bg-base-100 shadow">
        <div className="flex-1 px-4">
          <Link to="/" className="btn btn-ghost normal-case text-xl">University Portal</Link>
        </div>
        <div className="px-4">
          {token ? (
            <>
              <Link to="/" className="btn btn-ghost">Home</Link>
              <Link to="/bills" className="btn btn-ghost">Bill History</Link>
              <Link to="/results" className="btn btn-ghost">Result History</Link>
              <Link to="/routine" className="btn btn-ghost">Class Routine</Link>
              {role==='admin' && <Link to="/admin" className="btn btn-ghost">Admin Panel</Link>}
              <button className="btn btn-error ml-2" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
          <Route path="/bills" element={<Bills token={token} />} />
          <Route path="/results" element={<Results token={token} />} />
          <Route path="/routine" element={<Routine token={token} />} />
          <Route path="/admin" element={<AdminPanel token={token} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
