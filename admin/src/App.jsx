import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
      </div>
    </>
  ) : (
    <>
      <Login />
    </>
  );
};

export default App;
