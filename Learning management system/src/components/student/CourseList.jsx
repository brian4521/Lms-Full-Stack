import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const { allcourseslist } = useContext(DataContext);

  console.log("here are the courses list", allcourseslist);
  return (
    <div className="py-20 px-6 md:px-40 flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Learn from the experts
      </h2>

      <p className="text-sm md:text-base text-gray-500 mt-4 max-w-2xl leading-relaxed">
        Choose from high-quality courses built to make learning simple and
        effective. Stay focused, track your progress, and move closer to your
        goals every day.
      </p>
      <div className="grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allcourseslist.slice(0, 4).map((courses, index) => {
          return <CourseCard key={index} course={courses} />;
        })}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="mt-6 inline-block text-gray-600 border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-800 hover:text-white transition duration-300"
      >
        Explore all courses
      </Link>
    </div>
  );
};

export default CourseList;
