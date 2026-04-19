import React from "react";
import Hero from "../../components/student/Hero";
import Company from "../../components/student/Company";
import CourseList from "../../components/student/CourseList";
import Testimonials from "../../components/student/Testimonials";
import CallToAction from "../../components/student/CallToAction";

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center ">
      <Hero />
      <Company />
      <CourseList />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
