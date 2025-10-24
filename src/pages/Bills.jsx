import React, {useEffect, useState} from 'react';
import api from '../services/api';

export default function Bills({ token }){
  const [bills, setBills] = useState([]);
  useEffect(()=> {
    if(!token) return;
    api.getBills().then(setBills).catch(()=>{});
  }, [token]);

  if(!token) return <p>Please login.</p>;
  return (
    <div>
      <h2 className="text-2xl">Bill History</h2>
      {bills.length===0 && <p className="mt-4">No bills yet.</p>}
      {bills.map(b=>(
        <div key={b._id} className="card p-4 my-3">
          <p><strong>Total:</strong> {b.total}</p>
          <p><strong>Items:</strong></p>
          <ul className="list-disc pl-6">
            {b.items.map((it,i)=> <li key={i}>{it.desc} - {it.amount}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
