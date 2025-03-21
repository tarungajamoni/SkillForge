import { useEffect, useState } from "react";
import api from "../../services/api";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import CourseCarousel from "./CourseCarousel";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    api.get("/courses").then((response) => {
      setCourses(response.data);
      setFilteredCourses(response.data);
    });
  }, []);

  // 🔍 Search Filter
  useEffect(() => {
    let filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedCategory) {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }
    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, courses]);

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-900 p-8">
      <SearchBar onSearch={setSearchQuery} />
      <CategoryFilter
        categories={[
          "Web Dev",
          "Data Science",
          "AI & ML",
          "Cybersecurity",
          "Cloud",
        ]}
        activeCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <CourseCarousel courses={filteredCourses} />
    </div>
  );
};

export default HomePage;
