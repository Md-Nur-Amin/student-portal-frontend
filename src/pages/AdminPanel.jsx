// import React, { useState } from "react";
// import api from "../services/api";

// export default function AdminPanel({ token }) {
//   const [activeTab, setActiveTab] = useState("results");
//   const [studentNo, setStudentNo] = useState("");
//   const [term, setTerm] = useState("Term 1");
//   const [subjectsText, setSubjectsText] = useState("Math:A\nPhysics:B");
//   const [billItemsText, setBillItemsText] = useState("Tuition:500\nLibrary:20");
//   const [className, setClassName] = useState("Class A");
//   const [routineText, setRoutineText] = useState("Monday,09:00-10:00,Math");
//   const [examRoutineText, setExamRoutineText] = useState("Monday,09:00-11:00,Math,Room 101");

//   if (!token) return <p>Admin login required.</p>;

//   // --- Helpers ---
//   function calculateCGPA(subjects) {
//     const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
//     const totalPoints = subjects.reduce(
//       (sum, s) => sum + (gradePoints[s.grade?.toUpperCase()] || 0),
//       0
//     );
//     return (totalPoints / subjects.length).toFixed(2);
//   }

//   // --- Submit Functions ---
//   async function submitResult() {
//     const subjects = subjectsText.split("\n").map((l) => {
//       const [name, grade] = l.split(":");
//       return { name: name?.trim(), grade: grade?.trim() };
//     });
//     const cgpa = calculateCGPA(subjects);
//     await api.postResult({ studentNo, term, subjects });
//     alert(`Result posted! CGPA: ${cgpa}`);
//   }

//   async function submitBill() {
//     const items = billItemsText.split("\n").map((l) => {
//       const [desc, amt] = l.split(":");
//       return { desc: desc?.trim(), amount: Number(amt || 0) };
//     });
//     const total = items.reduce((sum, i) => sum + i.amount, 0);
//     await api.postBill({ studentNo, items });
//     alert(`Bill posted! Total: $${total}`);
//   }

//   async function submitRoutine() {
//     const entries = routineText.split("\n").map((l) => {
//       const [day, time, subject] = l.split(",");
//       return { day: day?.trim(), time: time?.trim(), subject: subject?.trim() };
//     });
//     await api.postRoutine({ className, entries });
//     alert("Class routine posted!");
//   }

//   async function submitExamRoutine() {
//     const entries = examRoutineText.split("\n").map((l) => {
//       const [day, time, subject, room] = l.split(",");
//       return { day: day?.trim(), time: time?.trim(), subject: subject?.trim(), room: room?.trim() };
//     });
//     await api.postRoutine({ className, entries, type: "exam" });
//     alert("Exam routine posted!");
//   }

//   // --- Render Tabs ---
//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>

//       <div className="tabs mb-6">
//         {["results", "bills", "routine", "exam"].map((tab) => (
//           <button
//             key={tab}
//             className={`tab tab-bordered ${activeTab === tab ? "tab-active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === "results" ? "Results" : tab === "bills" ? "Bills" : tab === "routine" ? "Class Routine" : "Exam Routine"}
//           </button>
//         ))}
//       </div>

//       {activeTab === "results" && (
//         <div className="card p-6">
//           <h3 className="font-bold mb-2">Upload Result</h3>
//           <input className="input mb-2 w-full" placeholder="Student No" value={studentNo} onChange={(e) => setStudentNo(e.target.value)} />
//           <input className="input mb-2 w-full" value={term} onChange={(e) => setTerm(e.target.value)} />
//           <textarea className="textarea mb-2 w-full" rows="4" value={subjectsText} onChange={(e) => setSubjectsText(e.target.value)} />
//           <button className="btn btn-primary" onClick={submitResult}>Post Result</button>
//         </div>
//       )}

//       {activeTab === "bills" && (
//         <div className="card p-6">
//           <h3 className="font-bold mb-2">Upload Bill</h3>
//           <input className="input mb-2 w-full" placeholder="Student No" value={studentNo} onChange={(e) => setStudentNo(e.target.value)} />
//           <textarea className="textarea mb-2 w-full" rows="4" value={billItemsText} onChange={(e) => setBillItemsText(e.target.value)} />
//           <button className="btn btn-primary" onClick={submitBill}>Post Bill</button>
//         </div>
//       )}

