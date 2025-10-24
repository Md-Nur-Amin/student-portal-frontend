import React, {useEffect, useState} from 'react';
import api from '../services/api';

export default function Routine({ token }){
  const [routines, setRoutines] = useState([]);
  useEffect(()=> {
    if(!token) return;
    api.getRoutine().then(setRoutines).catch(()=>{});
  }, [token]);

  if(!token) return <p>Please login.</p>;
  return (
    <div>
      <h2 className="text-2xl">Class Routine</h2>
      {routines.length===0 && <p className="mt-4">No routine available.</p>}
      {routines.map(r=>(
        <div key={r._id} className="card p-4 my-3">
          <p><strong>Class:</strong> {r.className}</p>
          <ul className="list-disc pl-6">
            {r.entries.map((e,i)=> <li key={i}>{e.day} {e.time} — {e.subject}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
