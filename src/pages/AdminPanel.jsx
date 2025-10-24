import React, {useState} from 'react';
import api from '../services/api';

export default function AdminPanel({ token }){
  const [studentNo, setStudentNo] = useState('');
  const [term, setTerm] = useState('Term 1');
  const [subjectsText, setSubjectsText] = useState('Math:A\nPhysics:B');
  const [billItemsText, setBillItemsText] = useState('Tuition:500\nLibrary:20');
  const [className, setClassName] = useState('Class A');
  const [routineText, setRoutineText] = useState('Monday,09:00-10:00,Math\nTuesday,10:00-11:00,Physics');

  async function submitResult(){
    const subjects = subjectsText.split('\n').map(l=>{
      const [name,grade] = l.split(':'); return { name: name?.trim(), grade: grade?.trim() }
    });
    await api.postResult({ studentNo, term, subjects });
    alert('result posted');
  }
  async function submitBill(){
    const items = billItemsText.split('\n').map(l=>{
      const [desc,amt] = l.split(':'); return { desc: desc?.trim(), amount: Number(amt||0) }
    });
    await api.postBill({ studentNo, items });
    alert('bill posted');
  }
  async function submitRoutine(){
    const entries = routineText.split('\n').map(l=>{
      const [day,time,subject] = l.split(','); return { day: day?.trim(), time: time?.trim(), subject: subject?.trim() }
    });
    await api.postRoutine({ className, entries });
    alert('routine posted');
  }

  if(!token) return <p>Admin login required.</p>;
  return (
    <div>
      <h2 className="text-2xl">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="card p-4">
          <h3 className="font-bold">Upload Result</h3>
          <input className="input my-2" placeholder="studentNo (001)" value={studentNo} onChange={e=>setStudentNo(e.target.value)} />
          <input className="input my-2" value={term} onChange={e=>setTerm(e.target.value)} />
          <textarea className="textarea my-2" rows="4" value={subjectsText} onChange={e=>setSubjectsText(e.target.value)} />
          <button className="btn" onClick={submitResult}>Post Result</button>
        </div>

        <div className="card p-4">
          <h3 className="font-bold">Upload Bill</h3>
          <input className="input my-2" placeholder="studentNo (001)" value={studentNo} onChange={e=>setStudentNo(e.target.value)} />
          <textarea className="textarea my-2" rows="4" value={billItemsText} onChange={e=>setBillItemsText(e.target.value)} />
          <button className="btn" onClick={submitBill}>Post Bill</button>
        </div>

        <div className="card p-4">
          <h3 className="font-bold">Class Routine</h3>
          <input className="input my-2" value={className} onChange={e=>setClassName(e.target.value)} />
          <textarea className="textarea my-2" rows="4" value={routineText} onChange={e=>setRoutineText(e.target.value)} />
          <button className="btn" onClick={submitRoutine}>Post Routine</button>
        </div>
      </div>
      <p className="mt-4 text-sm">Notes: use lines in the textareas like "Subject:Grade" for results, "Desc:Amount" for bills, and "Day,Time,Subject" for routine.</p>
    </div>
  )
}
