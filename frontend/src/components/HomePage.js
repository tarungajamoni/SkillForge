import React, { useEffect, useState } from "react";
import api from "../services/api";

const HomePage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.get("/").then((response) => {
      setMessage(response.data.message);
    });
  }, []);

  return <div>{message}</div>;
};

export default HomePage;
