import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Loading from "../../components/student/Loading";
import rating_star from "../../assets/rating_star.svg";
import down_arrow_icon from "../../assets/down_arrow_icon.svg";
import star_dull_icon from "../../assets/star_dull_icon.svg";
import play_icon from "../../assets/play_icon.svg";
import time_clock_icon from "../../assets/time_clock_icon.svg";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  // remember use id not _id

  const { id } = useParams();

  const [filteredCourseDetails, setfilteredCourseDetails] = useState(null);

  const [onoffsection, setonoffsection] = useState({});
  const [isAlreadyEnrolled, setisAlreadyEnrolled] = useState(false);
  const [playerData, setplayerData] = useState(null);

  const {
    allcourseslist,
    calculateRating,
    calculateChapterTime,
    calculateCourseTime,
    calculateNoofLecture,
    currency,
  } = useContext(DataContext);

  const fetchCourseData = async () => {
    const foundcourseData = allcourseslist.find((course) => course._id == id);
    setfilteredCourseDetails(foundcourseData);
  };

  const toggleSection = (index) => {
    setonoffsection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allcourseslist]);

  return filteredCourseDetails ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-2. text-left ">
        <div className="absolute top-0 left-0 w-full -z-1 bg-gradient-to-b from-cyan-100/70"></div>
        {/* left side */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="font-semibold text-gray-800 text-3xl">
            {filteredCourseDetails.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: filteredCourseDetails.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* reviews rating */}

          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(filteredCourseDetails)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                return (
                  <img
                    key={i}
                    src={
                      i < Math.floor(calculateRating(filteredCourseDetails))
                        ? rating_star
                        : star_dull_icon
                    }
                    className="w-3.5 h-3.5"
                  />
                );
              })}
            </div>
            <p className="text-blue-600">
              ({filteredCourseDetails.courseRatings.length}{" "}
              {filteredCourseDetails.courseRatings.length > 1
                ? "ratings"
                : "rating"}
              )
            </p>
            <p>
              {filteredCourseDetails.enrolledStudents.length}

              {filteredCourseDetails.enrolledStudents.length > 1
                ? "(students)"
                : "(student)"}
            </p>
          </div>
          <p className="">
            Course by{" "}
            <span className="text-blue-600 underline">skillBridge</span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Format</h2>
            <div className="pt-5">
              {filteredCourseDetails.courseContent?.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${onoffsection[index] ? "rotate-180" : ""}`}
                        src={down_arrow_icon}
                        alt="arrow_icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p>
                      {chapter.chapterContent.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300  ${onoffsection[index] ? "max-h-96" : "max-h-0"}`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, idx) => (
                        <li key={index} className="flex items-start gap-2 py-1">
                          <img
                            src={play_icon}
                            alt="play_icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2 ">
                              {lecture.isPreviewFree && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setplayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] },
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800 ">
              Course Description
            </h3>
            <p
              className="pt-3 "
              dangerouslySetInnerHTML={{
                __html: filteredCourseDetails.courseDescription,
              }}
            ></p>
          </div>
        </div>
        {/* ^^^^^^^^^^^^^^^^^^^  how to avoid displaying tag name*/}
        {/* right side */}
        <div className="z-10 rounded-t md:rounded-none overflow-hidden shadow px-5 py-8 bg-white min-w-[300px] sm:min-w-[420]">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
            />
          ) : (
            <img src={filteredCourseDetails.courseThumbnail} alt="" />
          )}

          <div className="pt-5 ">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={time_clock_icon}
                alt="time_clock_icon"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days </span>left hurry up!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}{" "}
                {(
                  filteredCourseDetails.coursePrice -
                  (filteredCourseDetails.discount *
                    filteredCourseDetails.coursePrice) /
                    100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {filteredCourseDetails.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {filteredCourseDetails.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex ite gap-1">
                <img src={rating_star} alt="rating_star" />
                <p>{calculateRating(filteredCourseDetails)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex ite gap-1">
                <img src={time_clock_icon} alt="rtime_clock_icon" />
                <p>{calculateCourseTime(filteredCourseDetails)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex ite gap-1">
                <img src={time_clock_icon} alt="rtime_clock_icon" />
                <p>{calculateNoofLecture(filteredCourseDetails)} Lecture</p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="pt-6 ">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                whats you will get?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Step by step lessons designed for easy understanding</li>
                <li>Real world projects to build practical skills</li>
                <li>Clear explanations that make complex topics simple</li>
                <li>Progress tracking to stay consistent and motivated</li>
                <li>Skills you can apply immediately in real situations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
