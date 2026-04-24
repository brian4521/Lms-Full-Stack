import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { assets } from "../../assets/assets";

const Enrollments = () => {
  const { enrolledCourses, calculateCourseTime } = useContext(DataContext);
  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <center>
          <h1 className="text-2xl font-semibold">My Enrollments</h1>
        </center>

        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => {
              return (
                <tr key={index} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt="course_Thumbnail"
                      className="w-14 sm:w-24 md:w-28"
                    />
                    <div className="flex-1 ">
                      <p className="mb-1 max-sm:text-sm">
                        {course.courseTitle}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {calculateCourseTime(course)}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    4 / 10 <span>Lectures</span>
                  </td>
                  <td className="px-4 py-3 max-sm:text-right">
                    <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
                      On going
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Enrollments;