//       {activeTab === "routine" && (
//         <div className="card p-6">
//           <h3 className="font-bold mb-2">Class Routine</h3>
//           <input className="input mb-2 w-full" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} />
//           <textarea className="textarea mb-2 w-full" rows="4" value={routineText} onChange={(e) => setRoutineText(e.target.value)} />
//           <button className="btn btn-primary" onClick={submitRoutine}>Post Routine</button>
//         </div>
//       )}

//       {activeTab === "exam" && (
//         <div className="card p-6">
//           <h3 className="font-bold mb-2">Exam Routine</h3>
//           <input className="input mb-2 w-full" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} />
//           <textarea className="textarea mb-2 w-full" rows="4" value={examRoutineText} onChange={(e) => setExamRoutineText(e.target.value)} />
//           <button className="btn btn-primary" onClick={submitExamRoutine}>Post Exam Routine</button>
//         </div>
//       )}

//       <p className="mt-4 text-sm text-gray-500">
//         Notes: Use "Subject:Grade" for results, "Desc:Amount" for bills, "Day,Time,Subject" for class routine, and "Day,Time,Subject,Room" for exam routine.
//       </p>
//     </div>
//   );
// }


import React, { useState } from "react";
import api from "../services/api";

export default function AdminPanel({ token }) {
  const [activeTab, setActiveTab] = useState("results");

  const [studentNo, setStudentNo] = useState("");
  const [term, setTerm] = useState("Term 1");
  const [subjectsText, setSubjectsText] = useState("Math:A\nPhysics:B");

  const [billItemsText, setBillItemsText] = useState("Tuition:500\nLibrary:20");

  const [className, setClassName] = useState("Class A");
  const [routineText, setRoutineText] = useState("Monday,09:00-10:00,Math");

  const [examRoutineText, setExamRoutineText] = useState("Monday,09:00-11:00,Math,Room 101");

  if (!token) return <p>Admin login required.</p>;

  // --- Helpers ---
  const calculateCGPA = (subjects) => {
    const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const totalPoints = subjects.reduce(
      (sum, s) => sum + (gradePoints[s.grade?.toUpperCase()] || 0),
      0
    );
    return (totalPoints / subjects.length).toFixed(2);
  };

  // --- Submission Functions ---
  const submitResult = async () => {
    const subjects = subjectsText.split("\n").map((l) => {
      const [name, grade] = l.split(":");
      return { name: name?.trim(), grade: grade?.trim() };
    });
    const cgpa = calculateCGPA(subjects);
    await api.postResult({ studentNo, term, subjects });
    alert(`Result posted! CGPA: ${cgpa}`);
  };

  const submitBill = async () => {
    const items = billItemsText.split("\n").map((l) => {
      const [desc, amt] = l.split(":");
      return { desc: desc?.trim(), amount: Number(amt || 0) };
    });
    const total = items.reduce((sum, i) => sum + i.amount, 0);
    await api.postBill({ studentNo, items });
    alert(`Bill posted! Total: $${total}`);
  };

  const submitRoutine = async () => {
    const entries = routineText.split("\n").map((l) => {
      const [day, time, subject] = l.split(",");
      return { day: day?.trim(), time: time?.trim(), subject: subject?.trim() };
    });
    await api.postRoutine({ className, entries });
    alert("Class routine posted!");
  };

  const submitExamRoutine = async () => {
    const entries = examRoutineText.split("\n").map((l) => {
      const [day, time, subject, room] = l.split(",");
      return { day: day?.trim(), time: time?.trim(), subject: subject?.trim(), room: room?.trim() };
    });
    await api.postRoutine({ className, entries, type: "exam" });
    alert("Exam routine posted!");
  };

  // --- Preview Functions ---
  const getSubjectsPreview = () =>
    subjectsText.split("\n").map((l) => {
      const [name, grade] = l.split(":");
      return { name: name?.trim(), grade: grade?.trim() };
    });

  const getBillPreview = () =>
    billItemsText.split("\n").map((l) => {
      const [desc, amt] = l.split(":");
      return { desc: desc?.trim(), amount: Number(amt || 0) };
    });

  const getRoutinePreview = () =>
    routineText.split("\n").map((l) => {
      const [day, time, subject] = l.split(",");
      return { day: day?.trim(), time: time?.trim(), subject: subject?.trim() };
    });

  const getExamRoutinePreview = () =>
    examRoutineText.split("\n").map((l) => {
      const [day, time, subject, room] = l.split(",");
      return { day: day?.trim(), time: time?.trim(), subject: subject?.trim(), room: room?.trim() };
    });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>

      {/* Tabs */}
      <div className="tabs mb-6 ">
        {["results", "bills", "routine", "exam"].map((tab) => (
          <button
            key={tab}
            className={`tab tab-bordered  rounded ${activeTab === tab ? "tab-active bg-emerald-600" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "results"
              ? "Results"
              : tab === "bills"
                ? "Bills"
                : tab === "routine"
                  ? "Class Routine"
                  : "Exam Routine"}
          </button>
        ))}
      </div>

      {/* Result Upload */}
      {activeTab === "results" && (
        <div className="card p-6">
          <h3 className="font-bold mb-2">Upload Result</h3>
          <input className="input mb-2 w-full" placeholder="Student No" value={studentNo} onChange={(e) => setStudentNo(e.target.value)} />
          <input className="input mb-2 w-full" value={term} onChange={(e) => setTerm(e.target.value)} />
          <textarea className="textarea mb-2 w-full" rows="4" value={subjectsText} onChange={(e) => setSubjectsText(e.target.value)} />
          <button className="btn btn-primary mb-4" onClick={submitResult}>Post Result</button>

          {/* Preview */}
          <h4 className="font-semibold mb-2">Preview</h4>
          <table className="table w-full mb-2">
            <thead>
              <tr><th>Subject</th><th>Grade</th></tr>
            </thead>
            <tbody>
              {getSubjectsPreview().map((s, i) => (
                <tr key={i}><td>{s.name}</td><td>{s.grade}</td></tr>
              ))}
            </tbody>
          </table>
          <p>CGPA: {calculateCGPA(getSubjectsPreview())}</p>
        </div>
      )}

      {/* Bills Upload */}
      {activeTab === "bills" && (
        <div className="card p-6">
          <h3 className="font-bold mb-2">Upload Bill</h3>
          <input className="input mb-2 w-full" placeholder="Student No" value={studentNo} onChange={(e) => setStudentNo(e.target.value)} />
          <textarea className="textarea mb-2 w-full" rows="4" value={billItemsText} onChange={(e) => setBillItemsText(e.target.value)} />
          <button className="btn btn-primary mb-4" onClick={submitBill}>Post Bill</button>

          {/* Preview */}
          <h4 className="font-semibold mb-2">Preview</h4>
          <table className="table w-full">
            <thead>
              <tr><th>Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              {getBillPreview().map((i, idx) => (
                <tr key={idx}><td>{i.desc}</td><td>{i.amount}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 font-bold">Total: {getBillPreview().reduce((sum, i) => sum + i.amount, 0)}</p>
        </div>
      )}

      {/* Class Routine */}
      {activeTab === "routine" && (
        <div className="card p-6">
          <h3 className="font-bold mb-2">Class Routine</h3>
          <input className="input mb-2 w-full" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} />
          <textarea className="textarea mb-2 w-full" rows="4" value={routineText} onChange={(e) => setRoutineText(e.target.value)} />
          <button className="btn btn-primary mb-4" onClick={submitRoutine}>Post Routine</button>

          {/* Preview */}
          <h4 className="font-semibold mb-2">Preview</h4>
          <table className="table w-full">
            <thead><tr><th>Day</th><th>Time</th><th>Subject</th></tr></thead>
            <tbody>
              {getRoutinePreview().map((r, idx) => (
                <tr key={idx}><td>{r.day}</td><td>{r.time}</td><td>{r.subject}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Exam Routine */}
      {activeTab === "exam" && (
        <div className="card p-6">
          <h3 className="font-bold mb-2">Exam Routine</h3>
          <input className="input mb-2 w-full" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} />
          <textarea className="textarea mb-2 w-full" rows="4" value={examRoutineText} onChange={(e) => setExamRoutineText(e.target.value)} />
          <button className="btn btn-primary mb-4" onClick={submitExamRoutine}>Post Exam Routine</button>

          {/* Preview */}
          <h4 className="font-semibold mb-2">Preview</h4>
          <table className="table w-full">
            <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Room</th></tr></thead>
            <tbody>
              {getExamRoutinePreview().map((r, idx) => (
                <tr key={idx}><td>{r.day}</td><td>{r.time}</td><td>{r.subject}</td><td>{r.room}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
