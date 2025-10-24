import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { io } from 'socket.io-client';

export default function Home({ token }){
  const [me, setMe] = useState(null);
  useEffect(()=> {
    async function load(){ try { const data = await api.me(); setMe(data); } catch(e){} }
    load();
  }, [token]);

  useEffect(()=> {
    if(!token) return;
    const socket = io('http://localhost:5000', { auth: { token } });
    socket.on('connect', ()=>console.log('socket connected'));
    socket.on('update', (d)=> {
      console.log('update', d);
      // simple approach: reload user info when something updates
      api.getRoutine().then(()=>{}).catch(()=>{});
    });
    return ()=> socket.disconnect();
  }, [token]);

  if(!token) return <p>Please login.</p>;
  return (
    <div>
      <h2 className="text-2xl">Home</h2>
      {me && <div className="card p-4 mt-4">
        <p><strong>Name:</strong> {me.name}</p>
        <p><strong>Student No:</strong> {me.studentNo}</p>
        <p><strong>Role:</strong> {me.role}</p>
      </div>}
    </div>
  )
}
