import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, Outlet, json } from "react-router-dom";
import Logo from "../imgs/dev-notes-logo.png";
import { UserContext } from "../App";
import { lookInSession } from "../common/session";
import UserDropDown from "./UserDropDown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { userAuth, setUserAuth } = useContext(UserContext);
  const { access_token, profile_img } = userAuth;

  useEffect(() => {
    if (!access_token) {
      const sessionData = lookInSession("user");
      if (sessionData) {
        setUserAuth(JSON.parse(sessionData));
      }
    }
  }, [access_token, setUserAuth]);

  console.log(access_token, "img url :", profile_img);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <nav className="nav-area relative bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-3 mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="navbar-left flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/">
                  <img className="w-auto h-6 sm:h-7" src={Logo} alt="" />
                </Link>

                {/* Search input on desktop screen */}
                <div className="hidden mx-10 md:block">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        style={{ color: "#ccc" }}
                        className="w-5 h-5 text-gray-200"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>

                    <input
                      style={{ border: "1px solid #ccc" }}
                      type="text"
                      className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu open: "block", Menu closed: "hidden" */}
            <div
              className={`navbar-right absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white top-24 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col items-center md:flex-row md:mx-1">
                <Link
                  style={{ color: "#a5a3a3" }}
                  className="my-2 text-sm leading-5 text-slate-50 md:mx-4 md:my-0"
                  to="/write"
                >
                  <i className="fi fi-rr-file-edit"></i>

                  <span className="mx-1">Write</span>
                </Link>
                {access_token === null ? (
                  <>
                    <Link
                      className="my-2 leading-5 text-white rounded-lg bg-black p-2 px-3  md:mx-4 md:my-0"
                      to="/signin"
                    >
                      Sign in
                    </Link>

                    <Link
                      style={{ backgroundColor: "#ccc" }}
                      className="my-2 leading-5 text-gray rounded-lg bg-slate-500 p-2 md:mx-4 md:my-0"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <div className="user-area flex justify-center items-center ">
                    <Link to="/dashboard/notification">
                      <button className="bell-icon w-8 h-8 rounded-full flex justify-center items-center mx-2">
                        <i className="fi fi-rs-bell"></i>
                      </button>
                    </Link>
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        onBlur={handleBlur}
                        className="profile-btn relative z-10 block rounded-full bg-gray p-1 focus:outline-none"
                      >
                        <img src={profile_img} alt="" width="50px" />
                      </button>

                      {/* {dropdownOpen && (
                        <div
                          onClick={closeDropdown}
                          className="fixed inset-0 h-full w-full z-10"
                        ></div>
                      )} */}

                      {dropdownOpen && (
                        <UserDropDown
                          username={userAuth.username}
                          setUserAuth={setUserAuth}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Search input on mobile screen */}
              <div className="my-4 md:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      style={{ color: "#ccc" }}
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <input
                    style={{ border: "1px solid #ccc" }}
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border  rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
