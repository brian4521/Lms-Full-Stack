import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import down_arrow_icon from "../../assets/down_arrow_icon.svg";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(DataContext);

  const { courseId } = useParams();
  const [filteredCourseDetails, setfilteredCourseDetails] = useState(null);
  const [onoffsection, setonoffsection] = useState({});

  const [playerData, setplayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setfilteredCourseDetails(course);
      }
    });
  };

  const toggleSection = (index) => {
    setonoffsection((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold"> Course Structure</h2>
          <div className="pt-5">
            {filteredCourseDetails &&
              filteredCourseDetails.courseContent?.map((chapter, index) => (
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
                            src={
                              false ? assets.blue_tick_icon : assets.play_icon
                            }
                            alt="play_icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2 ">
                              {lecture.lectureUrl && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setplayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                >
                                  Watch
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

        {/* right column */}
        <div>
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
              <div>
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button>Mark Complete</button>
              </div>
            </div>
          ) : (
            <img
              src={
                filteredCourseDetails
                  ? filteredCourseDetails.courseThumbnail
                  : ""
              }
              alt=""
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
