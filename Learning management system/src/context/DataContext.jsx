import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allcourseslist, setallcourseslist] = useState([]);
  const [isEducator, setisEducator] = useState(true);
  const [enrolledCourses, setenrolledCourses] = useState([]);

  console.log("this is course list", allcourseslist);

  const fetchcourse = async () => {
    setallcourseslist(dummyCourses);
  };

  //calculate average ratings of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // calculate  course chapter timing

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // calculate course time
  const calculateCourseTime = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //calculate no. of lectures in the course

  const calculateNoofLecture = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  //get student enrolled courses

  const getUserEnrolledCourses = async () => {
    setenrolledCourses(dummyCourses);
  };

  useEffect(() => {
    fetchcourse();
    getUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allcourseslist,
    calculateRating,
    isEducator,
    setisEducator,
    calculateChapterTime,
    calculateCourseTime,
    calculateNoofLecture,
    enrolledCourses,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
