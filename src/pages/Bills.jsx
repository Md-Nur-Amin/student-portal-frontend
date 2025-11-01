// import React, {useEffect, useState} from 'react';
// import api from '../services/api';

// export default function Bills({ token }){
//   const [bills, setBills] = useState([]);
//   useEffect(()=> {
//     if(!token) return;
//     api.getBills().then(setBills).catch(()=>{});
//   }, [token]);

//   if(!token) return <p>Please login.</p>;
//   return (
//     <div>
//       <h2 className="text-2xl">Bill History</h2>
//       {bills.length===0 && <p className="mt-4">No bills yet.</p>}
//       {bills.map(b=>(
//         <div key={b._id} className="card p-4 my-3">
//           <p><strong>Total:</strong> {b.total}</p>
//           <p><strong>Items:</strong></p>
//           <ul className="list-disc pl-6">
//             {b.items.map((it,i)=> <li key={i}>{it.desc} - {it.amount}</li>)}
//           </ul>
//         </div>
//       ))}
//     </div>
//   )
// }



import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Bills({ token }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (!token) return;
    api.getBills()
      .then(setBills)
      .catch(() => {});
  }, [token]);

  if (!token) return <p>Please login.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bill History</h2>

      {bills.length === 0 ? (
        <p>No bills yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Items</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, idx) => (
                b.items.map((item, i) => (
                  <tr key={`${b._id}-${i}`} className="hover:bg-gray-50">
                    {i === 0 && (
                      <>
                        <td className="border px-4 py-2" rowSpan={b.items.length}>{idx + 1}</td>
                      </>
                    )}
                    <td className="border px-4 py-2">{item.desc}</td>
                    <td className="border px-4 py-2">{item.amount}</td>
                    {i === 0 && (
                      <td className="border px-4 py-2" rowSpan={b.items.length}>{b.total}</td>
                    )}
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
