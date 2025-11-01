import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ExamRoutine({ token }) {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    async function fetchRoutine() {
      const data = await api.getExamRoutine(); // implement this in your API service
      setRoutine(data);
    }
    fetchRoutine();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Exam Routine</h2>
      {routine.length === 0 ? (
        <p>No exam routine available.</p>
      ) : (
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {routine.map((item, i) => (
              <tr key={i}>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.subject}</td>
                <td>{item.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
