import React, { useState, useEffect } from "react";
import api from "../services/api";
import RunOperator from "../components/admin/common/RunOperator";

const Admin = () => {
  const [course, setCourse] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [editCourseTitle, setEditCourseTitle] = useState("");
  const [editCourseDescription, setEditCourseDescription] = useState("");
  const [editModuleTitle, setEditModuleTitle] = useState("");
  const [editModuleDescription, setEditModuleDescription] = useState("");
  const [editLessonTitle, setEditLessonTitle] = useState("");
  const [editLessonDescription, setEditLessonDescription] = useState("");
  const [isCreateCourse, setIsCreateCourse] = useState(false);
  const [isCreateModule, setIsCreateModule] = useState(false);
  const [isCreateLesson, setIsCreateLesson] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [isEditModule, setIsEditModule] = useState(false);
  const [isEditLesson, setIsEditLesson] = useState(false);
  const [enableCreateModule, setEnableCreateModule] = useState(false);
  const [enableCreateLesson, setEnableCreateLesson] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState("");
  const [currentModuleId, setCurrentModuleId] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState("");

  const createCourse = async () => {
    const response = await api.post("/courses", {
      title: courseTitle,
      description: courseDescription,
    });
    return response.data;
  };
  const createModule = async () => {
    const response = await api.post(`/courses/${currentCourseId}/modules`, {
      title: moduleTitle,
      description: moduleDescription,
    });
    return response.data;
  };
  const createLesson = async () => {
    const response = await api.post(`/courses/${currentModuleId}/lessons`, {
      title: lessonTitle,
      description: lessonDescription,
    });
    return response.data;
  };

  const editCourse = async () => {
    const response = await api.put(`/courses/${currentCourseId}`, {
      title: editCourseTitle,
      description: editCourseDescription,
    });
    return response.data;
  };
  const editModule = async () => {
    const response = await api.put(`/courses/modules/${currentModuleId}`, {
      title: editModuleTitle,
      description: editModuleDescription,
    });
    return response.data;
  };
  const editLesson = async (id) => {
    const response = await api.put(`/courses/lessons/${currentLessonId}`, {
      title: editLessonTitle,
      description: editLessonDescription,
    });
    return response.data;
  };

  const deleteCourse = async (id) => {
    const response = await api.delete(`/courses/${id}`, {
      title: courseTitle,
      description: courseDescription,
    });
    return response.data;
  };
  const deleteModule = async (id) => {
    const response = await api.delete(`/courses/modules/${id}`, {
      title: courseTitle,
      description: courseDescription,
    });
    return response.data;
  };
  const deleteLesson = async (id) => {
    const response = await api.delete(`/courses/lessons/${id}`, {
      title: courseTitle,
      description: courseDescription,
    });
    return response.data;
  };

  const getCourses = (id) => {
    api.get(`/courses`).then((response) => {
      setCourse(response.data);
    });
  };
  const getModules = (id) => {
    api.get(`/courses/${id}/modules`).then((response) => {
      setModules(response.data);
    });
  };
  const getLessons = (id) => {
    api.get(`/courses/${id}/lessons`).then((response) => {
      setLessons(response.data);
    });
  };

  const handleCourseClick = (id) => {
    setCurrentCourseId(id);
    getModules(id);
    setEnableCreateModule(true);
  };
  const handleModuleClick = (id) => {
    setCurrentModuleId(id);
    getLessons(id);
    setEnableCreateLesson(true);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <div onClick={() => setIsCreateCourse(true)}>Add a Course</div>
      {course?.map((m) => (
        <div className="flex gap-2" onClick={() => handleCourseClick(m.id)}>
          {m.title}{" "}
          <div
            onClick={() => {
              setIsEditCourse(true);
              setCurrentCourseId(m.id);
            }}>
            edit
          </div>
          <div onClick={() => deleteCourse(m.id)}> delete</div>
        </div>
      ))}
      {modules && (
        <>
          {enableCreateModule && (
            <div onClick={() => setIsCreateModule(true)}>Add a Module</div>
          )}
          {modules.map((m) => (
            <div
              className="flex gap-2 ml-2"
              onClick={() => handleModuleClick(m.id)}>
              {m.title}{" "}
              <div
                onClick={() => {
                  setIsEditModule(true);
                  setCurrentModuleId(m.id);
                }}>
                edit
              </div>
              <div onClick={() => deleteModule(m.id)}> delete</div>
            </div>
          ))}
        </>
      )}
      {lessons && (
        <>
          {enableCreateLesson && (
            <div onClick={() => setIsCreateLesson(true)}>Add a Lesson</div>
          )}
          {lessons.map((m) => (
            <div className="flex gap-2 ml-4">
              {m.title}
              <div
                onClick={() => {
                  setIsEditLesson(true);
                  setCurrentLessonId(m.id);
                }}>
                edit
              </div>
              <div onClick={() => deleteLesson(m.id)}> delete</div>
            </div>
          ))}
        </>
      )}
      {isCreateCourse && (
        <RunOperator
          titleValue={courseTitle}
          titleChange={setCourseTitle}
          descriptionValue={courseDescription}
          descriptionChange={setCourseDescription}
          run={createCourse}
        />
      )}
      {isCreateModule && (
        <RunOperator
          titleValue={moduleTitle}
          titleChange={setModuleTitle}
          descriptionValue={moduleDescription}
          descriptionChange={setModuleDescription}
          run={createModule}
        />
      )}
      {isCreateLesson && (
        <RunOperator
          titleValue={lessonTitle}
          titleChange={setLessonTitle}
          descriptionValue={lessonDescription}
          descriptionChange={setLessonDescription}
          run={createLesson}
        />
      )}
      {isEditCourse && (
        <RunOperator
          titleValue={editCourseTitle}
          titleChange={setEditCourseTitle}
          descriptionValue={editCourseDescription}
          descriptionChange={setEditCourseDescription}
          run={editCourse}
        />
      )}
      {isEditModule && (
        <RunOperator
          titleValue={editModuleTitle}
          titleChange={setEditModuleTitle}
          descriptionValue={editModuleDescription}
          descriptionChange={setEditModuleDescription}
          run={editModule}
        />
      )}
      {isEditLesson && (
        <RunOperator
          titleValue={editLessonTitle}
          titleChange={setEditLessonTitle}
          descriptionValue={editLessonDescription}
          descriptionChange={setEditLessonDescription}
          run={editLesson}
        />
      )}
    </div>
  );
};

export default Admin;
