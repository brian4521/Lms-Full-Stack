import React from "react";
import rating_star from "../../assets/rating_star.svg";

const CourseCard = ({ course }) => {
  return (
    <div>
      <img src={course.courseThumbnail} alt="" />
      <div>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div>
          <p>4.5</p>
          <div>
            {[...Array(5)].map((_, i) => {
              <img key={i} src={rating_star} />;
            })}
          </div>
          <p>25</p>
        </div>
        <p>
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
