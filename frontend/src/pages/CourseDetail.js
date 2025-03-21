import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const CourseDetail = () => {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState({});
  const [loadingLessons, setLoadingLessons] = useState({});

  useEffect(() => {
    // Fetch Modules
    api.get(`/courses/${id}/modules`).then((response) => {
      setModules(response.data);
    });
  }, [id]);

  const fetchLessons = async (moduleId) => {
    if (lessons[moduleId]) return; // Avoid re-fetching

    setLoadingLessons((prev) => ({ ...prev, [moduleId]: true }));

    try {
      const response = await api.get(`/courses/${id}/lessons?moduleId=${moduleId}`);
      setLessons((prev) => ({ ...prev, [moduleId]: response.data }));
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoadingLessons((prev) => ({ ...prev, [moduleId]: false }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Course Modules</h1>

      {modules.length === 0 ? (
        <p className="text-center text-gray-600">No modules available.</p>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => (
            <Disclosure key={module.id}>
              {({ open }) => (
                <div className="border border-gray-300 rounded-lg shadow-lg">
                  <Disclosure.Button
                    className="flex justify-between items-center w-full p-4 bg-gray-100 text-left text-xl font-semibold hover:bg-gray-200 transition"
                    onClick={() => fetchLessons(module.id)}
                  >
                    {module.title}
                    <ChevronUpIcon
                      className={`w-6 h-6 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="p-4 bg-white">
                    {loadingLessons[module.id] ? (
                      <p className="text-gray-500">Loading lessons...</p>
                    ) : (
                      <ul className="space-y-2">
                        {lessons[module.id]?.length > 0 ? (
                          lessons[module.id].map((lesson) => (
                            <li key={lesson.id} className="p-3 bg-gray-50 rounded-lg">
                              {lesson.title}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500">No lessons available.</p>
                        )}
                      </ul>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
