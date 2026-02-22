import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  const value = {
    doctors,
    currencySymbol,
  };
  const getDoctorsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/doctor/list`);
      const data = response.data;

      if (data.success) {
        setDoctors(data.doctors);
        return data.doctors; // <-- return doctors
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return [];
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
