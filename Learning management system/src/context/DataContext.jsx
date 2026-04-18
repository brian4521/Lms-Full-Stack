import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allcourseslist, setallcourseslist] = useState([]);
  console.log("this is course list", allcourseslist);

  const fetchcourse = async () => {
    setallcourseslist(dummyCourses);
  };

  useEffect(() => {
    fetchcourse();
  }, []);

  const value = {
    currency,
    allcourseslist,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
