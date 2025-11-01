import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Results({ token }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!token) return;
    api.getResults().then(setResults).catch(() => {});
  }, [token]);

  if (!token) return <p>Please login.</p>;

  // Helper to calculate CGPA for a result
  const calculateCGPA = (subjects) => {
    const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const totalPoints = subjects.reduce((sum, s) => sum + (gradePoints[s.grade?.toUpperCase()] || 0), 0);
    return (totalPoints / subjects.length).toFixed(2);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Result History</h2>

      {results.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Term</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">CGPA</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) =>
                r.subjects.map((s, i) => (
                  <tr key={`${r._id}-${i}`} className="hover:bg-gray-50">
                    {i === 0 && <td className="border px-4 py-2" rowSpan={r.subjects.length}>{idx + 1}</td>}
                    {i === 0 && <td className="border px-4 py-2" rowSpan={r.subjects.length}>{r.term}</td>}
                    <td className="border px-4 py-2">{s.name}</td>
                    <td className="border px-4 py-2">{s.grade}</td>
                    {i === 0 && <td className="border px-4 py-2" rowSpan={r.subjects.length}>{calculateCGPA(r.subjects)}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
