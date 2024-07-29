import axios from "../api/axiosConfig";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpPage() {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    // Perform OTP verification logic (implementation needed based on backend)
    const response = await axios.get(`/auth/validateOtp?key=${1234}&otp=${otp}`)
    if (response.data == true) {
      const registrationData = JSON.parse(localStorage.getItem("registrationData"));


      // Make an API call to save user data to the backend after OTP verification
      await axios.post("/auth/register", {
        username: registrationData.username,
        email: registrationData.email,
        password: registrationData.password,
        role: registrationData.role,
        customer: {
          customerId: registrationData.customerId
        }
      });

      // Clear localStorage after successful registration
      localStorage.removeItem("registrationData");
      alert("Otp has been successfully matched");
      // Redirect to the KYC page or any other page after successful registration
      navigate("/login");
    }
    else {
      toast.warning("Invalid otp", { autoClose: 3000 });
     
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-900 to-blue-900">
      <form onSubmit={handleOTPSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">Verify Your OTP</h1>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-xl font-bold text-cyan-600 mb-2">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder="Enter the OTP received"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-gray-800 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Verify OTP
        </button>
        <ToastContainer />
      </form>
    </section>
  );
}

export default OtpPage;
