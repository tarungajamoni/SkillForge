import React, { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleClick = async () => {
    try {
      const response = await api.post("/auth/register", { username, email, password });
      if (response) alert("registration successful");
    } catch (e) {
      alert("registration failed");
    }
  };
  return (
    <>
    <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Register</button>
    </>
  );
};

export default Register;
