import React, {useEffect, useState} from 'react';
import api from '../services/api';

export default function Results({ token }){
  const [results, setResults] = useState([]);
  useEffect(()=> {
    if(!token) return;
    api.getResults().then(setResults).catch(()=>{});
  }, [token]);

  if(!token) return <p>Please login.</p>;
  return (
    <div>
      <h2 className="text-2xl">Result History</h2>
      {results.length===0 && <p className="mt-4">No results yet.</p>}
      {results.map(r=>(
        <div key={r._id} className="card p-4 my-3">
          <p><strong>Term:</strong> {r.term}</p>
          <ul className="list-disc pl-6">
            {r.subjects.map((s,i)=> <li key={i}>{s.name} — {s.grade}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
