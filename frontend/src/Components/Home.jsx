import React, { useEffect } from "react";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MyContext } from "../ContexApi/util";

export default function Home() {
  const {token} = useContext(MyContext);
  // console.log(token);

  // const token = localStorage.getItem("token");

  if (!token) {
    return (
      <>
        <nav className="bg-slate-400 h-[8vh] flex items-center justify-between">
          <div className=" font-medium max-w-15 grow overflow-hidden text-gray-950">
            MyPaymentsApp
          </div>
          <div className="flex justify-end grow max-w-[300px] m-14">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-normal ${
                  isActive ? "text-blue-700" : "text-black"
                } m-1 p-1 bg-black text-white rounded-md hover:bg-gray-600 hover:text-black`
              }
            >
              Signup
            </NavLink>

            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `font-normal ${
                  isActive ? "text-blue-700" : "text-black"
                } flex items-center m-1 p-1 bg-black text-white rounded-md hover:bg-gray-600 hover:text-black`
              }
            >
              Login
            </NavLink>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="bg-gray-400 h-[8vh] flex items-center justify-around">
        <div className="text-black font-medium">MyPaymentsApp</div>
        <div className="flex justify-around grow max-w-[370px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-700" : "text-black"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-700" : "text-black"}`
            }
          >
            Signup
          </NavLink>

          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-700" : "text-black"}`
            }
          >
            Signin
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-700" : "text-black"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/send"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-blue-700" : "text-black"}`
            }
          >
            SendMoney
          </NavLink>
        </div>
      </nav>
    </>
  );
}
