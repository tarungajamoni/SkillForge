import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();

  const handleClick = async () => {
    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      alert("login successful");
    } catch (e) {
      alert("Login failed");
    }
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 ">
      <div className="bg-green-100 p-10 rounded-lg flex flex-col gap-2">
        <div className="flex flex-col ">
          <span className="text-left">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-8 border border-gray-300 bg-gray-50 rounded-md px-2"
            placeholder="Enter Username"
          />
        </div>
        <div className="flex flex-col ">
          <span className="text-left">Password</span>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-8 border border-gray-300 bg-gray-50 rounded-md px-2"
            placeholder="Enter Password"
          />
        </div>
        <button
          onClick={handleClick}
          className=" border border-gray-500 px-2 py-1 bg-violet-300 rounded-lg my-4 text-white hover:text-violet-700 hover:bg-white">
          Log In
        </button>
        <span
          className="underline cursor-pointer text-gray-600"
          onClick={() => router("/register")}>
          New User? Click here to Register
        </span>
      </div>
    </div>
  );
};

export default Login;
