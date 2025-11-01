import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Routine({ token }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    if (!token) return;
    api.getRoutine().then(setRoutines).catch(() => {});
  }, [token]);

  if (!token) return <p>Please login.</p>;

  // Collect all unique days for rows
  const days = Array.from(
    new Set(routines.flatMap((r) => r.entries.map((e) => e.day)))
  );

  // Collect all unique times for columns
  const times = Array.from(
    new Set(routines.flatMap((r) => r.entries.map((e) => e.time)))
  ).sort();

  // Prepare table data [day][time] = subject
  const tableData = days.map((day) => {
    const row = { day };
    times.forEach((time) => {
      const entry = routines
        .flatMap((r) => r.entries.filter((e) => e.day === day && e.time === time))
        .map((e) => `${e.subject} (${routines.find(r=>r.entries.includes(e)).className})`)
        .join(", ");
      row[time] = entry || "";
    });
    return row;
  });

  // CSV Download function
  const downloadCSV = () => {
    let csvContent = ["Day," + times.join(",")];
    tableData.forEach((row) => {
      csvContent.push([row.day, ...times.map((t) => `"${row[t]}"`)].join(","));
    });
    const blob = new Blob([csvContent.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "routine.csv");
    link.click();
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl mb-4">Class Routine</h2>

      {routines.length === 0 ? (
        <p>No routine available.</p>
      ) : (
        <>
          <button
            onClick={downloadCSV}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download as CSV
          </button>

          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Day</th>
                {times.map((time) => (
                  <th key={time} className="border px-4 py-2">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">{row.day}</td>
                  {times.map((time) => (
                    <td key={time} className="border px-4 py-2">{row[time]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
