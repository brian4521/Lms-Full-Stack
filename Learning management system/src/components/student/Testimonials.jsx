import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";
import rating_star from "../../assets/rating_star.svg";
import star_dull_icon from "../../assets/star_dull_icon.svg";

const Testimonials = () => {
  return (
    <div className="px-10">
      <div className="pb-16 px-6 md:px-0 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Testimonials
        </h2>

        <p className="md:text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
          See how learners are transforming their skills and achieving real
          results through our platform while building confidence staying
          consistent and unlocking new opportunities for their future
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {dummyTestimonial.map((testimonial, index) => {
            return (
              <div
                key={index}
                className="text-sm text-left border border-gray-200 pb-6 rounded-xl bg-white shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                {/* Top Section */}
                <div className="flex items-center gap-4 px-5 py-4 bg-gray-50">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => {
                      return (
                        <img
                          key={i}
                          className="h-5"
                          src={
                            i < Math.floor(testimonial.rating)
                              ? rating_star
                              : star_dull_icon
                          }
                          alt="star"
                        />
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {testimonial.feedback}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-5">
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
