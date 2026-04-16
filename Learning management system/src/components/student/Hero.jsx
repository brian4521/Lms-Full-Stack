import React from "react";
import Searchbar from "./Searchbar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-6 md:px-0 space-y-6 text-center bg-gradient-to-b from-yellow-100/70 to-white">
      <h1 className="md:text-home-heading-large text-home-heading-small font-bold text-gray-800 max-w-3xl mx-auto leading-tight text-3xl">
        Master new skills gain confidence and move closer to your
        <span className="text-blue-600"> goals every day</span>
      </h1>

      <p className="hidden md:block text-gray-500 max-w-2xl mx-auto text-lg">
        No distractions just pure learning. Build real skills stay motivated and
        create your path to success.
      </p>

      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        Build real skills stay motivated and grow at your own pace
      </p>
      <Searchbar />
    </div>
  );
};

export default Hero;
