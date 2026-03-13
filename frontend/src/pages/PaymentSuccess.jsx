import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const PaymentSuccess = () => {
  const { backendUrl, token } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const appointmentId = new URLSearchParams(location.search).get(
      "appointmentId",
    );

    const verifyPayment = async () => {
      try {
        await axios.post(
          `${backendUrl}/api/user/verify-payment`,
          { appointmentId },
          { headers: { token } },
        );

        navigate("/my-appointments");
      } catch (error) {
        console.log(error);
      }
    };

    if (appointmentId) verifyPayment();
  }, []);

  return <div className="text-center mt-20">Processing Payment...</div>;
};

export default PaymentSuccess;
