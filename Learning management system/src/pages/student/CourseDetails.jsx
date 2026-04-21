import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Loading from "../../components/student/Loading";
import rating_star from "../../assets/rating_star.svg";
import down_arrow_icon from "../../assets/down_arrow_icon.svg";
import star_dull_icon from "../../assets/star_dull_icon.svg";
import play_icon from "../../assets/play_icon.svg";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  // remember use id not _id

  const { id } = useParams();

  const [filteredCourseDetails, setfilteredCourseDetails] = useState(null);

  const {
    allcourseslist,
    calculateRating,
    calculateChapterTime,
    calculateCourseTime,
    calculateNoofLecture,
  } = useContext(DataContext);

  const fetchCourseData = async () => {
    const foundcourseData = allcourseslist.find((course) => course._id == id);
    setfilteredCourseDetails(foundcourseData);
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
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <img src={down_arrow_icon} alt="arrow_icon" />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p>
                      {chapter.chapterContent.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div>
                    <ul>
                      {chapter.chapterContent.map((lecture, idx) => (
                        <li key={index}>
                          <img src={play_icon} alt="play_icon" />
                          <div>
                            <p>{lecture.lectureTitle}</p>
                            <div>
                              {lecture.isPreviewFree && <p>Preview</p>}
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
        </div>
        {/* ^^^^^^^^^^^^^^^^^^^  how to avoid displaying tag name*/}
        {/* right side */}
        <div></div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
