import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Results({ token }) {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubject, setSearchSubject] = useState("");

  useEffect(() => {
    if (!token) return;
    api.getResults().then(setResults).catch(() => {});
  }, [token]);

  if (!token) return <p>Please login.</p>;

  // Calculate CGPA
  const calculateCGPA = (subjects) => {
    const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const totalPoints = subjects.reduce(
      (sum, s) => sum + (gradePoints[s.grade?.toUpperCase()] || 0),
      0
    );
    return (totalPoints / subjects.length).toFixed(2);
  };

  // Filter results by term and subject
  const filteredResults = results
    .filter((r) => r.term.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((r) => ({
      ...r,
      subjects: r.subjects.filter((s) =>
        s.name.toLowerCase().includes(searchSubject.toLowerCase())
      ),
    }))
    .filter((r) => r.subjects.length > 0); // remove terms with no matching subjects

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Result History</h2>

      {/* Search / Filter Inputs */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Term"
          className="input input-bordered w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Subject"
          className="input input-bordered w-full md:w-1/2"
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
        />
      </div>

      {filteredResults.length === 0 ? (
        <p>No results found.</p>
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
              {filteredResults.map((r, idx) =>
                r.subjects.map((s, i) => (
                  <tr key={`${r._id}-${i}`} className="hover:bg-gray-50">
                    {i === 0 && (
                      <td className="border px-4 py-2" rowSpan={r.subjects.length}>
                        {idx + 1}
                      </td>
                    )}
                    {i === 0 && (
                      <td className="border px-4 py-2" rowSpan={r.subjects.length}>
                        {r.term}
                      </td>
                    )}
                    <td className="border px-4 py-2">{s.name}</td>
                    <td className="border px-4 py-2">{s.grade}</td>
                    {i === 0 && (
                      <td className="border px-4 py-2" rowSpan={r.subjects.length}>
                        {calculateCGPA(r.subjects)}
                      </td>
                    )}
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
