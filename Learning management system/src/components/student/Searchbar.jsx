import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setinput] = useState(data ? data : "");

  const onsearchHandle = (e) => {
    e.preventDefault();
    console.log(input);
    navigate("/course-list/" + input);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={onsearchHandle}
        className="max-w-xl w-full flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden"
      >
        {/* icon */}
        <div className="px-4 text-gray-400">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        {/* input */}
        <input
          onChange={(e) => setinput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for anything..."
          className="flex-1 h-12 md:h-14 outline-none text-gray-600"
        />

        {/* button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 md:px-8 py-2 md:py-3 m-1 rounded-full"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
