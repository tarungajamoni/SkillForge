import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useNavigate();

  const handleClick = async () => {
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      if (response) alert("registration successful");
    } catch (e) {
      alert("registration failed");
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
          <span className="text-left">Username</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 border border-gray-300 bg-gray-50 rounded-md px-2"
            placeholder="Enter Email"
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
          Register
        </button>
        <span
          className="underline cursor-pointer text-gray-600"
          onClick={() => router("/login")}>
          Already a User? Click here to Login
        </span>
      </div>
    </div>
  );
};

export default Register;
