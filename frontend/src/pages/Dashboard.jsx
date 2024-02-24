import { useContext, useEffect, useState } from "react";
import User from "../Components/User";
import axios from "axios";
import { MyContext } from "../ContexApi/util";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [query, setQuery] = useState("");
  const {token} = useContext(MyContext);

  //  const token = localStorage.getItem("token");

  // useEffect(()=>{
    if(!token) return <Navigate to="/signin" />
  // }, [])

  //  if(!token) return <Navigate to="/signin" />


  async function getData() {
    const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${query}`);
    console.log(res);
    setUsers(res.data.user);

    const token = localStorage.getItem("token");

    console.log(token);
    const res1 = await axios.get(
      "http://localhost:3000/api/v1/account/balance",
      { headers: { authorization: `Bearer ${token}` } }
    );
    setBalance(res1.data.balance);
  }

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <div>
      <div className="flex justify-between p-2 shadow-sm h-14">
        <div className="flex items-center font-semibold">Paytm App</div>
        <div className="flex grow justify-end h-full">
          <div className="flex justify-center items-center h-full font-[450]">
            Hello
          </div>
          <div className="flex items-center justify-center text-center grow mx-4 max-w-[40px] h-full rounded-full bg-slate-300">
            U
          </div>
        </div>
      </div>

      <div className="flex h-12 items-center my-2">
        <div className="font-bold mr-2">Your Balance</div>
        <div className="font-semibold">Rs {balance}</div>
      </div>

      <div>
        <div className="flex flex-col">Users</div>
        <input
          className="rounded-md h-8 shadow-sm border-2 w-[99%] my-1 p-1"
          placeholder="Search Users..."
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
        ></input>
        <div>
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
