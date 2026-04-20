import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Searchbar from "../../components/student/Searchbar";
import { DataContext } from "../../context/DataContext";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CourseLists = () => {
  const navigate = useNavigate();
  const { input } = useParams();
  const { allcourseslist } = useContext(DataContext);

  const [filteredCourseList, setfilteredCourseList] = useState([]);

  useEffect(() => {
    if (allcourseslist && allcourseslist.length > 0) {
      const tempCourses = allcourseslist.slice();

      input
        ? setfilteredCourseList(
            tempCourses.filter((item) =>
              item.courseTitle
                .toLowerCase()
                .includes(input.toLocaleLowerCase()),
            ),
          )
        : setfilteredCourseList(tempCourses);
    }
  }, [allcourseslist, input]);
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500 mt-3">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              /<span>Course List</span>
            </p>
          </div>
          <Searchbar data={input} />
        </div>
        {input && (
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-fit shadow-sm mt-3">
            <span className="text-sm text-gray-700 font-medium">{input}</span>

            <button
              onClick={() => navigate("/course-list")}
              className="flex items-center justify-center w-5 h-5 hover:bg-gray-200 rounded-full transition"
            >
              <img
                src={assets.cross_icon}
                alt="clear"
                className="w-3 h-3 object-contain"
              />
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourseList.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseLists;
