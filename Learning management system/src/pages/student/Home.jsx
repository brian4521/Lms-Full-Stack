import React from "react";
import Hero from "../../components/student/Hero";
import Company from "../../components/student/Company";
import CourseList from "../../components/student/CourseList";

const Home = () => {
  return (
    <div>
      <Hero />
      <Company />
      <CourseList></CourseList>
    </div>
  );
};

export default Home;
