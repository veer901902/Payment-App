import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Home({ isAuth, setIsAuth }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  function handleSignOut(e) {
    localStorage.removeItem("token");
    navigate("/signin");
    setIsAuth((prev) => false);
    console.log(isAuth);
  }

  const [showSignOut, setShowSignOut] = useState(false);
  if (!isAuth) {
    return (
      <>
        <div className="flex justify-between items-center p-4 bg-slate-700 shadow-md h-[60px]">
          <div className="text-lg font-semibold text-white">Paytm App</div>
          <div className="flex justify-end grow max-w-[300px] m-14">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-normal ${
                  isActive ? "text-blue-700" : "text-black"
                } m-1 p-1 bg-black text-white rounded-md hover:bg-gray-800 hover:text-slate-300`
              }
            >
              Signup
            </NavLink>

            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `font-normal ${
                  isActive ? "text-blue-700" : "text-black"
                } flex items-center m-1 p-1 bg-black text-white rounded-md hover:bg-gray-800 hover:text-slate-300`
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-slate-700 shadow-md">
        <div className="text-lg font-semibold text-white flex">
          <div className="m-1">PaytmApp</div>
          <Link className="m-1" to="/dashboard" >Dashboard</Link>
        </div>
        <div className="relative">
          <button
            className="flex items-center justify-center w-12 h-12 text-gray-800 rounded-full cursor-pointer bg-gray-300 focus:outline-none"
            onClick={() => setShowSignOut(!showSignOut)}
          >
            <span className="block">U</span>
          </button>
          {showSignOut && (
            <div className="absolute top-full right-0 mt-2">
              <div className="bg-white rounded-lg shadow-md text-white">
                <div className="py-2">
                  <button
                    onClick={handleSignOut}
                    className="font-normal w-[70px] text-sm flex items-center m-1 p-1 bg-black text-white rounded-md hover:bg-gray-800 hover:text-slate-300 focus:outline-none"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
