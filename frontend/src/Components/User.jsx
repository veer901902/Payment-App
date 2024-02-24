import React from "react";
import { useNavigate } from "react-router-dom";

export default function User({ user }) {
    const navigate = useNavigate();
  return (
    <div className="flex h-10 justify-evenly items-center my-2">
      <div className="flex grow items-center my-2 h-full">
        <div className="flex items-center justify-center text-center grow mr-1 max-w-[40px] h-full rounded-full bg-slate-300">
          {user.firstName[0]}
        </div>
        <div className="font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/send?id="+user._id+"&name="+user.firstName);
        }}
        className="bg-black grow h-8 rounded-md mr-4 text-white text-sm p-1 max-w-[100px]"
      >
        Send Money
      </button>
    </div>
  );
}
