import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpPage() {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Perform OTP verification logic (implementation needed based on backend)
    // For demo purposes, assume OTP verification is successful
    navigate("/kyc"); // Redirect to KYC page after successful OTP verification
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-cyan-100">
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
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Verify OTP
        </button>
      </form>
    </section>
  );
}

export default OtpPage;
