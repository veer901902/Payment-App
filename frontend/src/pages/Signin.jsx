import React, { useState , useEffect, useContext} from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../ContexApi/util";

export default function Signin() {
    const [em, sem] = useState("");
    const [pwd, spwd] = useState("");
    const navigate = useNavigate();

    const {token, setToken} = useContext(MyContext);

    useEffect(()=>{
        const data = localStorage.getItem('token');
        data ? setToken(data) : "";
    }, [token])

    async function handleSubmit(e){
        e.preventDefault();
        const obj = {username: em, password: pwd};
        try{
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", obj);
        
            console.log(res.data);
            sem(""); spwd("");
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        }
        catch(err){
            console.log(err);
        }
       
    }

  return (
    <div className="flex justify-center items-center bg-slate-300 h-[92vh]">
      <div className="flex flex-col bg-white p-6 rounded-md max-w-[300px]">
        <div className="flex flex-col mb-4 items-center">
          <div className="font-bold text-2xl mb-1">SignIn</div>
          <div className="text-gray-500">
            Enter your credentials to access your account
          </div>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
            SignIn
          </button>
        </form>
        <div className="flex mt-3">
          <div className="font-medium text-sm">Don't have an account</div>
          <Link to="/signup" className="font-medium text-sm underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
