import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Login({ setToken, setRole }) {
  const [studentNo, setStudentNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await api.login(studentNo, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setToken(data.token);
      setRole(data.role);
      api.setToken(data.token);
      navigate("/");
      alert("Logged in as " + data.role);
    } catch (e) {
      alert("Login failed");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 transition-colors duration-700 px-4">
      <div className="card w-full max-w-md shadow-2xl backdrop-blur-md bg-white/90 rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6 drop-shadow">
          Login
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Student No
            </label>
            <input
              type="text"
              placeholder="e.g. 001 or admin"
              className="input input-bordered w-full bg-white focus:ring-2 focus:ring-yellow-300 focus:outline-none"
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="input input-bordered w-full pr-10 bg-white focus:ring-2 focus:ring-yellow-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500 hover:text-yellow-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-lg font-semibold text-white rounded-xl shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Tip: Students 001–100 use same password; admin/admin
        </p>
      </div>
    </div>
  );
}

