import React from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = function () {
  const navigate = useNavigate();

  // Get user details from localStorage or API
  const userNameOrEmail = localStorage.getItem("userEmail") || "User Name";

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token
    localStorage.removeItem("userEmail"); // Optional: Clear user info
    navigate("/signin"); // Redirect to login page
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo/Brand */}
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Task Manager
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
            onClick={() => navigate("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </button>

          <button
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
            onClick={() => navigate("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Projects</span>
          </button>

          <button
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
            onClick={() => navigate("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span>Tasks</span>
          </button>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm">{userNameOrEmail}</span>
          </div>

          <button
            className="flex items-center space-x-2 text-red-600 hover:bg-red-100 p-2 rounded"
            onClick={handleLogout}
          >
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
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
