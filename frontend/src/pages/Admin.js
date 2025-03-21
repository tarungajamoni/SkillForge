import React, { useState, useEffect } from "react";
import api from "../services/api";
import RunOperator from "../components/admin/common/RunOperator";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [modalData, setModalData] = useState({
    type: "",
    action: "",
    id: null,
  });
  const [enableCreateModule, setEnableCreateModule] = useState(false);
  const [enableCreateLesson, setEnableCreateLesson] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const response = await api.get("/courses");
    setCourses(response.data);
  };

  const getModules = async (courseId) => {
    if (courseId) {
      const response = await api.get(`/courses/${courseId}/modules`);
      setModules(response.data);
    } else {
      setModules([]); // Clear modules when no course is selected
    }
  };

  const getLessons = async (moduleId) => {
    if (moduleId) {
      const response = await api.get(`/courses/${moduleId}/lessons`);
      setLessons(response.data);
    } else {
      setLessons([]); // Clear lessons when no module is selected
    }
  };

  const handleCourseClick = (id) => {
    setCurrentCourseId(id);
    getModules(id);
    setEnableCreateModule(true);
    setCurrentModuleId(null); // Reset module selection
    setEnableCreateLesson(false); // Reset lesson creation
    setLessons([]); // Clear lessons when a new course is selected
  };

  const handleModuleClick = (id) => {
    setCurrentModuleId(id);
    getLessons(id);
    setEnableCreateLesson(true);
  };

  const openModal = (type, action, id = null) => {
    setModalData({ type, action, id });
    setFormData({ title: "", description: "" });
  };

  const handleSubmit = async () => {
    const { type, action, id } = modalData;
    let endpoint = "";
    let payload = formData;

    if (type === "course") {
      endpoint = action === "create" ? "/courses" : `/courses/${id}`;
    } else if (type === "module") {
      endpoint =
        action === "create"
          ? `/courses/${currentCourseId}/modules`
          : `/courses/modules/${id}`;
    } else if (type === "lesson") {
      endpoint =
        action === "create"
          ? `/courses/${currentModuleId}/lessons`
          : `/courses/lessons/${id}`;
    }

    if (action === "create") {
      await api.post(endpoint, payload);
    } else {
      await api.put(endpoint, payload);
    }

    setModalData({ type: "", action: "", id: null });
    getCourses();
    if (currentCourseId) {
      // Check if currentCourseId exists
      getModules(currentCourseId);
    }
    if (currentModuleId) {
      // Check if currentModuleId exists
      getLessons(currentModuleId);
    }
  };

  const handleDelete = async (type, id) => {
    let endpoint = "";
    if (type === "course") endpoint = `/courses/${id}`;
    else if (type === "module") endpoint = `/courses/modules/${id}`;
    else if (type === "lesson") endpoint = `/courses/lessons/${id}`;

    await api.delete(endpoint);
    getCourses();
    if (currentCourseId) {
      // Check if currentCourseId exists
      getModules(currentCourseId);
    }
    if (currentModuleId) {
      // Check if currentModuleId exists
      getLessons(currentModuleId);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <button
        onClick={() => openModal("course", "create")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4">
        + Add Course
      </button>

      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white p-4 rounded-lg shadow-md mb-3 cursor-pointer flex justify-between items-center"
          onClick={() => handleCourseClick(course.id)}>
          <span className="text-lg font-semibold">{course.title}</span>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal("course", "edit", course.id);
              }}
              className="text-yellow-500">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete("course", course.id);
              }}
              className="text-red-500">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {enableCreateModule && (
        <button
          onClick={() => openModal("module", "create")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
          + Add Module
        </button>
      )}

      {modules.map((module) => (
        <div
          key={module.id}
          className="bg-gray-200 p-3 rounded-lg shadow-md mb-3 ml-6 cursor-pointer flex justify-between items-center"
          onClick={() => handleModuleClick(module.id)}>
          <span className="text-md font-medium">{module.title}</span>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal("module", "edit", module.id);
              }}
              className="text-yellow-500">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete("module", module.id);
              }}
              className="text-red-500">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {enableCreateLesson && (
        <button
          onClick={() => openModal("lesson", "create")}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg mb-4">
          + Add Lesson
        </button>
      )}

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="bg-gray-300 p-3 rounded-lg shadow-md mb-3 ml-12 flex justify-between items-center">
          <span className="text-sm">{lesson.title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => openModal("lesson", "edit", lesson.id)}
              className="text-yellow-500">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDelete("lesson", lesson.id)}
              className="text-red-500">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {modalData.type && (
        <RunOperator
          title={modalData.action === "create" ? "Create" : "Edit"}
          type={modalData.type}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Admin;
