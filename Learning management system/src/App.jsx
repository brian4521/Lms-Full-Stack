import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CourseLists from "./pages/student/CourseLists";
import CourseDetails from "./pages/student/CourseDetails";
import Enrollments from "./pages/student/Enrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/tutor/Educator";
import Dashboard from "./pages/tutor/Dashboard";
import AddCourse from "./pages/tutor/AddCourse";
import MyCourses from "./pages/tutor/MyCourses";
import StudentEnrolled from "./pages/tutor/StudentEnrolled";
import Navbar from "./components/student/Navbar";

const App = () => {
  const isEducatorUrl = useMatch("/educator/*");
  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorUrl && <Navbar></Navbar>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseLists />} />
        //filter based on keyword
        <Route path="/course-list/:input" element={<CourseLists />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollment" element={<Enrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        //Tutor route
        <Route path="/educator" element={<Educator />}>
          <Route path="educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrollment" element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
