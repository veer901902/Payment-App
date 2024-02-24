import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Home from "../Components/Home";

export default function Layout({ isAuth, setIsAuth}) {
  // can't define isAuth here because Outlet is a component provided by React Router to render child routes.
  // Outlet does not accept props.
  return (
    <>
     {!isAuth && <Navigate to="/signin"></Navigate>}
      <Home isAuth={isAuth} setIsAuth={setIsAuth} />
      <Outlet />
    </>
  );
}
