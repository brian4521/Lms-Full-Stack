import React from "react";
import { Link, useLocation } from "react-router-dom";
import user_icon from "../../assets/user_icon.svg";
import { UserButton, useClerk, useUser } from "@clerk/react";

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-50"
      }`}
    >
      <img src="" alt="Logo" className="w-28 lg:w-32 cursor-pointer" />

      {/* desktop */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button>Become Tutor</button>
              <Link to={"/my-enrollment"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
          >
            Create account
          </button>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div>
          {user && (
            <>
              <button>Become Tutor</button>
              <Link to={"/my-enrollment"}>My Enrollments</Link>
            </>
          )}
        </div>

        <button>
          <img src={user_icon} alt="profile" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
