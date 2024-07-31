import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import axios from "../api/axiosConfig";
import swal from 'sweetalert';

import Unauthorize from "./unauthorize";

function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const resetToken = query.get('token');
  const [newPassword, setNewPassword] = useState("");
  const [validateToken, setValidateToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const resetPasswordValidateToken = async () => {
      const response = await axios.get(`/auth/validateResetPasswordToken?token=` + resetToken);
      setValidateToken(response.data);
      console.log("validateToken value: " + validateToken)
    }

    resetPasswordValidateToken();
  })

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const response = await axios.post("/auth/resetPassword?token=" + resetToken, { password: confirmPassword });

      swal({
        text: response.data,
        icon: "success",
        closeOnClickOutside: false
      }).then(() => {
        window.close();
      });
    }
    else {
      swal({
        text: " Something went wrong, Please try again",
        icon: "error",
        closeOnClickOutside: false
      }).then(() => {
        navigate(-1);
      });
    }
  };

  if (resetToken === null) {
    return (
      <Unauthorize />
    )
  }

  if (validateToken === false) {

    // swal({
    //   text: " the url is not valid or altered",
    //   icon: "error",
    //   closeOnClickOutside: false
    // }).then(() => {
    //   navigate(-1);
    // });
    return <p>The link is not valid</p>

  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-blue-900">
      {/* <ToastContainer /> */}
      <form onSubmit={handleResetPassword} className="md:backdrop-blur-sm border border-gray-200 rounded-lg bg-black/30 px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Create New Password</h1>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-xl font-bold text-blue-700 mb-2">
            New Password
          </label>
          <input
            type="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="example@yourmail.com"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-xl font-bold text-blue-700 mb-2">
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}

            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required />
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Submit Password
        </button>
      </form>
    </section>
  );
}
export default ResetPassword;