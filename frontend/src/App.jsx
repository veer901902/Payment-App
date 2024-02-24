import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Home from "./Components/Home";
import Layout from "./pages/Layout";
import { MyContext } from "./ContexApi/util";
import { useState } from "react";

function App() {
  const [token, setToken] = useState('');
  return (
    <>
        <MyContext.Provider value={{token,setToken}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/send" element={<SendMoney />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </MyContext.Provider>
    </>
  );
}

export default App;
