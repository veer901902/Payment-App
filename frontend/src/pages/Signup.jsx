import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [fn, sfn] = useState("");
  const [ln, sln] = useState("");
  const [em, sem] = useState("");
  const [pwd, spwd] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const obj = { firstName: fn, lastName: ln, username: em, password: pwd };
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      localStorage.setItem("token", "Bearer "+res.data.token);
      sfn("");
      sln("");
      sem("");
      spwd("");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center bg-slate-300 h-[92vh]">
      <div className="flex flex-col bg-white p-6 rounded-md max-w-[300px]">
        <div className="flex flex-col mb-4 items-center">
          <div className="font-bold text-2xl mb-1">SignUp</div>
          <div className="text-gray-500">
            Enter your information to create an account
          </div>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="font-semibold">First Name</label>
          <input
            className="rounded-md h-8 border-slate-300 border-2 max-w-60 my-1 p-1"
            placeholder="Enter your first name"
            onChange={(e) => sfn((prev) => e.target.value)}
            value={fn}
          ></input>
          <label className="font-semibold">Last Name</label>
          <input
            className="rounded-md h-8 border-slate-300 border-2 max-w-60 my-1 p-1"
            placeholder="Enter your last name"
            onChange={(e) => sln((prev) => e.target.value)}
            value={ln}
          ></input>
          <label className="font-semibold">Email</label>
          <input
            className="rounded-md h-8 border-slate-300 border-2 max-w-60 my-1 p-1"
            placeholder="Enter your email ( min 3 char)"
            type="email"
            onChange={(e) => sem((prev) => e.target.value)}
            value={em}
          ></input>
          <label className="font-semibold">Password</label>
          <input
            className="rounded-md h-8 border-slate-300 border-2 max-w-60 my-1 p-1"
            placeholder="Enter your Password(min 6 char)"
            type="password"
            onChange={(e) => spwd((prev) => e.target.value)}
            value={pwd}
          ></input>
          <button
            className="bg-black rounded-md text-white max-w-60 p-1 mt-2"
            type="submit"
          >
            SignUp
          </button>
        </form>
        <div className="flex mt-3">
          <div className="font-medium text-sm">Already have an account?</div>
          <Link to="/signin" className="font-medium text-sm underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
