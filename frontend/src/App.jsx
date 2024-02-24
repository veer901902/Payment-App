import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Home from "./Components/Home";
import Layout from "./pages/Layout";
import { useState } from "react";

function App() {
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout isAuth={isAuth} setIsAuth={setIsAuth}/>}>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route path="/dashboard" element={<Dashboard setIsAuth={setIsAuth} />}></Route>
              <Route path="/send" element={<SendMoney />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
