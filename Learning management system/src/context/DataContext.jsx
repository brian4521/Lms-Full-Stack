import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allcourseslist, setallcourseslist] = useState([]);
  const [isEducator, setisEducator] = useState(true);

  console.log("this is course list", allcourseslist);

  const fetchcourse = async () => {
    setallcourseslist(dummyCourses);
  };

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

  useEffect(() => {
    fetchcourse();
  }, []);

  const value = {
    currency,
    allcourseslist,
    calculateRating,
    isEducator,
    setisEducator,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
