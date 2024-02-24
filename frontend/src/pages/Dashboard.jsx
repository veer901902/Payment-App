import { useContext, useEffect, useState } from "react";
import User from "../Components/User";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Dashboard({ setIsAuth }) {
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("token");

  // useEffect(()=>{
  if (!token) return <Navigate to="/signin" replace={true}></Navigate>;
  //here u can use useNavigate hook also
  else {
    setIsAuth(true);
  }
  // }, [])

  //  if(!token) return <Navigate to="/signin" />

  async function getData() {
    const res = await axios.get(
      `http://localhost:3000/api/v1/user/bulk?filter=${query}`
    );
    console.log(res);
    setUsers(res.data.users);

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
    <div className="mt-7 ml-3">
      <div className="flex h-12 items-center my-2">
        <div className="font-bold mr-2">Your Balance</div>
        <div className="font-semibold">Rs {balance}</div>
      </div>

      <div>
        <div className="flex flex-col">Users</div>
        <input
          className="rounded-md h-8 shadow-sm border-2 w-[99%] my-1 p-1"
          placeholder="Search Users..."
          onChange={(e) => setQuery(e.target.value)}
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
