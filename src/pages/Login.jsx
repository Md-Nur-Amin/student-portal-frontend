import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login({ setToken, setRole }){
  const [studentNo, setStudentNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function submit(e){
    e.preventDefault();
    try {
      const data = await api.login(studentNo, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      setToken(data.token); setRole(data.role);
      api.setToken(data.token);
      navigate('/');
      alert('Logged in as '+data.role);
    } catch(e){
      alert('Login failed');
    }
  }
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="card p-6 shadow">
        <input className="input mb-2" placeholder="studentNo (e.g. 001 or admin)" value={studentNo} onChange={e=>setStudentNo(e.target.value)} />
        <input className="input mb-2" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <p className="mt-4 text-sm">Tip: students 001..100 with same password; admin/admin</p>
    </div>
  )
}
