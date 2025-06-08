import React from "react";
import { RxSlash } from "react-icons/rx";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Auth/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user,logoutUser } = useAuth();
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
            <NavLink to={"/addblogs"}>Add Blogs</NavLink>
          </li>
          <li>
            <NavLink to={"/wishlist"}>Wishlist</NavLink>
          </li>
        </>
      ) }
    </>
  );

  const handleLogOut = () =>{
    logoutUser()
    Swal.fire("You’ve been logged out");
  }


  return (
    <>
      <div className="bg-[#2563EB] shadow-sm">
        <div className="navbar w-9/12 mx-auto text-white font-main">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-[#2563EB]  rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navOption}
              </ul>
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co/39cR051g/blogbox3.png"
                alt="logo"
                className="h-10"
              />
              <h1 className="text-2xl">BlogBox</h1>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-xl">{navOption}</ul>
          </div>

          <div className="navbar-end flex items-center gap-2 text-xl text-white">
            {user ? (
              <div className="flex items-center gap-2  rounded-4xl">
                <div className="avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
                <button onClick={handleLogOut} className="btn bg-red-500 border-0 text-white border-none rounded-2xl">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/auth/login"
                  className="transition-all duration-300 hover:text-yellow-300 hover:underline underline-offset-4"
                >
                  Sign In
                </Link>
               
                <Link
                  to="/auth/register"
                  className="transition-all duration-300 hover:text-yellow-300 hover:underline underline-offset-4"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
