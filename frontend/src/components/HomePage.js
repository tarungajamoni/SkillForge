import React, { useEffect, useState } from "react";
import api from "../services/api";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api.get("/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-left text-2xl font-semibold">Find Your Roadmap</div>
      <input
        type="text"
        placeholder="Search Course"
        className="w-5/6 border border-green-800 shadow-lg rounded-3xl h-12 px-5 my-5"
      />
      {courses?.map((m) => (
        <div className="flex flex-row">{m.title}</div>
      ))}
    </div>
  );
};

export default HomePage;
