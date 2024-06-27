import React, { useContext } from "react";
import "./UserDropDown.scss";
import AnimationWrapper from "../common/AnimationWrapper";
import { Link } from "react-router-dom";
import { removeFromSession } from "../common/session";

const UserDropDown = ({ username, setUserAuth }) => {
  const handleSignOut = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <AnimationWrapper>
      <div className="user-dropdown absolute right-0 mt-2 pt-2 w-48 bg-white rounded-md shadow-xl z-20">
        <Link
          to={`/user/${username}`}
          className="dropdown-item block px-4 py-2 text-md capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/blogs"
          className="dropdown-item block px-4 py-2 text-md capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
        >
          Dashboard
        </Link>
        <Link
          to="/settings/edit-profile"
          className="dropdown-item block px-4 py-2 text-md capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
        >
          Settings
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          onClick={handleSignOut}
          className="dropdown-item w-full text-left block px-4 py-2 text-sm capitalize
          text-gray-700 hover:bg-blue-500 hover:text-white"
        >
          {" "}
          <h1 className="text-xl font-medium">Sign Out</h1>
          <p className="lowercase text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserDropDown;
