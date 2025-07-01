import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Auth/useAuth";
import Swal from "sweetalert2";
import { CiDark, CiLight } from "react-icons/ci";

const NavBar = ({ isDark, toggleDarkMode }) => {
  const { user, logoutUser, loading } = useAuth();

  const handleLogOut = () => {
    logoutUser();
    Swal.fire("You’ve been logged out");
  };

  const navOption = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/allblogs"}>All Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/featuredblogs"}>Featured Blogs</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/addblog"}>Add Blog</NavLink>
          </li>
          <li>
            <NavLink to={"/wishlist"}>Wishlist</NavLink>
          </li>
        </>
      )}
    </>
  );

  // Define bg/text colors based on isDark prop, no tailwind dark variant used
  const bgColor = isDark ? "bg-gray-900" : "bg-[#2563EB]";
  const menuBgColor = isDark ? "bg-gray-800" : "bg-[#2563EB]";
  const textColor = "text-white"; // You can make this conditional too if you want

  return (
    <div className={`${bgColor} sticky top-0 z-50 shadow-sm transition-colors duration-300`}>
      <div className={`navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${textColor} font-main`}>
        {/* Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 p-2 shadow ${menuBgColor} rounded-box w-52 z-10`}
            >
              {navOption}
              <li>  <button
            onClick={toggleDarkMode}
            className=" btn-sm  border-0  sm:inline-block text-white text-xl"
          >
            {isDark ?  <CiDark />  : <CiLight />}
          </button></li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.ibb.co/39cR051g/blogbox3.png"
              alt="logo"
              className="h-10"
            />
            <h1 className="text-xl sm:text-2xl">BlogBox</h1>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg md:text-xl">{navOption}</ul>
        </div>

        {/* Right Side: Auth + Dark Toggle */}
        <div className="navbar-end flex items-center gap-3 text-base sm:text-lg md:text-xl">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className=" btn-sm  border-0 hidden sm:inline-block text-white text-2xl"
          >
            {isDark ?  <CiDark />  : <CiLight />}
          </button>

          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <div className="flex items-center gap-2">
              <div
                className="avatar tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default.png"} alt="User Avatar" />
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="btn bg-red-500 border-0 text-white rounded-2xl text-sm sm:text-base"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/auth/login"
                className="hover:text-yellow-300 hover:underline underline-offset-4"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="hover:text-yellow-300 hover:underline underline-offset-4"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
