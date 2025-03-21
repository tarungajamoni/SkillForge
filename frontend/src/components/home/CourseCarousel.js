import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CourseCarousel = ({ courses }) => {
  const navigate = useNavigate();
  const showSwiper = courses.length > 2;

  return (
    <div className="relative w-full max-w-5xl flex-1 flex items-center">
      {courses.length === 0 ? (
        <p className="text-center text-xl text-gray-700 mt-10">
          No courses found
        </p>
      ) : showSwiper ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          autoplay={{
            delay: 1500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          className="py-5">
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <div
                className="w-full h-52 bg-green-700 bg-opacity-80 text-white rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}>
                <h2 className="text-2xl font-semibold">{course.title}</h2>
                <p className="text-gray-300 line-clamp-3">
                  {course.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-full h-52 bg-green-700 bg-opacity-80 text-white rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/course/${course.id}`)}>
              <h2 className="text-2xl font-semibold">{course.title}</h2>
              <p className="text-gray-300 line-clamp-3">{course.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Style Swiper's Default Arrows */}
      <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            color: white !important; 
            background: rgb(21 128 61 / var(--tw-bg-opacity, 1)); 
            width: 40px;
            height: 52px; 
            border-radius: 5px;
            transition: background 0.3s ease;
          }
          
          .swiper-button-prev:hover, .swiper-button-next:hover {
            background: rgb(20 83 45 / var(--tw-bg-opacity, 1)); 
          }
        `}
      </style>
    </div>
  );
};

export default CourseCarousel;
